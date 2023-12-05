"use client";
import React, { useState } from "react";
import Image from "next/image";
import "@ant-design/cssinjs";
import { Carousel } from "antd";
import FlatIcon from "../flatIcon/flatIcon";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/services/postService";
import { constant } from "@/utils/constants";
import { addDoc, collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase-config";
import { toast } from "react-toastify";
import OutsideClickHandler from "../../utils/OutsideClickHandler";
import moment from "moment";
import Modal from "../Modal/modal";
import { CircularProgress } from "@mui/material";


const PostsSlider = () => {
  const [data2, setData2] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postMessages, setPostMessages] = useState<{ [key: string]: string }>({});
  const [viewMessage, setViewMessage] = useState([])
  const [viewComment, setViewComment] = useState(false)
  const { data: postsData } = useQuery({
    queryKey: ["postsData"],
    queryFn: () => fetchPosts(),
  });
  // console.log(postsData, "post data");

  const onViewCommentHandler = async (docId: any) => {
    // console.log(docId,"docId");
    const orderedPosts = query(collection(db, `posts/${docId}/comments`), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(orderedPosts);
    const arr: any = []
    querySnapshot.forEach((doc) => {
      const dataObj = doc.data()
      arr.push(dataObj)
    });
    // console.log(arr,"commeyn arr");
    setViewMessage(arr)
  }

  const onCommentHandler = async (docId: any, createdBy: any) => {
    // console.log("from click", docId, createdBy);
    setIsLoading(true)
    setIsModalOpen(true)
    const message = postMessages[docId] || "";
    const ref = collection(db, `posts/${docId}/comments`);
    try {
      await addDoc(ref, { message, createdAt: new Date(), createdBy });
      toast.success("Comment added.");
      setPostMessages((prevMessages) => ({ ...prevMessages, [docId]: "" }));
      setIsLoading(false)
      setIsModalOpen(false)
    } catch (error) {
      setIsLoading(false)
      setIsModalOpen(false)
      // console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    }
  };


  return (
    <>
      {
        postsData && postsData.length <= 0 ?
          (<div className="text-base text-center md:h-[58vh] h-[30vh] bg-[#F8FAFC] flex items-center justify-center text-primary ">
            <h1>No posts yet !</h1></div>) : (

            <div className="  w-full  h-fit ">
              <div className="flex flex-col gap-8">
                {postsData && postsData.length > 0 && postsData.map((post: any, idx: number) => {
                  const commentTime = post.createdAt.toDate();
                  // Calculate the duration
                  const now = moment();
                  const duration = moment.duration(now.diff(commentTime));
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
                    formattedTime = commentTime.format("MMMM D, YYYY"); // Show full date if more than a week
                  }
                  const postMessage = postMessages[post.id] || ""
                  return <div key={idx} className=" bg-[#F8FAFC] xl:px-8 px-4 xl:pt-8 pt-4 xl:pb-10 pb-5  w-full">
                    <div className=" ">
                      <div className="flex justify-between  ">
                        <div className="flex items-center sm:gap-5 gap-3  mb-4">
                          <div className="w-[65px] h-[65px] rounded-full">
                            <Image
                              src={post.createdBy?.image?.url}
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
                                {post.createdBy?.name}
                              </div>
                              <div className="h-[5px] w-[5px] rounded-full bg-primary"> </div>
                              <div className="text-[#636464] lg:text-sm text-xs font-medium ">
                                {formattedTime}
                                {/* 5mins ago */}
                              </div>
                            </div>
                            <div className="text-[#636464] lg:text-sm text-xs font-medium ">
                              @codefusion243
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <FlatIcon className="flaticon-options  text-primary xl:text-4xl sm:text-2xl text-xl" />
                        </div>
                      </div>
                      <div className=" sm:h-[300px] h-[200px] w-full relative  ">
                        <Carousel
                          autoplay
                          dots={true}
                          dotPosition="bottom"
                          className=" h-full rounded-lg  w-[100%]"
                        >
                          {post.images && post.images.length > 0 && post.images.map((singleImg: any, idx: number) => {
                            return <div key={idx} className="w-full sm:h-[300px] h-[200px] rounded-lg relative ">
                              <Image
                                src={singleImg.url}
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
                          })}
                        </Carousel>
                      </div>
                      <div>
                        <div className="flex flex-col md:gap-7 gap-4 xl:mt-10 mt-5">
                          <div className="flex flex-col gap-1">
                            <h2 className="xl:text-lg sm:text-sm text-sm font-semibold ">
                              {/* Deliver Conference */}
                              {post.title}
                            </h2>
                            {/* <p className="text-xs text-[#9fa0a2]  font-medium border border-[red] w-[100%] h-auto">
                      <p className="w-fit">
                      {post.description}
                      </p>
                    </p> */}
                            <div className="text-xs text-[#9fa0a2] font-medium  w-[100%] h-auto">
                              <p className="w-fit" style={{ overflowWrap: 'break-word', maxWidth: '100%' }}>
                                {post.description}
                              </p>
                            </div>
                          </div>
                          <div className="w-full bg-white border border-gray-500 rounded-full flex items-center md:gap-5 pr-1 comment-placeholder">
                            <input
                              value={postMessage}
                              onChange={(e) => setPostMessages((prevMessages) => ({ ...prevMessages, [post.id]: e.target.value }))}
                              type="text"
                              placeholder="Write something.."
                              className="w-[100%]  xl:px-10 px-5 md:py-3 py-2 rounded-full  outline-0"
                            />
                            <button onClick={async () => await onCommentHandler(post.id, post.createdBy)} className="md:px-5 px-3 md:py-2 py-1 rounded-full bg-primary text-white md:text-sm text-sm ">Comment</button>
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
                                    setData2(post.id);
                                    onViewCommentHandler(post.id);
                                    setViewComment((prev) => !prev);
                                  }}
                                >
                                  View comments
                                </button>
                              </div>
                            </div>
                            {/* </OutsideClickHandler> */}
                            {viewComment && data2 === post.id && (
                              <div className="flex flex-col">
                                {viewMessage && viewMessage.length > 0 ? (
                                  viewMessage.map((msg: any, idx: any) => {
                                    const commentTime2 = post.createdAt.toDate();
                                    const now2 = moment();
                                    const duration = moment.duration(now2.diff(commentTime2));
                                    let formattedTime2;
                                    if (duration.asSeconds() < 60) {
                                      formattedTime2 = `${Math.floor(duration.asSeconds())} second(s) ago`;
                                    } else if (duration.asMinutes() < 60) {
                                      formattedTime2 = `${Math.floor(duration.asMinutes())} minute(s) ago`;
                                    } else if (duration.asHours() < 24) {
                                      formattedTime2 = `${Math.floor(duration.asHours())} hour(s) ago`;
                                    } else if (duration.asDays() < 7) {
                                      formattedTime2 = `${Math.floor(duration.asDays())} day(s) ago`;
                                    } else if (duration.asWeeks() < 4) {
                                      formattedTime2 = `${Math.floor(duration.asWeeks())} week(s) ago`;
                                    } else {
                                      formattedTime2 = commentTime.format("MMMM D, YYYY"); // Show full date if more than a week
                                    }
                                    // console.log(msg.createdBy?.name);
                                    return <div key={idx} className="mt-4 ">
                                      <div className="flex  items-start gap-4 ">
                                        <div className="flex items-start gap-4 ">
                                          <div className="h-10 w-10 rounded-full"><Image src={msg.createdBy?.image?.url} alt="" height={1000} width={1000} className="h-[100%] w-[100%] rounded-full" /></div>
                                          <div className=" flex flex-col gap-1 ">
                                            <div className="flex gap-3 items-center ">
                                              {
                                                msg.createdBy?.name &&
                                                <p className="text-sm text-primary">{msg.createdBy?.name ? msg.createdBy?.name : ""}</p>
                                              }
                                              <div>
                                                <p className="text-xs text-[#636464]">{formattedTime2}</p>
                                              </div>
                                            </div>
                                            <p className="text-sm">{msg.message}</p>
                                          </div>
                                        </div>
                                        {/* <div className="border border-[red]">
                                  <p className="text-xs text-[#636464]">{formattedTime2}</p>
                                </div> */}
                                      </div>
                                    </div>
                                  })
                                ) : (
                                  <p className="text-sm text-[#636464]">No comments yet.</p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                })
                }
              </div>
              <Modal isOpen={isModalOpen} setOpen={setIsModalOpen}>
                <div className="flex flex-col gap-2 justify-center items-center">
                  <CircularProgress className="!text-white"></CircularProgress>
                  <p className="text-white font-medium text-lg">
                    Adding comment..
                  </p>
                </div>
              </Modal>
            </div>
          )
      }
    </>
  );
};

export default PostsSlider;






