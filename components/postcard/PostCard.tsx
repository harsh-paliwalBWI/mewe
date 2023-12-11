"use client";
import React, { useState } from "react";

// import CategoryCard from "./categoryCard/CategoryCard";
import profile from "../../images/a5 2.svg";
import img1 from "../../images/abstract-virtual-fingerprint-illustration-modern-coworking-room-background-personal-biometric-data-concept-multiexposure 1.svg";
import img2 from "../../images/modern-luxury-hotel-office-reception-lounge-with-meeting-room 1.svg";

import Image from "next/image";
import FlatIcon from "../flatIcon/flatIcon";
import { Carousel } from "antd";
import moment from "moment";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "@/config/firebase-config";
import { getStartUpData } from "@/services/startupService";
import { getCookie } from "cookies-next";
import { useQuery } from "@tanstack/react-query";

// function calculateTimeDifference(createdAt) {

//   const parsedDate = new Date(createdAt.replace(' at', ''));

//   const currentDate = new Date();

//   // Calculate time difference in milliseconds
//   const timeDifference = currentDate - parsedDate;

//   // Calculate days and hours
//   const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//   const hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

//   // Construct the result string
//   let result = '';
//   if (daysDifference > 0) {
//       result += `${daysDifference} Days `;
//   }
//   if (hoursDifference > 0) {
//       result += `${hoursDifference} Hours `;
//   }

//   result += 'ago';

//   return result;
// }

