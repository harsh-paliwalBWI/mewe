"use client";
import React, { FC, useEffect, useState } from "react";

// import CategoryCard from "./categoryCard/CategoryCard";
import img from "../../../images/ME_WE.svg";
import bussinessimg from "../../images/bussinessimg.svg";
import add from "../../images/add (1) 1.svg";
import bird from "../../images/Ellipse 52.svg";
import verify from "../../images/verify 2.svg";
import Image from "next/image";
import FlatIcon from "../flatIcon/flatIcon";
import Link from "next/link";
import { log } from "console";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getStartUpData } from "@/services/startupService";
import { getCookie } from "cookies-next";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase-config";
import { toast } from "react-toastify"
import Modal from "../Modal/modal";
import { CircularProgress } from "@mui/material";
import avatarimg from "../../images/avatar.png";

interface Props {
  startup: any
}
const BussinessCard: FC<Props> = ({ startup }) => {
  const [isClient, setIsClient] = useState(false);

  // console.log(startup,"from card");
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cookies = { value: getCookie("uid") };
  const { data: startUpData } = useQuery({
    queryKey: ["startUpData"],
    queryFn: () => getStartUpData(cookies),
  });
  // console.log("startUpData", startUpData);

  const isFollowing = startUpData?.following?.some(
    (item: any) => item.docId === startup.docId
  );

  const onFollowHandler = async (data: any) => {
    console.log(data, "from follow");
    setIsModalOpen(true)
    try{
    const docid = startUpData?.id;
    // for following start
    if (docid) {
      const docRef = doc(db, `startups/${docid}`);
      const docSnap = await getDoc(docRef);
      const existingFollowing = docSnap.data()?.following || [];
      const newFollowingObj = {
        // [data?.docId]: {
        docId: data?.docId,
        name: data?.name || "",
        coverPic: {
          mob: data?.basic?.coverPic?.mob || "",
          url: data?.basic?.coverPic?.url || "",
          thumb: data?.basic?.coverPic?.thumb || ""
        },
        category: {
          id: data?.basic?.category?.id || "",
          name: data?.basic?.category?.name || ""
          // },
        }
      };
      const updatedFollowing = [...existingFollowing, newFollowingObj];
      await setDoc(docRef, { following: updatedFollowing }, { merge: true });
      // for following end 
    }
    // for followers start
    const followersId = data?.docId;
    if (followersId) {
      const docRef = doc(db, `startups/${followersId}`);
      const docSnap = await getDoc(docRef);
      const existingFollowers = docSnap.data()?.followers || [];
      const newFollowerObj = {
        // [startUpData?.id]: {
        docId: startUpData?.id,
        name: startUpData?.name || "",
        coverPic: {
          mob: startUpData?.basic?.coverPic?.mob || "",
          url: startUpData?.basic?.coverPic?.url || "",
          thumb: startUpData?.basic?.coverPic?.thumb || ""
        },
        category: {
          id: startUpData?.basic?.category?.id || "",
          name: startUpData?.basic?.category?.name || ""
        },
        // }
      };
      const updatedFollowers = [...existingFollowers, newFollowerObj];
      await setDoc(docRef, { followers: updatedFollowers }, { merge: true });
    }
    // for followers end 
    await queryClient.invalidateQueries({ queryKey: ['startUpData'] })
    await queryClient.refetchQueries({ queryKey: ['startUpData'] })
    toast.success("Followed.")
    setIsModalOpen(false)

  }catch(err){
    setIsModalOpen(false)
      toast.error("Something went wrong!")
  }
  }

  const onUnfollowHandler = async (data: any) => {
    console.log(data, "from unfollow");
    setIsModalOpen(true)
    try{
    const docid = startUpData?.id;
    // from following start 
    if (docid) {
      const docRef = doc(db, `startups/${docid}`);
      const docSnap = await getDoc(docRef);
      const existingFollowing = docSnap.data()?.following || [];
      const updatedFollowing = existingFollowing.filter(
        (item: any) => item.docId !== data.docId
      );
      await setDoc(docRef, { following: updatedFollowing }, { merge: true });
    }
    // from following end
    // from followers start
    const followersId = data?.docId;
    if (followersId) {
      const followersDocRef = doc(db, `startups/${followersId}`);
      const docSnap = await getDoc(followersDocRef);
      const existingFollowers = docSnap.data()?.followers || [];
      const updatedFollowers = existingFollowers.filter(
        (item: any) => item.docId !== startUpData?.id
      );
      await setDoc(followersDocRef, { followers: updatedFollowers }, { merge: true });
    }
    // from followers end
    await queryClient.invalidateQueries({ queryKey: ['startUpData'] })
    await queryClient.refetchQueries({ queryKey: ['startUpData'] })
    setIsModalOpen(false)
    toast.success("Unfollowed.");
  }catch(err){
    setIsModalOpen(false)
    toast.error("Something went wrong!")   
  }
  };

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);
  return (
    // <Link href={"/about"}>
    <div className="flex flex-col justify-between items-center gap-1 sm:gap-2 md:gap-3  bg-[#f6f9fd] rounded-[5px] ">
      <div className="relative rounded-[5px] w-full h-auto flex items-center justify-center  ">
        <Image
          src={bussinessimg}
          alt=""
          width={1000}
          height={1000}
          className="w-full h-full object-contain 
          
                "
        />

        <div className="absolute  top-0 right-0 transform -translate-x-1/2 translate-y-1/2  cursor-pointer">
          <FlatIcon className="flaticon-close  md:text-xl sm:text-lg text-base text-black" />
        </div>
        <div className="w-12  rounded-full h-12 sm:w-16 sm:h-16  md:w-20 md:h-20 bottom-0 md:translate-y-1/2 sm:translate-y-1/2 translate-y-1/2 absolute ">
          <Image src={startup?.basic?.coverPic?.url || avatarimg}
            alt=""
            height={1000}
            width={1000}
            className=" rounded-full w-[100%] h-[100%] object-fill" />
          <div className="absolute w-4 h-4 sm:w-6 sm:h-6  md:w-8 md:h-8 top-0 right-0 transform -translate-y-1/3">
            <Image
              src={verify}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col  gap-2 sm:gap-3 md:gap-4   items-center w-full mt-5 sm:mt-7 md:mt-9 mb-3">
        <h2 className=" md:text-xl sm:text-lg text-base font-medium text-black ">
          {/* Formonix */}
          {
             startup?.name
           
          }
        </h2>
        <div className="flex flex-col gap-1.5 sm:gap-2 md:gap-3 items-center justify-center">
          <p className="opacity-40 text-black  text-xs sm:text-sm md:text-[15px] font-normal text-center">
          {startup?.basic?.category?.name || "category not filled"}
          </p>
          <p className="opacity-40 text-black text-[10px] sm:text-xs md:text-sm font-normal ">
          {startup?.followers?.length || "No"} followers
          </p>
        </div>

        <div className="w-fit ">
          {isFollowing?(
            <div onClick={async () => await onUnfollowHandler(startup)} className=" w-full flex   justify-center  items-center gap-1 sm:gap-2 md:gap-3 rounded-full px-1 sm:px-4 md:px-8 lg:px-12 py-1 sm:py-2 md:py-3 border border-[#a3bad6] cursor-pointer ">
            <div className=" ">
              <FlatIcon className="flaticon-add-user text-2xl" />
            </div>
            <div className=" text-black text-sm sm:text-base md:text-lg font-semibold ">
              <button >
                Following
              </button> 
              
            </div>
          </div>
          )
          :
          (<div onClick={async () => await onFollowHandler(startup)} className=" w-full flex  justify-center  items-center gap-1 sm:gap-2 md:gap-3 rounded-full px-1 sm:px-4 md:px-8 lg:px-12 py-1 sm:py-2 md:py-3 border border-[#a3bad6] cursor-pointer ">
          <div className=" ">
          <FlatIcon className="flaticon-add-user text-2xl text-primary" />

          </div>
          <div className=" text-primary text-sm sm:text-base md:text-lg font-semibold ">
           
              <button >
                Follow
              </button>
          </div>
        </div>)
        }
        </div>
        <Modal isOpen={isModalOpen} setOpen={setIsModalOpen}>
                    <div className="flex flex-col gap-2 justify-center items-center">
                      <CircularProgress className="!text-white"></CircularProgress>
                      {/* <p className="text-white font-medium text-lg">
                        Adding comment..
                      </p> */}
                    </div>
                  </Modal>
      </div>
    </div>
    // </Link>
  );
};

export default BussinessCard;
