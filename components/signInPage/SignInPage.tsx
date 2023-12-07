"use client";
import React, { useState,useEffect} from "react";
import mainImg from "../../images/me we.png";
import Image from "next/image";
import falgImg from "../../images/Group 34168.svg";
import googleImg from "../../images/google.svg";
import linkedIn from "../../images/Group.svg";
import appleImg from "../../images/Group 34165.svg";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { RecaptchaVerifier, deleteUser } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth, db } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { getAuth, getAdditionalUserInfo } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import Loader from "../loader/Loader";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getStartUpData } from "@/services/startupService";
import { getCookie } from "cookies-next";
import { GoogleAuthProvider } from "firebase/auth";

const SignInPage = () => {
  const queryClient = useQueryClient();
  const [phoneNumber, setPhoneNumber] = useState<any>("");
  const [verification, setverification] = useState(false);
  const [time, setTime] = useState(60);
  const [OTP, setOTP] = useState("");
  const [timerStarted, setTimerStarted] = useState(false);
  const [otpSent, setOTPSent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const router = useRouter();
  // const cookies = { value: getCookie("uid") };
  const provider = new GoogleAuthProvider();
  const [docId, setDocId] = useState("");
  const [otpEntered, setOtpEntered] = useState(false);

  // const { data: startUpData } = useQuery({
  //   queryKey: ["startUpData"],
  //   queryFn: () => getStartUpData(cookies),
  // });

let interval:any
  

  // const resendOTP = async () => {
  //   try {
  //     setLoading(true);

  //     const verifier = new RecaptchaVerifier(
  //       auth,
  //       "resend-container",  // Verify that this matches the actual container ID
  //       {
  //         size: "invisible",
  //         callback: (response: any) => {
  //           console.log(response);
  //         },
  //       }
  //     );

  //     const formattedPhoneNumber = `+91${phoneNumber}`;
  //     await signInWithPhoneNumber(auth, formattedPhoneNumber, verifier);

  //     setTimerStarted(true);
  //     startTimer();

  //     setLoading(false);
  //     toast.success("OTP Resent successfully!");
  //   } catch (error) {
  //     setLoading(false);
  //     console.error("Firebase Authentication Error:",error);
  //     toast.error("Failed to resend OTP");
  //   }
  // };

  const resenedOtp = async () => {
    try {
      console.log("inside resenedOtp");
      const formattedPhoneNumber1 = `+91${phoneNumber}`;
      console.log(formattedPhoneNumber1);
      
  
      // Initialize RecaptchaVerifier here
      const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container',{}
      //  {
      //   'size': 'invisible',
      //   'callback': (response: any) => {
      //     console.log(response, "response");
      //   }
      // }
      );
  
      // Use the recaptchaVerifier in the signInWithPhoneNumber function
      const formattedPhoneNumber = `+91${phoneNumber}`;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        recaptchaVerifier
      );
  
      // Save the confirmation result to use later
      setOTPSent(confirmationResult);
  
      console.log(recaptchaVerifier);
  
    } catch (error) {
      console.log("inside catch", error);
      toast.error("Failed to initiate OTP verification");
    }
  };
  



  const signInUserWithPhoneNumber = async () => {
    if (phoneNumber) {
      let startUpExistOrNot: any;
      let isBlocked;
      let startUp;
      let docId;
      const startupsRef = collection(db, "startups");
      const q = query(startupsRef, where("phoneNo", "==", phoneNumber));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size > 0) {
        const docSnap = querySnapshot.docs[0];
        startUp = docSnap.data();
        docId = docSnap.id;
        setDocId(docId);
        startUpExistOrNot = startUp ? true : false;
        isBlocked = startUp.blockedByAdmin;
        console.log(startUp);
        console.log("isBlocked", isBlocked);
      } else {
        // console.log('No matching document found');
      }
      if (startUpExistOrNot) {
        if (!isBlocked) {
          console.log(docId, "-----------");
          setLoading(true);
          console.log(auth);

          const recaptchaVerifier = new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {
              size: "invisible",
              callback: (response: any) => {
                console.log(response);
              },
            }
          );
          console.log(recaptchaVerifier, "veri");

          const formattedPhoneNumber = `+91${phoneNumber}`;
          await signInWithPhoneNumber(
            auth,
            formattedPhoneNumber,
            recaptchaVerifier
          )
            .then((confirmationResult) => {
              setOTPSent(confirmationResult);
              setverification(true);
              setLoading(false);
              startTimer();
              // clearInterval(interval);
              // setTime(0)
              recaptchaVerifier.clear()
            })
            .catch((error) => {
              toast.error(`${error}`);
              console.log(error + "...Please eload");
              setLoading(false);
              recaptchaVerifier.clear()
            });

        } else {
          toast.error("You have been blocked by admin.");
        }
      } else {
        router.push("/signup");
        toast.error("New user please Signup first !");
        console.log("new user ");
      }
    } else {
      if (!phoneNumber) {
        // console.log("Please enter correct phone number");
        toast.error("Please enter phone number first !");
      }
      setLoading(false);
    }
  };

  const startTimer = () => {
    setTimerStarted(true);
   
    
   interval = setInterval(() => {
    console.log("set interval");

      setTime((prevTime) => prevTime - 1);
    }, 1000);
    
    if (otpEntered){
      console.log("inside if");
      
      clearInterval(interval)
     }else{
      console.log("inside else");

      setTimeout(() => {
        console.log("cleaned");
        
        clearInterval(interval);
        setTimerStarted(false);
      }, 60000);
     }
  
  };

  useEffect(() => {
    return () => {
      // Clean up the interval when the component unmounts
      clearInterval(interval);
    };
  }, []);

  const confirmOTP = () => {
    setLoading(true);
    try {
      setTimerStarted(false);
      setVerifying(true);
      otpSent
        .confirm(OTP)
        .then(async (res: any) => {
          localStorage.setItem("auth", JSON.stringify(res?.user?.uid));
          await axios.post(`/api/login?uid=${res?.user?.uid}`);
          await queryClient?.invalidateQueries({ queryKey: ["startUpData"] });
          await queryClient?.refetchQueries({ queryKey: ["startUpData"] });
          await setDoc(
            doc(db, `startups/${docId}`),
            { signInMethod: "phone number" },
            { merge: true }
          );
          toast.success("Welcome");
          router.replace("/");
          setVerifying(false);
          setverification(false);
          setTime(60);
          setOTP("");
          setTimerStarted(false);
          setOTPSent(null);
          setLoading(false);
          setDocId("");
        })
        .catch((err: any) => {
          // setTime(0);
          setverification(false);
          setLoading(false);
          toast.error("Incorrect OTP! Sign in failed!");
          setLoading(false);
          // clearInterval(interval)
          setOtpEntered(true)
          startTimer()
          setTime(60);
          setOTP("");
          setTimerStarted(false);
          setOTPSent(null);
        });
    } catch (err) {
      console.log("error ");
      setLoading(false);
    }
  };
  // const resetOTPInputs = () => {
  //   const newOTP = Array(6).fill(""); // Create an array of 6 empty strings
  //   setOTP(newOTP.join("")); // Join the array into a string and set the OTP state
  // };

  const handleLoginWithGoogle = async (result: any) => {
    console.log("result", result);

    const user = result.user;
    console.log("user", user);

    const additionalUserInfo = getAdditionalUserInfo(result);

    if (additionalUserInfo && additionalUserInfo.isNewUser) {
      console.log("inside if");
      let authuser = {
        phoneNo: user?.phoneNumber,
        createdAt: new Date(),
        role: "startup",
        mode: "google",
      };
      let startup = {
        phoneNo: user?.phoneNumber,
        createdAt: new Date(),
        name: user?.displayName,
        email: user?.email,
      };
      console.log("startup", startup, authuser);

      await setDoc(doc(db, `startups/${user.uid}`), startup, { merge: true });
      await setDoc(doc(db, `auth/${user.uid}`), authuser, { merge: true });
    } else {
      console.log("inside else");
    }
    await setDoc(
      doc(db, `startups/${user.uid}`),
      { signInMethod: "google" },
      { merge: true }
    );
    await axios.post(`/api/login?uid=${user?.uid}`);
    toast.success("Welcome");
    router.replace("/");
  };

  const loginWithGoogle = async () => {
    console.log("inside loginWithGoogle");

    signInWithPopup(auth, provider)
      .then((result) => {
        handleLoginWithGoogle(result);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  

  // const startTimer = () => {
  //   setTimer(60);
  //   setTimerStarted(true);

  //   const interval = setInterval(() => {
  //     setTimer((prevTimer) => prevTimer - 1);
  //   }, 1000);

  //   setTimeout(() => {
  //     clearInterval(interval);
  //     setTimerStarted(false);
  //   }, 60000);
  // };

  

  // console.log(OTP, "dfg")
console.log(time,"time------");




  return (
    <>
      <div className="flex py-6 justify-center md:h-[100vh] h-auto items-center">
        <div className="w-[50%] md:block hidden  h-[100%] pl-6 ">
          <Image
            src={mainImg}
            alt=""
            height={1000}
            width={1000}
            className=" w-[100%] h-[100%] object-fill"
            priority={true}
          />
        </div>

        {!verification && (
          <div className="md:w-[50%] sm:w-[70%] w-[100%]  xl:px-20 md:px-10 px-5  ">
            <div className=" flex flex-col lg:gap-10 gap-5">
              <div className="flex justify-center items-center lg:text-4xl sm:text-2xl text-xl font-bold md:mt-0 mt-10 ">
                <h1>
                  Sign in to{" "}
                  <span className="text-primary font-bold">MEWE</span>
                </h1>
              </div>
              <div className="text-primary font-semibold flex justify-center items-center xl:text-2xl lg:text-2xl md:text-base sm:text-xl text-base ">
                <h1>Add Your Contact Information</h1>
              </div>
            </div>
            <div className="flex justify-center items-center text-center text-[#868E97] font-medium lg:text-base sm:text-sm text-xs mt-4 ">
              <h3>
                We will be sending a verification code to the provided <br />
                contact number.
              </h3>
            </div>
            <div className="flex w-full  items-center gap-x-3 md:my-10 my-8">
              <div className="border border-[#868E97] flex items-center justify-center gap-x-3 xl:w-[20%] w-[30%] sm:py-3.5 py-4">
                <div className="w-[21px] h-[16px] ">
                  <Image
                    src={falgImg}
                    alt=""
                    height={1000}
                    width={1000}
                    className="h-[100%] w-[100%] object-fill"
                  />
                </div>
                <p className="sm:text-sm text-xs text-gray-500 font-semibold">
                  +91
                </p>
              </div>
              <div className="xl:w-[80%] w-[70%]">
                <input
                  type="text"
                  name=""
                  id=""
                  className="border border-[#868E97] w-full py-3 outline-0 px-5"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    // console.log(e.target.value);
                  }}
                />
              </div>
            </div>
            {/* <Link href={"/verification"}> */}
            <div
              onClick={async () => {
                await signInUserWithPhoneNumber();
              }}
              className="bg-primary text-white lg:text-xl md:text-lg sm:text-base text-sm font-medium  text-center rounded-lg py-3 cursor-pointer"
            >
              <button style={{ height: "100%", position: "relative" }}>
                {loading && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <Loader />
                  </div>
                )}
                {!loading && "Verify"}
              </button>
            </div>
            <div id="recaptcha-container"></div>
            <div id="sign-in-button"></div>
            <div id="resend-otp"></div>
            {/* </Link> */}
            <div className="text-center lg:text-lg sm:text-base text-sm text-[#383838] font-medium  mt-10 mb-8 ">
              <h2>or Sign In with</h2>
            </div>
            <div className="flex items-center justify-center gap-x-6">
              <div
                onClick={async () => {
                  await loginWithGoogle();
                }}
                className="sm:h-[55px]  sm:w-[55px] h-[45px] w-[45px] cursor-pointer"
              >
                <Image
                  src={googleImg}
                  alt=""
                  height={1000}
                  width={1000}
                  className="h-full w-full object-fill"
                />
              </div>
              {/* <div
               onClick={async () => {
                await loginWithApple();
              }}
               className="sm:h-[55px] sm:w-[55px] h-[45px] w-[45px] cursor-pointer">
              <Image
                src={appleImg}
                alt=""
                className="h-full w-full object-fill"
              />
            </div> */}
              {/* <div className="sm:h-[55px] sm:w-[55px] h-[45px] w-[45px] cursor-pointer">
              <Image
                src={linkedIn}
                alt=""
                className="h-full w-full object-fill"
              />
            </div> */}
            </div>
          </div>
        )}

        {verification && (
          <div className=" md:w-[50%] sm:w-[70%] w-[100%]  xl:px-20 md:px-10 px-5  ">
            <div className=" flex flex-col lg:gap-10 gap-5">
              <div className="flex justify-center items-center lg:text-4xl sm:text-2xl text-xl font-bold md:mt-0 mt-10">
                <h1>
                  Sign in to{" "}
                  <span className="text-primary font-bold">MEWE</span>
                </h1>
              </div>
              <div className="text-primary font-semibold flex justify-center items-center xl:text-2xl lg:text-2xl md:text-base sm:text-xl text-base ">
                <h1>Enter the verification code</h1>
              </div>
            </div>
            <div className="flex justify-center items-center text-center text-[#868E97] font-medium lg:text-base sm:text-sm text-xs mt-4  md:mb-14 mb-7">
              <h3>
                We will be sending a verification code to the provided <br />
                contact number.
              </h3>
            </div>
            <div className="w-[95%] mx-auto ">
              <div className="flex justify-center items-center xl:gap-x-4 md:gap-x-2 sm:gap-x-4 gap-x-2 w-full ">
                {[1, 2, 3, 4, 5, 6].map((digit: any, idx: number) => {
                  return (
                    <div key={idx} className="w-1/6 ">
                      <input
                        type="text"
                        pattern="\d*"
                        maxLength={1}
                        className="xl:py-4 md-py-3  py-2 border border-[#868E97] w-full outline-0 text-center"
                        id={`${"otp" + digit}`}
                        onChange={(e) => {
                          const inputElement = document.getElementById(`otp${digit}`) as HTMLInputElement;
                          if (e.target.value) {
                            // Move focus to the next input on input
                            inputElement.blur(); // Blur to handle backspace correctly
                            document.getElementById(`otp${digit + 1}`)?.focus();
                            let otp = OTP;
                            setOTP(
                              otp.substring(0, digit - 1) +
                              e.target.value +
                              otp.substring(digit)
                            );
                          } else {
                            // Move focus to the previous input on backspace
                            inputElement.blur(); // Blur to handle backspace correctly
                            document.getElementById(`otp${digit - 1}`)?.focus();
                            let otp = OTP;
                            setOTP(
                              otp.substring(0, digit - 1) +
                                " " +
                                otp.substring(digit)
                            );
                          }
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div
                className="mt-6 text-[#868E97] sm:text-sm text-xs font-semibold md:mb-8 mb-6"
                onClick={async () => {
                  // await resendOTP();
                  await resenedOtp()

                  // await signInUserWithPhoneNumber();
                }}
              >
                {timerStarted ? (
                  <h4>Resend code ({time > 9 ? time : "0" + time} sec)</h4>
                ) : (
                  <button
                    className="underline underline-offset-2 cursor-pointer"
                    // onClick={}
                    onClick={async () => {
                      // await resendOTP();
                      // await signInUserWithPhoneNumber();
                    }}

                  >
                    Resend code
                  </button>
                )}
              </div>
            </div>
            <div
              onClick={async () => {
                confirmOTP();
              }}
              className="bg-primary text-white lg:text-xl md:text-lg sm:text-base text-sm font-medium cursor-pointer  text-center rounded-lg py-3 "
            >
              <button style={{ height: "100%", position: "relative" }}>
                {loading && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <Loader />
                  </div>
                )}
                {!loading && "Verify"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SignInPage;
