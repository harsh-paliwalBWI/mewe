"use client";
import React, { FC, useState, Fragment } from "react";
import Image from "next/image";
import "@ant-design/cssinjs";
import { Carousel } from "antd";
import FlatIcon from "../flatIcon/flatIcon";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPosts } from "@/services/postService";
import { constant } from "@/utils/constants";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase-config";
import { toast } from "react-toastify";
import OutsideClickHandler from "../../utils/OutsideClickHandler";
import moment from "moment";
import Modal from "../Modal/modal";
import { CircularProgress } from "@mui/material";
import { getStartUpData } from "@/services/startupService";
import { getCookie } from "cookies-next";
import { Transition } from "@headlessui/react";
import { Menu } from "@headlessui/react";
import Loader from "../loader/Loader";
import Link from "next/link";

interface Props {
  aboutInfo: any;
}

const PostsSlider: FC<Props> = ({ aboutInfo }) => {
  console.log(aboutInfo, "POST SLIDES");

  const cookies = { value: getCookie("uid") };
  const [data2, setData2] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postMessages, setPostMessages] = useState<{ [key: string]: string }>(
    {}
  );
  const [viewMessage, setViewMessage] = useState([]);
  const [viewComment, setViewComment] = useState(false);
  const [docId, setDocId] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const queryClient = useQueryClient();

  const { data: postsData } = useQuery({
    queryKey: ["postsData"],
    queryFn: () => fetchPosts(aboutInfo.id),
  });
  console.log(postsData, "post data");

  const { data: startUpData } = useQuery({
    queryKey: ["startUpData"],
    queryFn: () => getStartUpData(cookies),
  });

  // console.log("startUpData", startUpData);

  const onViewCommentHandler = async (docId: any) => {
    // console.log(docId,"docId");
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
    console.log(arr, "commeyn arr");
    setViewMessage(arr);
  };

  const onCommentHandler = async (docId: any) => {
    const createdBy = {
      id: startUpData?.id,
      name: startUpData?.name,
      image: {
        mob: startUpData?.basic?.coverPic?.mob
          ? startUpData?.basic?.coverPic?.mob
          : "",
        thumb: startUpData?.basic?.coverPic?.thumb
          ? startUpData?.basic?.coverPic?.thumb
          : "",
        url: startUpData?.basic?.coverPic?.url
          ? startUpData?.basic?.coverPic?.url
          : "",
      },
    };
    console.log("from click", docId, createdBy);
    setIsLoading(true);
    setIsModalOpen(true);
    const message = postMessages[docId] || "";
    const ref = collection(db, `posts/${docId}/comments`);
    try {
      if (docId && startUpData) {
        await addDoc(ref, { message, createdAt: new Date(), createdBy });
        toast.success("Comment added.");
        setPostMessages((prevMessages) => ({ ...prevMessages, [docId]: "" }));
        setIsLoading(false);
        setIsModalOpen(false);
      } else {
        toast.error("Failed to add comment");
      }
    } catch (error) {
      setIsLoading(false);
      setIsModalOpen(false);
      // console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    }
  };

  const postDeleteHandler = async () => {
    console.log("clikced", docId);
    setIsLoading(true);
    try {
      await deleteDoc(doc(db, "posts", docId));
      await queryClient.invalidateQueries({ queryKey: ["postsData"] });
      await queryClient.refetchQueries({ queryKey: ["postsData"] });
      toast.success("Post deleted successfully.");
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to delete post.");
      setIsLoading(false);
    }
  };

  return (
    <>
      {postsData && postsData?.length <= 0 ? (
        <div className="text-base text-center md:h-[58vh] h-[30vh] bg-[#F8FAFC] flex items-center justify-center text-primary ">
          <h1>No posts yet !</h1>
        </div>
      ) : (
        <div className="  w-full  h-fit ">
          <div className="flex flex-col gap-8">
            {postsData &&
              postsData?.length > 0 &&
              postsData?.map((post: any, idx: number) => {
                const commentTime = post?.createdAt?.toDate();
                // Calculate the duration
                // old startt 
                // const now = moment();
                // const duration = moment.duration(now.diff(commentTime));
                // let formattedTime;
                // if (duration.asSeconds() < 60) {
                //   formattedTime = `${Math.floor(
                //     duration.asSeconds()
                //   )} second(s) ago`;
                // } else if (duration.asMinutes() < 60) {
                //   formattedTime = `${Math.floor(
                //     duration.asMinutes()
                //   )} minute(s) ago`;
                // } else if (duration.asHours() < 24) {
                //   formattedTime = `${Math.floor(
                //     duration.asHours()
                //   )} hour(s) ago`;
                // } else if (duration.asDays() < 7) {
                //   formattedTime = `${Math.floor(duration.asDays())} day(s) ago`;
                // } else if (duration.asWeeks() < 4) {
                //   formattedTime = `${Math.floor(
                //     duration.asWeeks()
                //   )} week(s) ago`;
                // } else {
                //   formattedTime = commentTime.format("MMMM D, YYYY"); // Show full date if more than a week
                // }
                // old end 

                let formattedTime;
const commentMoment = moment(commentTime);

if (commentMoment.isValid()) {
  const now = moment();
  const duration = moment.duration(now.diff(commentMoment));

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
    formattedTime = commentMoment.format("MMMM D, YYYY");
  }
} else {
  // Handle the case where commentTime is not a valid date
  formattedTime = "Invalid date";
}
                const postMessage = postMessages[post.id] || "";
                return (
                  <div
                    key={idx}
                    className=" bg-[#F8FAFC] xl:px-8 px-4 xl:pt-8 pt-4 xl:pb-10 pb-5  w-full"
                  >
                    <div className=" ">
                      <div className="flex justify-between  ">
                        <div className="flex items-center sm:gap-5 gap-3  mb-4">
                          <div className="w-[65px] h-[65px] rounded-full">
                            <Image
                              src={post?.createdBy?.image?.url}
                              alt=""
                              height={1000}
                              width={1000}
                              className="h-[100%] w-[100%] object-fill rounded-full "
                            />
                          </div>
                          <div className="">
                            <div className="flex items-center sm:gap-3 gap-2">
                              <div className="text-primary font-semibold xl:text-lg sm:text-sm text-xs">
                                {/* Code Fusion */}
                                {post?.createdBy?.name}
                              </div>
                              <div className="h-[5px] w-[5px] rounded-full bg-primary">
                                {" "}
                              </div>
                              <div className="text-[#636464] lg:text-sm text-xs font-medium ">
                                {formattedTime}
                                {/* 5mins ago */}
                              </div>
                            </div>
                            <div className="text-[#636464] lg:text-sm text-xs font-medium ">
                              {aboutInfo?.email ? aboutInfo?.email : ""}
                              {/* @codefusion243 */}
                            </div>
                          </div>
                        </div>
                        {/* <div className="flex items-center gap-1">
                          <FlatIcon className="flaticon-options  text-primary xl:text-4xl sm:text-2xl text-xl" />
                        </div> */}
                        {/* delte post start  */}

                        {startUpData?.id === aboutInfo?.id && (
                          <div className=" flex items-center ">
                            <Menu
                              as="div"
                              className="relative text-left flex justify-center items-center "
                            >
                              <div className="flex justify-center items-center ">
                                <Menu.Button className="">
                                  <div className="flex items-center ">
                                    <FlatIcon className="flaticon-options text-primary xl:text-4xl sm:text-2xl text-xl " />
                                  </div>
                                </Menu.Button>
                              </div>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className="z-50 absolute right-0 mt-2 top-full w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  <div className="px-1 py-1 ">
                                    <Menu.Item>
                                      {({ active }) => (
                                        <button
                                          onClick={() => {
                                            setDocId(post?.id);
                                            setIsDeleted(true);
                                            // console.log(post.id);
                                          }}
                                          className={`${
                                            active
                                              ? "bg-primary text-white"
                                              : "text-gray-900"
                                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                          {/* {active ? "active" : "notActive"} */}
                                          Delete
                                        </button>
                                      )}
                                    </Menu.Item>
                                  </div>
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          </div>
                        )}
                        {/* delete psot end  */}
                      </div>
                      <div className=" sm:h-[300px] h-[200px] w-full relative  ">
                        <Carousel
                          autoplay
                          dots={true}
                          dotPosition="bottom"
                          className=" h-full rounded-lg  w-[100%]"
                        >
                          {post?.images &&
                            post?.images?.length > 0 &&
                            post?.images?.map((singleImg: any, idx: number) => {
                              return (
                                <div
                                  key={idx}
                                  className="w-full sm:h-[300px] h-[200px] rounded-lg relative "
                                >
                                  <Image
                                    src={singleImg?.url}
                                    alt=""
                                    height={1000}
                                    width={1000}
                                    className="w-[100%] sm:h-[300px] h-[200px] object-cover rounded-lg "
                                  />
                                  <div className="bg-primary absolute bottom-0 left-0 w-[100%] border  py-2.5 px-5 flex justify-between items-center  rounded-br-lg rounded-bl-lg">
                                    <div className="flex items-center gap-4">
                                      <div>
                                        <FlatIcon className="flaticon-heart text-white text-xl" />
                                      </div>
                                      <div>
                                        <FlatIcon className="flaticon-chat text-white text-xl" />
                                      </div>
                                    </div>
                                    <div>
                                      <FlatIcon className="flaticon-send text-white text-xl" />
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </Carousel>
                      </div>
                      <div>
                        <div className="flex flex-col md:gap-7 gap-4 xl:mt-10 mt-5">
                          <div className="flex flex-col gap-1">
                            <h2
                              className="xl:text-lg lg:text-base text-sm font-semibold "
                              style={{
                                overflowWrap: "break-word",
                                maxWidth: "100%",
                              }}
                            >
                              {/* Deliver Conference */}
                              {post?.title}
                            </h2>
                            {
                                post?.taggedStartups&&post?.taggedStartups.length>0&&
                             <div className="flex items-center gap-2">
                              {
                                post?.taggedStartups&&post?.taggedStartups.length>0&&post?.taggedStartups.map((item:any,idx:number)=>{
                                  return <Link key={idx} href={`/startup/${item?.slug}`}
                                  onClick={(e) => {
                                    if (
                                     item?.slug===""
                                    ) {
                                      e.preventDefault();
                                    }
                                  }}
                                  >

                                  <div className="flex items-center  text-sm">
                                  <p className="text-primary underline">{item.name}</p>
                                  {idx < post?.taggedStartups.length - 1 && ','}
                                  </div>
                                  </Link>
                                })
                              }
                             </div>
                              }
                            {/* <p className="text-xs text-[#9fa0a2]  font-medium border border-[red] w-[100%] h-auto">
                      <p className="w-fit">
                      {post.description}
                      </p>
                    </p> */}
                            <div className="text-xs text-[#9fa0a2] font-medium  w-[100%] h-auto">
                              <p
                                className="w-fit"
                                style={{
                                  overflowWrap: "break-word",
                                  maxWidth: "100%",
                                }}
                              >
                                {post?.description}
                              </p>
                            </div>
                          </div>
                          <div className="w-full bg-white border border-gray-500 rounded-full flex items-center md:gap-5 pr-1 comment-placeholder">
                            <input
                              value={postMessage}
                              onChange={(e) =>
                                setPostMessages((prevMessages) => ({
                                  ...prevMessages,
                                  [post.id]: e.target.value,
                                }))
                              }
                              type="text"
                              placeholder="Write something.."
                              className="w-[100%]  xl:px-10 px-5 md:py-3 py-2 rounded-full  outline-0"
                            />
                            <button
                              onClick={async () =>
                                await onCommentHandler(post?.id)
                              }
                              className="md:px-5 px-3 md:py-2 py-1 rounded-full bg-primary text-white md:text-sm text-sm "
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
                                    setData2(post?.id);
                                    onViewCommentHandler(post?.id);
                                    setViewComment((prev) => !prev);
                                  }}
                                >
                                  View comments
                                </button>
                              </div>
                            </div>
                            {/* </OutsideClickHandler> */}
                            {viewComment && data2 === post?.id && (
                              <div className="flex flex-col">
                                {viewMessage && viewMessage?.length > 0 ? (
                                  viewMessage?.map((msg: any, idx: any) => {
                                    console.log(msg, "from view msg");

                                    const commentTime2 =
                                      msg?.createdAt?.toDate();
                                    const now2 = moment();
                                    const duration = moment.duration(
                                      now2.diff(commentTime2)
                                    );
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
                                    } else if (duration.asWeeks() < 4) {
                                      formattedTime2 = `${Math.floor(
                                        duration.asWeeks()
                                      )} week(s) ago`;
                                    } else {
                                      formattedTime2 =
                                        commentTime.format("MMMM D, YYYY"); // Show full date if more than a week
                                    }
                                    // console.log(msg.createdBy?.name);
                                    return (
                                      <div
                                          key={idx}
                                          className="mt-4 w-full"
                                        >
                                          <div className="flex  items-start gap-2  w-full">
                                            <div className="flex items-start gap-4  w-full">
                                              <div className="w-[6%]  aspect-square rounded-full ">
                                                <Image
                                                  src={
                                                    msg?.createdBy?.image?.url
                                                  }
                                                  alt=""
                                                  height={1000}
                                                  width={1000}
                                                  className="h-[100%] w-[100%] rounded-full"
                                                />
                                              </div>
                                              <div className=" flex flex-col gap-1 w-[92%] ">
                                                <div className=" flex flex-col gap-1 w-full">
                                                  <div className="flex gap-3 items-center ">
                                                    {msg.createdBy?.name && (
                                                      <p className="text-sm text-primary">
                                                        {msg?.createdBy?.name
                                                          ? msg?.createdBy?.name
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
                                                    {msg?.message}
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
                                  <p className="text-sm text-[#636464]">
                                    No comments yet.
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {isDeleted && (
                      <div className="h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.5)] fixed top-0 left-0  flex justify-center items-center z-30">
                        <div className="sm:w-fit w-[90%]  bg-[white] rounded-md md:px-5 px-5 md:py-5 py-5">
                          <div className="flex flex-col md:gap-7 gap-5">
                            <div className="text-gray-600 sm:text-base text-sm mt-2">
                              <h2>
                                Are you sure you want to delete this post ?
                              </h2>
                            </div>
                            <div className="flex w-full gap-5 sm:text-sm text-xs">
                              <div
                                onClick={async () => {
                                  setIsDeleted(false);
                                  await postDeleteHandler();
                                }}
                                className="w-[50%] bg-primary text-white py-2.5 rounded-md cursor-pointer flex items-center justify-center "
                              >
                                <button
                                  style={{
                                    height: "100%",
                                    position: "relative",
                                  }}
                                >
                                  {isLoading && (
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
                                  {!isLoading && "Yes"}
                                </button>
                              </div>
                              <div
                                onClick={() => setIsDeleted(false)}
                                className="w-[50%] bg-black text-white rounded-md flex items-center py-2.5 justify-center cursor-pointer"
                              >
                                <button>No</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
          <Modal isOpen={isModalOpen} setOpen={setIsModalOpen}>
            <div className="flex flex-col gap-2 justify-center items-center">
              <CircularProgress className="!text-white"></CircularProgress>
              <p className="text-white font-medium text-lg">Adding comment..</p>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default PostsSlider;