const PostCard = (singlePost: any) => {
  const [isNewPost, setIsNewPost] = useState(false);
  const [data2, setData2] = useState(null);
  const [docId, setDocId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postMessages, setPostMessages] = useState<{ [key: string]: string }>(
    {}
  );
  const [viewMessage, setViewMessage] = useState([]);
  const [viewComment, setViewComment] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const cookies = { value: getCookie("uid") };

  const { data: startUpData } = useQuery({
    queryKey: ["startUpData"],
    queryFn: () => getStartUpData(cookies),
  });

  let singlePostdata = singlePost?.singlePost;
  // console.log(singlePostdata, "bbbb");

  const PostTime = singlePostdata?.createdAt?.toDate
    ? singlePostdata.createdAt.toDate()
    : null;

  // console.log(singlePostdata,"bbbbbbbb")
  // Calculate the duration
  const now = moment();
  const duration = moment.duration(now.diff(PostTime));
  let formattedTime;
  if (duration.asSeconds() < 60) {
    formattedTime = `${Math.floor(duration.asSeconds())} second(s) ago`;
  } else if (duration.asMinutes() < 60) {
    formattedTime = `${Math.floor(duration.asMinutes())} minute(s) ago`;
  } else if (duration.asHours() < 24) {
    formattedTime = `${Math.floor(duration.asHours())} hour(s) ago`;
  } else if (duration.asDays() < 7) {
    formattedTime = `${Math.floor(duration.asDays())} day(s) ago`;
  } else if (duration.asWeeks() < 4) {
    formattedTime = `${Math.floor(duration.asWeeks())} week(s) ago`;
  } else {
    formattedTime = moment(PostTime)?.format("DD/MM/YYYY"); // Show full date if more than a week
  }

  const onCommentHandler = async (docId: any) => {
    if (startUpData) {
      const createdBy = {
        name: startUpData?.name,
        id: startUpData?.id,
        image: startUpData?.basic?.coverPic,
      };

      setIsModalOpen(true);
      const message = postMessages[docId] || "";
      const ref = collection(db, `posts/${docId}/comments`);
      try {
        await addDoc(ref, { message, createdAt: new Date(), createdBy });
        toast.success("Comment added.");
        setPostMessages((prevMessages) => ({ ...prevMessages, [docId]: "" }));
        setIsModalOpen(false);
      } catch (error) {
        setIsModalOpen(false);
        toast.error("Failed to add comment");
      }
    } else {
      toast.error("Please login to comment.");
    }
  };

  const onViewCommentHandler = async (docId: any) => {
    const orderedPosts = query(
      collection(db, `posts/${docId}/comments`),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(orderedPosts);
    const arr: any = [];
    querySnapshot.forEach((doc) => {
      const dataObj = doc.data();
      arr.push(dataObj);
    });
    // console.log(arr,"commeyn arr");
    setViewMessage(arr);
  };

  const postMessage = postMessages[singlePostdata?.id] || "";
  return (
    <div className="flex flex-col justify-center gap-1 sm:gap-2 md:gap-3  bg-[#f7f9fb] p-4 sm:p-6 md:p-8 ">
      <div className=" flex items-center justify-between ">
        <div className=" flex items-center  gap-2 sm:gap-3 md:gap-4 ">
          <div className="w-8 h-8 sm:w-12 sm:h-12  md:w-16 md:h-16  rounded-full  overflow-hidden">
            <Image
              src={
                // profile
                singlePostdata?.createdBy?.image?.url
                  ? //  &&  singlePostdata?.createdBy?.image?.url?.includes("bwi-mewe.appspot")
                    singlePostdata?.createdBy?.image?.url
                  : profile
              }
              alt=""
              width={1000}
              height={1000}
              className="h-full w-full object-cover "
            />
          </div>
          <div className="flex flex-col gap-0.5 md:gap-1 ">
            <div className="flex  gap-1 sm:gap-2 md:gap-3 items-center ">
              <h2 className="text-[#205d9d] text-sm sm:text-base md:text-lg font-medium ">
                {/* Code Fusion */}
                {singlePostdata?.createdBy?.name}
              </h2>
              <span className="h-0.5 w-0.5 sm:h-1 sm:w-1 md:h-1.5 md:w-1.5 bg-[#205d9d] aspect-square rounded-full text-center"></span>
              <p className="  text-[#626565] md:text-base sm:text-sm text-xs font-medium  h-fit ">
                {/* 5mins ago */}
                {formattedTime}
              </p>
            </div>

            <p className=" text-[#626565] md:text-base sm:text-sm text-xs font-medium">
              {/* @codefusion243 */}
              {singlePostdata?.createdBy?.name}
            </p>
          </div>
        </div>
        <FlatIcon className="flaticon-options md:text-3xl sm:text-2xl text-xl text-[#054A91]  " />
      </div>

      <div className="relative rounded sm:rounded-lg md:rounded-xl">
        <Carousel dotPosition="bottom" className="dot-white" autoplay>
          {singlePostdata?.images?.map((singleImg: any, idx: number) => {
            return (
              <div
                className="lg:h-64 md:h-52 sm:h-40 h-28  w-full  rounded sm:rounded-lg md:rounded-xl  overflow-hidden "
                key={idx}
              >
                <Image
                  src={
                    // img2
                    singleImg?.url
                      ? //  && singleImg.url?.includes("bwi-mewe.appspot")
                        singleImg?.url
                      : img2
                  }
                  width={1000}
                  height={1000}
                  alt=""
                  className="h-full w-full object-contain "
                />
              </div>
            );
          })}

          {/* <div className="h-auto w-full  rounded sm:rounded-lg md:rounded-xl overflow-hidden ">
            <Image
              src={img2}
              alt=""
              className="h-full w-full object-contain "
            />
          </div>
          <div className="h-auto w-full rounded sm:rounded-lg md:rounded-xl overflow-hidden ">
            <Image
              src={img2}
              alt=""
              className="h-full w-full object-contain "
            />
          </div> */}
        </Carousel>

        <div className=" flex justify-between bg-[#054a91] py-1 sm:py-2 md:py-3 px-3 sm:px-4 md:px-5  absolute bottom-0 transform translate-y-1/2 w-full  rounded-b sm:rounded-b-lg md:rounded-b-xl">
          <div className=" flex gap-2 sm:gap-3 md:gap-4">
            <FlatIcon className="flaticon-heart md:text-2xl sm:text-xl text-lg font-bold text-white " />
            <FlatIcon className="flaticon-chat md:text-2xl sm:text-xl text-lg font-bold text-white " />
          </div>

          <FlatIcon className="flaticon-send md:text-2xl sm:text-xl text-lg font-bold text-white " />
        </div>
      </div>

      <div className="flex-col gap-1 sm:gap-2 md:gap-3 mt-6 sm:mt-8 md:mt-10 mb-2 sm:mb-3 md:mb-4 ">
        <h2
          className="font-semibold  text-gray-800 md:text-xl sm:text-lg text-base"
          style={{
            overflowWrap: "break-word",
            maxWidth: "100%",
          }}
        >
          {/* Deliver Conference */}
          {singlePostdata?.title}
        </h2>
        <div
          className=" text-gray-400 md:text-xs sm:text-[10px] text-[8px] font-normal "
          style={{
            overflowWrap: "break-word",
            maxWidth: "100%",
          }}
        >
          {/* Eth2Vec: Learning contract-wide code representations for vulnerability
          detection on Ethereum smart cEth2Vec: Learning contract-wide code
          representations for vulnerability detection on Ethereum smart c */}
          {singlePostdata?.description}
        </div>
      </div>

      <div className="w-full bg-white border-2 border-gray-300  rounded-full flex items-center md:gap-5   comment-placeholder px-2 sm:px-3 md:px-4 py-0.5 sm:py-2 md:py-3 text-xs sm:text-sm md:text-base font-normal">
        <input
          value={postMessage}
          onChange={(e) =>
            setPostMessages((prevMessages) => ({
              ...prevMessages,
              [singlePostdata?.id]: e.target.value,
            }))
          }
          type="text"
          placeholder="Write something.."
          className="w-[100%]  lg:px-5 px-3 md:py-2 py-1 rounded-full  outline-0 placeholder:text-gray-300 text-black"
        />
        <button
          onClick={async () => {
            await onCommentHandler(singlePostdata?.id);
          }}
          className="md:px-4 px-2 md:py-2 py-1 rounded-full bg-primary text-white md:text-sm text-xs "
        >
          Comment
        </button>
      </div>
      <div>
        {/* <OutsideClickHandler
                      onClick={() => {
                        setViewComment(false);
                      }}
                    > */}
        <div className="">
          <div className="text-sm text-primary underline flex items-center gap-1 p-1 ">
            {/* <p className="underline">(0)</p> */}
            <button
              className=""
              onClick={async () => {
                setData2(singlePostdata?.id);
                onViewCommentHandler(singlePostdata?.id);
                setViewComment((prev) => !prev);
              }}
            >
              View comments
            </button>
          </div>
        </div>
        {/* </OutsideClickHandler> */}
        {viewComment && data2 === singlePostdata?.id && (
          <div className="flex flex-col">
            {viewMessage && viewMessage.length > 0 ? (
              viewMessage.map((msg: any, idx: any) => {
                const commentTime = msg?.createdAt?.toDate();
                const now2 = moment();
                const duration = moment.duration(now2.diff(commentTime));
                let formattedTime2;
                if (duration.asSeconds() < 60) {
                  formattedTime2 = `${Math.floor(
                    duration.asSeconds()
                  )} second(s) ago`;
                } else if (duration.asMinutes() < 60) {
                  formattedTime2 = `${Math.floor(
                    duration.asMinutes()
                  )} minute(s) ago`;
                } else if (duration.asHours() < 24) {
                  formattedTime2 = `${Math.floor(
                    duration.asHours()
                  )} hour(s) ago`;
                } else if (duration.asDays() < 7) {
                  formattedTime2 = `${Math.floor(
                    duration.asDays()
                  )} day(s) ago`;
                } else if (duration.asWeeks() < 8) {
                  formattedTime2 = `${Math.floor(
                    duration.asWeeks()
                  )} week(s) ago`;
                } else {
                  formattedTime2 = moment(commentTime)?.format("DD/MM/YYYY"); // Show full date if more than a week
                }
                return (
                  <div key={idx} className="mt-4 w-full">
                    <div className="flex  items-start gap-2 w-full">
                      <div className="flex items-start gap-4 w-full">
                        <div className="w-[6%]  aspect-square rounded-full">
                          <Image
                            src={msg.createdBy?.image?.url}
                            alt=""
                            height={1000}
                            width={1000}
                            className="h-[100%] w-[100%] rounded-full"
                          />
                        </div>
                        <div className=" flex flex-col gap-1 w-[92%]">
                          <div className=" flex flex-col gap-1">
                            <div className="flex gap-3 items-center ">
                              {msg.createdBy?.name && (
                                <p className="text-sm text-primary">
                                  {msg.createdBy?.name
                                    ? msg.createdBy?.name
                                    : ""}
                                </p>
                              )}
                              <div>
                                <p className="text-xs text-[#636464]">
                                  {formattedTime2}
                                </p>
                              </div>
                            </div>
                            <p className="text-sm text-ellipsis break-words ...">
                              {msg.message}
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* <div className="">
                                      <p className="text-xs text-[#636464]">{formattedTime2}</p>
                                    </div> */}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-[#636464]">No comments yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
