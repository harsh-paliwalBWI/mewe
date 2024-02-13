"use client";
import React, { FC, useEffect, useState } from "react";
import verify from "../../images/verify 2.svg";
import Image from "next/image";
import FlatIcon from "../flatIcon/flatIcon";
import Link from "next/link";
import { log } from "console";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllFollowingsData,
  getStartUpData,
} from "@/services/startupService";
import { getCookie } from "cookies-next";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase-config";
import { toast } from "react-toastify";
import Modal from "../Modal/modal";
import { CircularProgress } from "@mui/material";
import avatarimg from "../../images/avatar.png";

interface Props {
  startup: any;
}
const BussinessCard2: FC<Props> = ({ startup }) => {
  const [isClient, setIsClient] = useState(false);

  // console.log(startup, "from card");
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cookies = { value: getCookie("uid") };
  const { data: startUpData } = useQuery({
    queryKey: ["startUpData"],
    queryFn: () => getStartUpData(cookies),
  });
  // console.log(startup?.isVerified,startup?.name ,"FFF")

  const { data: allFollowingsData } = useQuery({
    queryKey: ["allFollowingsData"],
    queryFn: () => fetchAllFollowingsData(cookies),
  });
  // console.log("allFollowingsData", allFollowingsData);

  const isFollowing = startUpData?.following?.some(
    (item: any) => item.docId === startup.docId
  );

  const isFollowed = allFollowingsData?.find(
    (item: any) => item.id === startup.docId
  );

  // console.log("isFollowed", isFollowed);

  const onFollowButtonClick = async (event: React.MouseEvent) => {
    event.preventDefault();  // Prevents the click event from propagating to the parent Link
    await onFollowHandler(startup);
  };

  const onUnfollowButtonClick = async (event: React.MouseEvent) => {
    event.preventDefault();  // Prevents the click event from propagating to the parent Link
    await onUnfollowHandler(startup);
  };

  const onFollowHandler = async (data: any) => {
    // console.log("hii");
    // console.log(data, "from follow");
    if (startUpData) {
      setIsModalOpen(true);
      try {
        const docid = startUpData?.id;
        // for following start
        if (docid) {
          const newFollowingObj = {
            status: "pending",
            // docId: data?.docId,
            name: data?.name || "",
            coverPic: {
              mob: data?.basic?.coverPic?.mob || "",
              url: data?.basic?.coverPic?.url || "",
              thumb: data?.basic?.coverPic?.thumb || "",
            },
            category: {
              id: data?.basic?.category?.id || "",
              name: data?.basic?.category?.name || "",
            },
          };
          const refDoc = doc(db, "startups", docid, "following", data.docId);
          await setDoc(refDoc, newFollowingObj, { merge: true });
          // for following end
        }
        // for followers start
        const followersId = data?.docId;
        if (followersId) {
          const newFollowerObj = {
            status: "pending",
            // docId: startUpData?.id,
            name: startUpData?.name || "",
            coverPic: {
              mob: startUpData?.basic?.coverPic?.mob || "",
              url: startUpData?.basic?.coverPic?.url || "",
              thumb: startUpData?.basic?.coverPic?.thumb || "",
            },
            category: {
              id: startUpData?.basic?.category?.id || "",
              name: startUpData?.basic?.category?.name || "",
            },
          };
          const refDoc = doc(db, "startups", followersId, "followers", docid);
          await setDoc(refDoc, newFollowerObj, { merge: true });
        }
        // for followers end
        await queryClient.invalidateQueries({
          queryKey: ["allFollowingsData"],
        });
        await queryClient.refetchQueries({ queryKey: ["allFollowingsData"] });
        toast.success("Followed.");
        setIsModalOpen(false);
      } catch (err) {
        setIsModalOpen(false);
        console.log(err);
        toast.error("Something went wrong!");
      }
    } else {
      toast.error("Please login to follow.");
    }
  };

  const onUnfollowHandler = async (data: any) => {
    // console.log(data, "from unfollow");
    setIsModalOpen(true);
    try {
      const docid = startUpData?.id;
      if (docid) {
        const refDoc = doc(db, "startups", docid, "following", data.docId);
        await deleteDoc(refDoc);
      }
      const followersId = data?.docId;
      if (followersId) {
        const refDoc = doc(db, "startups", followersId, "followers", docid);
        await deleteDoc(refDoc);
      }
      await queryClient.invalidateQueries({ queryKey: ["allFollowingsData"] });
      await queryClient.refetchQueries({ queryKey: ["allFollowingsData"] });
      setIsModalOpen(false);
      toast.success("Unfollowed.");
    } catch (err) {
      setIsModalOpen(false);
      toast.error("Something went wrong!");
    }
  };

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);
  return (
    <Link
      href={`/startup/${startup?.slug?.name}`}>
      <div className="flex flex-row sm:flex-row w-full items-center gap-3 md:gap-2 lg:gap-3  bg-[#f6f9fd] rounded-[5px] p-[4%] ">
        {/* <Link
        href={`/startup/${startup?.name}`}
        className="flex border-2 border-black w-[70%] justify-between"
      > */}

        {/* <div className="rounded-[5px] w-[36%] sm:w-[20%] md:w-[40%] lg:w-[36%] h-fit flex items-center justify-center border-2 border-yellow-800 "> */}
        {/* w-16 h-16 sm:w-[75px] sm:h-[75px]  md:w-[86px] md:h-[86px] lg:w-24 lg:h-24 */}
        <div
          className="relative    w-[35%] sm:w-[20%] md:w-[35%]  aspect-square "
        >
          <Image
            src={startup?.basic?.coverPic?.url || avatarimg}
            alt=""
            height={1000}
            width={1000}
            className=" rounded-full w-[100%] h-[100%] object-fill"
          />
         { startup?.isVerified &&
          <div className="absolute w-6 h-6 sm:w-6 sm:h-6  md:w-8 md:h-8 top-0 right-0 transform -translate-y-1/3">
            <Image src={verify} alt="" className="w-full h-full object-contain" />
          </div>
          }
        </div>

        {/* </div> */}

        <div className="flex lg:flex-row md:flex-col sm:flex-row w-[65%] sm:w-[75%] md:w-[65%]  justify-between items-center gap-2 ">
          <div
            className="flex flex-col  gap-2 sm:gap-3  md:gap-0 lg:gap-4  w-[60%] md:w-[100%] lg:w-[60%] "
          >
            <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-0 lg:gap-2  justify-center">
              <h2 className=" md:text-xl sm:text-lg text-base font-medium text-black ">
                {/* Formonix */}
                {startup?.name || "No Name Startup"}
              </h2>

              <p className="opacity-40 text-black  text-xs sm:text-sm md:text-[15px] font-normal">
                {startup?.basic?.category?.name || "category not filled"}
              </p>
            </div>
            <p className="opacity-40 text-black text-[10px] sm:text-xs md:text-sm font-normal ">
              {startup?.followers?.length || "No"} followers
            </p>
          </div>
          <div className="w-[35%] md:w-[90%] lg:w-[40%] ">
            {isFollowed && isFollowed?.status === "pending" ? (
              <div
                onClick={onUnfollowButtonClick}
                className=" w-full flex   justify-center  items-center gap-0.5 sm:gap-0.5 md:gap-1 rounded-full px-2 sm:px-4 md:px-8 lg:px-12 py-0.5 sm:py-1 md:py-0.5 lg:py-2 border border-black cursor-pointer "
              >
                {/* <div className=" ">
              <FlatIcon className="flaticon-add-user text-2xl" />
            </div> */}
                <div className=" text-black text-[10px] sm:text-xs md:text-sm lg:text-base font-medium ">
                  <button>Requested</button>
                </div>
              </div>
            ) : isFollowed?.status === "accepted" ? (
              <div
                onClick={onUnfollowButtonClick}
                className=" w-full flex   justify-center  items-center gap-0.5 sm:gap-0.5 md:gap-1 rounded-full px-2 sm:px-4 md:px-8 lg:px-12 py-0.5 sm:py-1 md:py-0.5 lg:py-2 border border-black cursor-pointer "
              >
                {/* <div className=" ">
              <FlatIcon className="flaticon-add-user text-2xl" />
            </div> */}
                <div className=" text-black text-xs sm:text-sm md:text-base font-medium ">
                  <button>Following</button>
                </div>
              </div>
            ) : (
              <div
                onClick={onFollowButtonClick}
                className=" w-full flex  justify-center  items-center gap-0.5 sm:gap-1 md:gap-2 rounded-full px-4 sm:px-4 md:px-8 lg:px-12 py-0.5 sm:py-1 md:py-0.5 lg:py-2 border border-primary cursor-pointer "
              >
                <div className=" ">
                  <FlatIcon className="flaticon-add-user text-sm sm:text-lg md:text-2xl text-primary" />
                </div>
                <div className=" text-primary text-xs sm:text-sm md:text-base font-medium ">
                  <button>Follow</button>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* <Modal isOpen={isModalOpen} setOpen={setIsModalOpen}>
        <div className="flex flex-col gap-2 justify-center items-center">
          <CircularProgress className="!text-white"></CircularProgress>
          <p className="text-white font-medium text-lg">Processing...</p>
        </div>
      </Modal> */}
        {/* </div> */}
        {/* <div className="absolute  top-0 right-0 transform -translate-x-1/2 translate-y-1/2  cursor-pointer">
        <FlatIcon className="flaticon-close  md:text-xl sm:text-lg text-base text-black" />
      </div> */}
      </div>
    </Link>
  );
};

export default BussinessCard2;
