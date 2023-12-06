"use client";
import React, { useState, useEffect, FC } from "react";
import blueTickImg from "../../../images/verify 3.svg";
import profileImg from "../../../images/Ellipse 33.svg";
import Image from "next/image";
import FlatIcon from "@/components/flatIcon/flatIcon";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { log } from "console";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "@/config/firebase-config";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchBusinessAccountDetails, getStartUpData, isBusinessAccountExistOrNot } from "@/services/startupService";
import Modal from "@/components/Modal/modal";
import { CircularProgress } from "@mui/material";
import { signOut } from "firebase/auth";
import axios from "axios";
import { getCookie } from "cookies-next";


interface ProfileOptionsProps {
  setSelectedTab: any;
  selectedTab: any;
  // cookie: any

}

const optionStyle =
  "flex lg:gap-x-4 gap-x-2 bg-[#F3F7FA] lg:px-4 px-2 lg:text-sm text-xs font-semibold py-4  cursor-pointer";

const ProfileOptions: FC<ProfileOptionsProps> = ({setSelectedTab,selectedTab}) => {
const cookies = { value: getCookie("uid") };

  const params = useSearchParams();
  const [client, setClient] = useState(false)
  const currTab = params.get("tab");
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
const router = useRouter()


  async function handleLogout() {
    signOut(auth)
      .then(async () => {
        toast.success("Logged out");
        await axios.post(`/api/logout`);
        await queryClient.invalidateQueries({ queryKey: ["startUpData"] });
        await queryClient.refetchQueries({ queryKey: ["startUpData"] });
        queryClient.setQueryData(["startUpData"], null);
        router.replace("/");
      })
      .catch((error) => {
        // An error happened.
        // console.log("error", error);

        toast.error("cannot Logout at the moment");
      });
  }

  const { data: startUpData } = useQuery({
    queryKey: ["startUpData"],
    queryFn: () => getStartUpData(cookies),
  });
  // console.log("startUpData",startUpData);

    const { data: existOrNot } = useQuery({
    queryKey: ["businessAccountExistOrNot"],
    queryFn: () => isBusinessAccountExistOrNot(cookies),
  });
  // console.log(existOrNot, "on not");
  const targetPath = existOrNot ? `/startup/${startUpData?.slug?.name}` : "";

  // const { data: businessAccountData } = useQuery({
  //   queryKey: ["businessAccountData"],
  //   queryFn: () => fetchBusinessAccountDetails(cookies),
  // });
  // console.log(businessAccountData, "on not");
  const uploadImage = async (userPic: any) => {
    setIsModalOpen(true);
    // console.log(userPic,"fhfhgfj");
    const startUpId = await startUpData?.id;
    
try{
    if (userPic&&startUpId) {
      setLoading(true);
      let timeStamp = new Date().getMilliseconds();
      const storage = getStorage();
      const storageRef = ref(storage, `startups/${startUpId}/images/${(userPic.name)}___${timeStamp}`);
      // const storageRef = ref(storage, `${userPic.name}___${timeStamp}`);
      await uploadBytes(storageRef, userPic).then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then(async (downloadURL) => {
          await setDoc(
            doc(db, "startups", startUpId),
            {
              basic: {
                coverPic: {
                  mob: downloadURL,
                  url: downloadURL,
                  thumb: downloadURL,
                },
              },
            },
            { merge: true }
          );
          await queryClient.invalidateQueries({ queryKey: ["startUpData"] });
          await queryClient.refetchQueries({ queryKey: ["startUpData"] });
          toast.success("Profile pic updated successfully.");
        });
      });
      setIsModalOpen(false);
    } else {
toast.error("Something went wrong !")
      setIsModalOpen(false);
    }
  }catch(error){
    setIsModalOpen(false);
toast.error("Something went wrong !")
  }
  };

  async function uploadTask(userPic: any) {
    await uploadImage(userPic);
  }
  useEffect(() => {
    // console.log("inside use effect");
      setClient(true)
}, []);

  return (
    <>
      <div className="sm:block  hidden xl:w-[25%] md:w-[30%] w-[100%] filter-border  h-full bg-[#F8FAFC] lg:px-5 px-2  ">
        {/* top section  */}
        <div className="flex flex-col gap-2 mt-6">
          <div className="flex justify-center relative">
          <div className="flex justify-center relative ">
          <Link href={`/startup/${startUpData?.slug?.name}`}>
            <div className="h-[100px] w-[100px] rounded-full  z-10">
              <Image
                src={(client&&startUpData?.basic?.coverPic?.url)?startUpData?.basic?.coverPic?.url:""}
                alt=""
                height={1000}
                width={1000}
                className="h-[100%] w-[100%] object-fill  rounded-full"
              />
              <div className="h-[30px] w-[30px] absolute right-0 top-0">
                <Image
                  src={blueTickImg}
                  height={1000}
                  width={1000}
                  alt=""
                  className="h-[100%] w-[100%] object-fill  "
                />
              </div>
              
            </div>
            </Link>
            
                <div className="absolute bottom-1 right-1  rounded-full  ">
                <input
                  placeholder="Destination Image"
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    if (!e.target.files) return;
                    await uploadTask(e.target.files[0]);
                  }}
                  id="profile-Image"
                  className="w-full hover:cursor-pointer   outline-none  hidden rounded-md  "
                />
                <label
                  htmlFor="profile-Image"
                  className="hover:cursor-pointer h-[20px] w-[20px] rounded-full  bg-white flex justify-center items-center "
                >
                  <FlatIcon className="text-primary flaticon-edit text-lg" />
                </label>
              </div>
          </div>
          <Modal isOpen={isModalOpen} setOpen={setIsModalOpen}>
              <div className="flex flex-col gap-2 justify-center items-center">
                <CircularProgress className="!text-white"></CircularProgress>
                <p className="text-white font-medium text-lg">
                  Updating profile picture..
                </p>
              </div>
            </Modal>
          </div>
          {/* <Link href={"/about"}> */}
            <div className="flex  justify-center lg:text-base text-sm font-bold ">
              <h2>
                {client&&startUpData?.name}
                {/* Met Connect */}
              </h2>
            </div>
          {/* </Link> */}
          <div className="flex w-[100%] h-auto  lg:px-5 px-2 justify-center lg:text-sm text-xs font-semibold text-[#868E97] ">
            <p className="">
              {/* @metconnects34805 */}
              {client&&startUpData?.email}
            </p>
          </div>
        </div>
        <div className=" flex flex-col gap-3 my-8">
          {/* option  */}
          <Link href={{ pathname: "/account", query: { tab: "my-profile" } }}>
            <div
              className={`${optionStyle} ${
                currTab === "my-profile" ? "text-primary" : "text-black"
              }`}
            >
              <div>
                <FlatIcon className="flaticon-user text-2xl" />
              </div>
              <div>My Profile</div>
            </div>
          </Link>
          <Link
            href={{ pathname: "/account", query: { tab: "business-account" } }}
          >
            <div
              className={`${optionStyle}  ${
                currTab === "business-account" ? "text-primary" : "text-black"
              }`}
            >
              <div>
                <FlatIcon className="flaticon-office text-2xl" />
              </div>
              <div>Create a business account</div>
            </div>
          </Link>
          <Link href={{ pathname: "/account", query: { tab: "manage-posts" } }}>
            <div
              className={`${optionStyle}  ${
                currTab === "manage-posts" || currTab === "new-post"
                  ? "text-primary"
                  : "text-black"
              }`}
            >
              <div>
                <FlatIcon className="flaticon-post text-2xl" />
              </div>
              <div>Manage Posts</div>
            </div>
          </Link>
          <div className={`${optionStyle}`}>
            <div>
              <FlatIcon className="flaticon-bookmark text-2xl" />
            </div>
            <div>Saved Startups</div>
          </div>
          <Link href={{ pathname: "/account", query: { tab: "chat" } }}>
            <div
              className={`${optionStyle}  ${
                currTab === "chat" ? "text-primary" : "text-black"
              }`}
            >
              <div>
                <FlatIcon className="flaticon-chat text-2xl" />
              </div>
              <div>My chats</div>
            </div>
          </Link>
          <div className={`${optionStyle}`}>
            <div>
              <FlatIcon className="flaticon-notificaiton text-2xl" />
            </div>
            <div>Notifications</div>
          </div>
          {/* <div className={`${optionStyle}`}>
            <div>
              <FlatIcon className="flaticon-support text-2xl" />
            </div>
            <div>Support</div>
          </div> */}
          <button onClick={handleLogout} className={`${optionStyle}`}>
            <FlatIcon className="flaticon-exit text-2xl" />
            <div>Log Out</div>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileOptions;
