"use client";
import React, { useRef } from "react";
import Modal from "@/components/Modal/modal";
import FlatIcon from "@/components/flatIcon/flatIcon";
import Loader from "@/components/loader/Loader";
import { db } from "@/config/firebase-config";
import { getStartUpData } from "@/services/startupService";
import "@ant-design/cssinjs";
import { Menu, Transition } from "@headlessui/react";
import { CircularProgress } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Carousel } from "antd";
import { getCookie } from "cookies-next";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import moment from "moment";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { GoHeartFill } from "react-icons/go";
import { toast } from "react-toastify";
import Link from "next/link";

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

const PostCard2 = (singlepost: any) => {
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
  const [isEdit, setIsEdit] = useState(false);
  const queryClient = useQueryClient();
  const [liked, setLiked] = useState(false);
  const [client, setClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const post = singlepost?.singlepost;
  const [postInfo, setpostInfo] = useState({
    title: post?.title,
    description: post?.description,
  });

  const cookies = { value: getCookie("uid") };
  const commentInputRef = useRef<HTMLInputElement | null>(null);

  const { data: startUpData } = useQuery({
    queryKey: ["startUpData"],
    queryFn: () => getStartUpData(cookies),
  });

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

  const onCommentHandler = async (docId: any, createdBy: any) => {
    const message = postMessages[docId] || "";

    if (!message.trim()) {
      toast.error("Please type something before adding a comment.");
      return;
    }

    setIsModalOpen(true);

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
  };

  const onLikeHandler = async (docId: any) => {
    if (startUpData) {
      const createdBy = {
        name: startUpData?.name,
        id: startUpData?.id,
        image: startUpData?.basic?.coverPic,
      };

      const likeRef = collection(db, `posts/${docId}/likes`);
      try {
        await addDoc(likeRef, { createdAt: new Date(), createdBy });

        setLiked(true);

        await queryClient.invalidateQueries({ queryKey: ["postsData"] });
        await queryClient.refetchQueries({ queryKey: ["postsData"] });

        // toast.success("Like added.");
      } catch (error) {
        setIsModalOpen(false);
        toast.error("Failed to add Like");
      }
    } else {
      toast.error("Please login to Like.");
    }
  };

  const onUnlikeHandler = async (docId: any) => {
    // Reference to the 'likes' collection for the specific post
    const likeRef = collection(db, `posts/${docId}/likes`);

    try {
      const likeQuery = query(
        likeRef,
        where("createdBy.id", "==", startUpData?.id)
      );

      // Get the like document
      const likeSnapshot = await getDocs(likeQuery);

      likeSnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      setLiked(false);

      await queryClient.invalidateQueries({ queryKey: ["postsData"] });
      await queryClient.refetchQueries({ queryKey: ["postsData"] });

      //   toast.success("Like removed.");
    } catch (error) {
      setIsModalOpen(false);
      toast.error("Failed to remove Like");
    }
  };

  const hasLiked = async (postId: any) => {
    // Reference to the 'likes' subcollection for the specific post
    const likeRef = collection(db, `posts/${postId}/likes`);

    // Create a query to check if the current user has liked the post
    const likeQuery = query(
      likeRef,
      where("createdBy.id", "==", startUpData?.id)
    );

    // Get the like documents
    const likeSnapshot = await getDocs(likeQuery);

    // Check if the user has liked the post
    return !likeSnapshot.empty;
  };

  const postDeleteHandler = async () => {
    // console.log("clikced",docId);
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

  const onSaveChangesHandler = async () => {
    setLoading(true);
    try {
      const refDoc = doc(db, `posts/${post.id}`);

      const details = {
        title: postInfo.title,
        description: postInfo.description,
      };
      await setDoc(refDoc, details, { merge: true });

      await queryClient.invalidateQueries({ queryKey: ["postsData"] });
      await queryClient.refetchQueries({ queryKey: ["postsData"] });
      toast.success("Changes saved successfully.");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred while saving changes.");
    }
  };

  useEffect(() => {
    const checkLiked = async () => {
      if (post?.id && startUpData?.id) {
        const hasLikedPost = await hasLiked(post?.id);
        setLiked(hasLikedPost);
      }
    };

    checkLiked();
  }, [post?.id, startUpData?.id]);

  useEffect(() => {
    // console.log("inside use effect");
    setClient(true);
  }, []);

  const commentTime = post?.createdAt?.toDate();
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

  // const commentTime = post?.createdAt?.toDate();
  // // Calculate the duration
  // const now = moment();
  // const duration = moment.duration(now.diff(commentTime));
  // let formattedTime;
  // if (duration.asSeconds() < 60) {
  //   formattedTime = `${Math.floor(duration.asSeconds())} second(s) ago`;
  // } else if (duration.asMinutes() < 60) {
  //   formattedTime = `${Math.floor(duration.asMinutes())} minute(s) ago`;
  // } else if (duration.asHours() < 24) {
  //   formattedTime = `${Math.floor(duration.asHours())} hour(s) ago`;
  // } else if (duration.asDays() < 7) {
  //   formattedTime = `${Math.floor(duration.asDays())} day(s) ago`;
  // } else if (duration.asWeeks() < 4) {
  //   formattedTime = `${Math.floor(duration.asWeeks())} week(s) ago`;
  // } else {
  //   commentTime instanceof Date
  //     ? moment(commentTime).format("MMMM D, YYYY")
  //     : "";
  // }
  const postMessage = postMessages[post?.id] || "";

  const descriptionContent = showFullDescription ? (
    <div
      className="text-gray-400 md:text-xs sm:text-[10px] text-[8px] font-normal"
      style={{
        overflowWrap: "break-word",
        maxWidth: "100%",
      }}
    >
      {post?.description}
    </div>
  ) : (
    <div
      className="text-gray-400 md:text-xs sm:text-[10px] text-[8px] font-normal line-clamp-1"
      style={{
        overflowWrap: "break-word",
        maxWidth: "100%",
        display: "-webkit-box",
        WebkitLineClamp: 1,
        WebkitBoxOrient: "vertical",
        textOverflow: "ellipsis",
      }}
    >
      {post?.description}
    </div>
  );

  const isMultilineDescription =
    post?.description && post?.description.split("\n").length > 1;

  return (
    <div className=" bg-[#F8FAFC] xl:px-8 px-4 xl:pt-8 pt-4 xl:pb-10 pb-5  w-full">
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
                <div className="text-primary font-semibold lg:text-lg sm:text-sm text-xs">
                  {/* Code Fusion */}
                  {post?.createdBy?.name}
                </div>
                <div className="h-[5px] w-[5px] rounded-full bg-primary"> </div>
                <div className="text-[#636464] lg:text-sm text-xs font-medium ">
                  {formattedTime}
                  {/* 5mins ago */}
                </div>
              </div>
              <div className="text-[#636464] lg:text-sm text-xs font-medium ">
                {/* @codefusion243 */}
                {startUpData?.email}
              </div>
            </div>
          </div>
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
                            // s etDocId(post?.id);
                            setIsEdit(true);
                            // console.log(post.id);
                          }}
                          className={`${
                            active ? "bg-primary text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Edit Post
                        </button>
                      )}
                    </Menu.Item>
                  </div>
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
                            active ? "bg-primary text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Delete
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
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
                  </div>
                );
              })}
          </Carousel>
          <div className="bg-primary absolute bottom-0 left-0 w-[100%] border  py-2.5 px-5 flex justify-between items-center  rounded-br-lg rounded-bl-lg">
            <div className="flex items-center gap-4">
              <div
                onClick={async () =>
                  await (liked
                    ? onUnlikeHandler(post?.id)
                    : onLikeHandler(post?.id))
                }
              >
                {liked ? (
                  <GoHeartFill className="flaticon-technology text-white text-xl cursor-pointer" />
                ) : (
                  <FlatIcon className="flaticon-heart text-white text-xl cursor-pointer" />
                )}
              </div>

              <div
                onClick={() => {
                  // Focus on the comment input field when the chat icon is clicked
                  commentInputRef.current?.focus();
                }}
              >
                <FlatIcon className="flaticon-chat text-white text-xl cursor-pointer" />
              </div>
            </div>
            <div>
              <FlatIcon className="flaticon-send text-white text-xl cursor-pointer" />
            </div>
          </div>
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

              {post?.taggedStartups && post?.taggedStartups.length > 0 && (
                <div className="flex items-center gap-2">
                  {post?.taggedStartups &&
                    post?.taggedStartups.length > 0 &&
                    post?.taggedStartups.map((item: any, idx: number) => {
                      return (
                        <Link
                          key={idx}
                          href={`/startup/${item?.slug}`}
                          onClick={(e) => {
                            if (item?.slug === "") {
                              e.preventDefault();
                            }
                          }}
                        >
                          <div className="flex items-center  text-sm">
                            <p className="text-primary underline">
                              {item.name}
                            </p>
                            {idx < post?.taggedStartups.length - 1 && ","}
                          </div>
                        </Link>
                      );
                    })}
                </div>
              )}

              {/* <p className="text-xs text-[#9fa0a2]  font-medium">

          {post.description}
        </p> */}
              {/* <div className="text-xs text-[#9fa0a2] font-medium  w-[100%] h-auto">
                <p
                  className="w-fit"
                  style={{
                    overflowWrap: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {post?.description}
                </p>
              </div> */}
              <div className="flex-grow">{descriptionContent}</div>
              {/* {isMultilineDescription && ( */}
              <button
                className="mt-3 text-primary md:text-sm text-xs text-start w-fit"
                onClick={() => setShowFullDescription((prev) => !prev)}
              >
                {showFullDescription ? "View less" : "View more"}
              </button>
              {/* )} */}
            </div>
            <div className="w-full bg-white border border-gray-500 rounded-full flex items-center md:gap-5  pr-1 comment-placeholder">
              <input
                ref={commentInputRef}
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
                  await onCommentHandler(post?.id, post?.createdBy)
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
                      const commentTime2 = post?.createdAt?.toDate();
                      const now2 = moment();
                      const duration = moment.duration(now2.diff(commentTime2));
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
                          commentTime instanceof Date
                            ? moment(commentTime).format("MMMM D, YYYY")
                            : ""; // Show full date if more than a week
                      }
                      return (
                        <div key={idx} className="mt-4 w-full">
                          <div className="flex  items-start gap-2  w-full">
                            <div className="flex items-start gap-4  w-full">
                              <div className="w-[6%]  aspect-square rounded-full ">
                                <Image
                                  src={msg?.createdBy?.image?.url}
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
                    <p className="text-sm text-[#636464]">No comments yet.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isDeleted && (
        <div className="h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.3)] fixed top-0 left-0  flex justify-center items-center z-30">
          <div className="sm:w-fit w-[90%]  bg-[white] rounded-md md:px-5 px-5 md:py-5 py-5">
            <div className="flex flex-col md:gap-7 gap-5">
              <div className="text-gray-600 sm:text-base text-sm">
                <h2>Are you sure you want to delete this post ?</h2>
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
      {isEdit && (
        <div className="h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.3)] fixed top-0 left-0  flex justify-center items-center z-30">
          <div className="w-[30%] aspect-square bg-[white] rounded-md md:px-5 px-5 md:py-5 py-5">
            <div className="flex flex-col justify-between h-full">
              <div className="text-gray-600 md:text-lg sm:text-base text-sm text-center ">
                <h2>Post Edit</h2>
              </div>

              <div className="flex flex-col md:gap-7 gap-5 justify-between ">
                <div className=" flex flex-col gap-2 ">
                  <label
                    className={` lg:text-base text-sm text-primary font-semibold `}
                  >
                    Post Title
                  </label>
                  <div className="flex items-center px-3 rounded-md  bg-[#F8FAFC] title-container">
                    <div>
                      <FlatIcon className="flaticon-edit text-2xl text-[#969798]" />
                    </div>
                    <input
                      value={client && postInfo.title ? postInfo.title : ""}
                      onChange={(e) =>
                        setpostInfo({ ...postInfo, title: e.target.value })
                      }
                      type="text"
                      className={`rounded-md px-3 py-3 outline-0 bg-transparent text-sm w-full`}
                      placeholder="Write a Post Title "
                    />
                  </div>
                </div>
                <div className="w-full   flex flex-col gap-3 ">
                  <label
                    htmlFor=""
                    className={`lg:text-base text-sm text-primary font-semibold `}
                  >
                    Description
                  </label>
                  <div className="bg-[#F8FAFC] w-full rounded-md textarea-container ">
                    <textarea
                      value={
                        client && postInfo.description
                          ? postInfo.description
                          : ""
                      }
                      onChange={(e) =>
                        setpostInfo({
                          ...postInfo,
                          description: e.target.value,
                        })
                      }
                      name=""
                      id=""
                      className="bg-transparent px-3 py-2 w-full outline-0"
                      placeholder="Description"
                      rows={5}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="flex w-full gap-5 sm:text-sm text-xs">
                <div
                  onClick={async () => {
                    setIsEdit(false);
                    await onSaveChangesHandler();
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
                    {!isLoading && "Save Changes"}
                  </button>
                </div>
                <div
                  onClick={() => setIsEdit(false)}
                  className="w-[50%] bg-black text-white rounded-md flex items-center py-2.5 justify-center cursor-pointer"
                >
                  <button>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal isOpen={isModalOpen} setOpen={setIsModalOpen}>
        <div className="flex flex-col gap-2 justify-center items-center">
          <CircularProgress className="!text-white"></CircularProgress>
          <p className="text-white font-medium text-lg">Adding comment..</p>
        </div>
      </Modal>
      <Modal isOpen={loading} setOpen={setLoading}>
        <div className="flex flex-col gap-2 justify-center items-center">
          <CircularProgress className="!text-white"></CircularProgress>
          <p className="text-white font-medium text-lg">Saving changes..</p>
        </div>
      </Modal>
    </div>
  );
};

export default PostCard2;
