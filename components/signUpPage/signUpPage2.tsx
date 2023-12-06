"use client";
import React, { useEffect, useState } from "react";
import mainImg from "../../images/me we.png";
import Image from "next/image";
import falgImg from "../../images/Group 34168.svg";
import googleImg from "../../images/google.svg";
import linkedIn from "../../images/Group.svg";
import appleImg from "../../images/Group 34165.svg";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth, db } from "../../config/firebase-config";
import { doc, setDoc } from "firebase/firestore";
import Loader from "../loader/Loader";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

const SignUpPage2 = () => {
  const [phoneNumber, setPhoneNumber] = useState<any>("");
  const [verification, setverification] = useState(false);
  const [time, setTime] = useState(60);
  const [OTP, setOTP] = useState("");
  const [timerStarted, setTimerStarted] = useState(false);
  const [otpSent, setOTPSent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();
  const queryClient = useQueryClient();

  // const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier >(new RecaptchaVerifier(
  //   auth,
  //   "recaptcha-container",
  //   {
  //     size: "invisible",
  //     callback: (response: any) => {
  //       console.log(response);
  //     },
  //   }
  // ));

  // const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier >(new RecaptchaVerifier(
  //   auth,
  //   "recaptcha-container",
  //   {
  //     size: "invisible",
  //     callback: (response: any) => {
  //       console.log(response);
  //     },
  //   }
  // ));

  const signInUserWithPhoneNumber = async () => {
    if (phoneNumber && name && email) {
      setLoading(true);

      // if (!recaptchaVerifier) {
      // recaptchaVerifier.clear();
      const newRecaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response: any) => {
            console.log(response);
          },
        }
      );
      // setRecaptchaVerifier(newRecaptchaVerifier);
      // }

      const formattedPhoneNumber = `+91${phoneNumber}`;
      await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        newRecaptchaVerifier
      )
        .then((confirmationResult) => {
          setOTPSent(confirmationResult);

          setverification(true);
          setLoading(false);
          startTimer();
        })
        .catch((error) => {
          toast.error(`${error}`);
          console.log(error + "...please reload");
          setLoading(false);
        });
    } else {
      if (!name && !email && !phoneNumber) {
        toast.error("Please enter all the details");
      } else if (!name && !email) {
        toast.error("Please enter all the details");
      } else if (!phoneNumber && !email) {
        toast.error("Please enter all the details");
      } else if (!name && !phoneNumber) {
        toast.error("Please enter all the details");
      } else if (!name) {
        toast.error("Please enter name");
      } else if (!email) {
        toast.error("Please enter email");
      } else if (!phoneNumber) {
        toast.error("Please enter correct phone number");

        console.log("Please enter correct phone number");
      }
      setLoading(false);
    }
  };

  const startTimer = () => {
    setTimerStarted(true);
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
      setTimerStarted(false);
    }, 60000);
  };

  const resendOTP = async () => {
    if (otpSent) {
      try {
        setLoading(true);

        console.log(loading, "uuu");
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
        console.log(recaptchaVerifier, "mmmm");

        const updatedOTPSent = await signInWithPhoneNumber(
          auth,
          `+91${phoneNumber}`,
          recaptchaVerifier
        );

        setOTPSent(updatedOTPSent);
        setTimerStarted(true);
        startTimer();

        setLoading(false);
        toast.success("OTP Resent successfully!");
      } catch (error) {
        setLoading(false);
        toast.error(`Failed to resend OTP`);
      }
    } else {
      toast.error("OTP not sent yet. Please initiate the verification first.");
    }
  };

  const confirmOTP = () => {
    try {
      setLoading(true);
      setTimerStarted(false);
      setVerifying(true);
      otpSent
        .confirm(OTP)
        .then(async (res: any) => {
          // console.log(res, "Startup");
          // localStorage.setItem("auth", JSON.stringify(res.user.uid));
          if (res._tokenResponse.isNewUser) {
            let authuser = {
              phoneNo: phoneNumber,
              createdAt: new Date(),
              role: "startup",
              mode: "otp",
            };
            let startup = {
              phoneNo: phoneNumber,
              createdAt: new Date(),
              name: name,
              email: email,
              signInMethod: "phone number",
            };

            // console.log(startup, "startup info");
            await setDoc(doc(db, `startups/${res.user.uid}`), startup, {
              merge: true,
            });
            await setDoc(doc(db, `auth/${res.user.uid}`), authuser, {
              merge: true,
            });
            localStorage.setItem("auth", JSON.stringify(res.user.uid));
            await axios.post(`/api/login?uid=${res?.user?.uid}`);
            await queryClient?.invalidateQueries({ queryKey: ["startUpData"] });
            await queryClient?.refetchQueries({ queryKey: ["startUpData"] });
            toast.success("Welcome");
          } else {
            // console.log("User already exist");
            toast.error("User already exist, Please Sign in.");
          }
          // localStorage.setItem("auth", JSON.stringify(res.user.uid));
          //   await axios.get(`/api/login?uid=${res.user.uid}`);

          setVerifying(false);
          setverification(false);
          setTime(60);
          setOTP("");
          setTimerStarted(false);
          setOTPSent(null);
          setLoading(false);
          router.replace("/");
          //   router.replace("/");
        })
        .catch((err: any) => {
          setTime(60);
          setTimerStarted(false);
          setverification(false);
          setLoading(false);
          // console.log(err);
          toast.error("Incorrect OTP! Sign in failed !");
        });
    } catch (err) {
      setLoading(false);
      toast.error(`${err}`);
      console.log("error ");
    }
  };

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
                  Sign up to{" "}
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
            <div className="md:my-10 my-8 flex flex-col gap-6">
              <div className="w-full border border-[#868E97] ">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="py-3 outline-0 w-full px-5"
                  placeholder="Name"
                />
              </div>
              <div className="w-full border border-[#868E97] ">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="py-3 outline-0 w-full px-5"
                  placeholder="Email"
                />
              </div>
              <div className="flex w-full  items-center gap-x-3 ">
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
            </div>
            {/* <Link href={"/verification"}> */}
            {/* <div
              className="bg-primary text-white flex justify-center items-center py-3 rounded-lg lg:text-xl md:text-lg sm:text-base text-sm font-medium cursor-pointer"
              onClick={async () => {
                await signInUserWithPhoneNumber();
              }}
            >
              <button className="">Verify</button>
            </div> */}

            <div
              onClick={async () => {
                await signInUserWithPhoneNumber();
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

            <div id="recaptcha-container"></div>

            {/* </Link> */}
            {/* <div className="text-center lg:text-lg sm:text-base text-sm text-[#383838] font-medium  mt-10 mb-8 ">
            <h2>or Sign In with</h2>
          </div>
          <div className="flex items-center justify-center gap-x-6">
            <div className="sm:h-[55px] sm:w-[55px] h-[45px] w-[45px] cursor-pointer">
              <Image
                src={googleImg}
                alt=""
                height={1000}
                width={1000}
                className="h-full w-full object-fill"
              />
            </div>
            <div className="sm:h-[55px] sm:w-[55px] h-[45px] w-[45px] cursor-pointer">
              <Image
                src={appleImg}
                alt=""
                className="h-full w-full object-fill"
              />
            </div>
            <div className="sm:h-[55px] sm:w-[55px] h-[45px] w-[45px] cursor-pointer">
              <Image
                src={linkedIn}
                alt=""
                className="h-full w-full object-fill"
              />
            </div>
          </div> */}
          </div>
        )}

        {verification && (
          <div className="md:w-[50%] sm:w-[70%] w-[100%]  xl:px-20 md:px-10 px-5  ">
            <div className=" flex flex-col lg:gap-10 gap-5">
              <div className="flex justify-center items-center lg:text-4xl sm:text-2xl text-xl font-bold md:mt-0 mt-10">
                <h1>
                  Sign Up to{" "}
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
                        // old onchsnge start
                        // onChange={(e) => {
                        //   if (e.target.value) {
                        //     document
                        //       .getElementById(`${"otp" + (digit + 1)}`)
                        //       ?.focus();
                        //     let otp = OTP;
                        //     setOTP(
                        //       otp.substring(0, digit - 1) +
                        //         e.target.value +
                        //         otp.substring(digit)
                        //     );
                        //   } else {
                        //     let otp = OTP;
                        //     setOTP(
                        //       otp.substring(0, digit - 1) +
                        //         " " +
                        //         otp.substring(digit)
                        //     );
                        //   }
                        // }}
                        // old onchange end


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
                              otp.substring(0, digit - 1) + ' ' + otp.substring(digit)
                            );
                          }
                        }}



                        // new start
                        // onChange={(e) => {
                        //   const digit = parseInt(e.target.value, 10);

                        //   // Cast e.nativeEvent to any to avoid TypeScript errors
                        //   const nativeEvent: any = e.nativeEvent;
                        //   const isBackspace =
                        //     nativeEvent.inputType === "deleteContentBackward" ||
                        //     (nativeEvent.inputType === "deleteContentForward" &&
                        //       nativeEvent.data === null);

                        //   if (!isNaN(digit) || isBackspace) {
                        //     const currentIndex = idx;
                        //     const nextIndex = isBackspace
                        //       ? currentIndex - 1
                        //       : currentIndex + 1;

                        //     if (nextIndex >= 0 && nextIndex < 6) {
                        //       document
                        //         .getElementById(`otp${nextIndex + 1}`)
                        //         ?.focus();
                        //     }

                        //     let newOTP = OTP;
                        //     if (!isNaN(digit)) {
                        //       newOTP =
                        //         newOTP.substring(0, currentIndex) +
                        //         digit +
                        //         newOTP.substring(currentIndex + 1);
                        //     } else {
                        //       newOTP =
                        //         newOTP.substring(0, currentIndex - 1) +
                        //         " " +
                        //         newOTP.substring(currentIndex);
                        //     }

                        //     setOTP(newOTP);
                        //   }
                        // }}

                        // new end
                      />
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 text-[#868E97] sm:text-sm text-xs font-semibold md:mb-8 mb-6">
                {timerStarted ? (
                  <h4>Resend code ({time > 9 ? time : "0" + time} sec)</h4>
                ) : (
                  <button
                    className="underline underline-offset-2 cursor-pointer"
                    // onClick={resendCode}
                  >
                    Resend code
                  </button>
                )}
              </div>
            </div>

            <div
              onClick={() => confirmOTP()}
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

            {/* <div
              className="bg-primary text-white flex justify-center items-center py-3 rounded-lg lg:text-xl md:text-lg sm:text-base text-sm font-medium cursor-pointer "
              onClick={() => confirmOTP()}
            >
              <button className="">Verify</button>
            </div> */}
          </div>
        )}
      </div>
    </>
  );
};

export default SignUpPage2;
