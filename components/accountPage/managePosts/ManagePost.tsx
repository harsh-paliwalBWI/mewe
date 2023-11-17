"use client"
import React, { useState, Fragment } from 'react'
import NewPost from '../businessAccountPage/newPost/NewPost'
import img from "../../../images/hotel.svg"
import Image from 'next/image'
import logoImg from "../../../images/a5 2.svg"
import '@ant-design/cssinjs'
import FlatIcon from '@/components/flatIcon/flatIcon'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from "react-toastify";
import moment from "moment";
import { CircularProgress } from "@mui/material";
import { Carousel } from 'antd';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchPosts } from '@/services/postService'
import Modal from '@/components/Modal/modal'
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '@/config/firebase-config'
import { Transition } from "@headlessui/react";
import { Menu } from "@headlessui/react";
import Loader from '@/components/loader/Loader'
import OutsideClickHandler from '@/utils/OutsideClickHandler'


const ManagePost = () => {
  const [isNewPost, setIsNewPost] = useState(false)
  const pathName = usePathname()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [data2, setData2] = useState(null)
  const [docId, setDocId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postMessages, setPostMessages] = useState<{ [key: string]: string }>({});
  const [viewMessage, setViewMessage] = useState([])
  const [viewComment, setViewComment] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const { data: postsData } = useQuery({
    queryKey: ["postsData"],
    queryFn: () => fetchPosts(),
  });
  // console.log(postsData);

  const onViewCommentHandler = async (docId: any) => {
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
    setIsModalOpen(true)
    const message = postMessages[docId] || "";
    const ref = collection(db, `posts/${docId}/comments`);
    try {
      await addDoc(ref, { message, createdAt: new Date(), createdBy });
      toast.success("Comment added.");
      setPostMessages((prevMessages) => ({ ...prevMessages, [docId]: "" }));
      setIsModalOpen(false)
    } catch (error) {
      setIsModalOpen(false)
      toast.error("Failed to add comment");
    }
  };
  const postDeleteHandler = async () => {
    // console.log("clikced",docId);
    setIsLoading(true)
    try {
      await deleteDoc(doc(db, "posts", docId));
      await queryClient.invalidateQueries({ queryKey: ['postsData'] })
      await queryClient.refetchQueries({ queryKey: ['postsData'] })
      toast.success("Post deleted successfully.")
      setIsLoading(false)
    } catch (error) {
      toast.error("Failed to delete post.")
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className={` h-fit ${pathName.includes("manage-posts") ? "block w-[100%]  sm:mt-5 md:mt-10 md:mb-24 mb-5" : "sm:block hidden md:w-[60%] w-[100%]"}`}>
        {
          pathName.includes("manage-posts") && <div
            onClick={() => {
              router.replace("/account?tab=my-profile")
            }}
            className='mb-2'><FlatIcon className="flaticon-arrow-right rotate-180 text-2xl font-bold" /></div>
        }
        <div className='flex items-center justify-between my-5'>
          <div className='text-primary font-bold sm:text-lg text-lg '><h2>My Posts</h2></div>
          <Link href={{ pathname: '/account', query: { tab: 'new-post' } }} className={`${pathName.includes("manage-posts") ? "hidden" : "block"}`}>
            <div
              className='bg-primary font-medium  md:text-base sm:text-base text-sm text-white cursor-pointer sm:px-10 px-5 sm:py-3.5 py-2 rounded-md'>
              <button>+ New Post</button></div>
          </Link>
          <Link href={"/new-post"} className={`${pathName.includes("manage-posts") ? "block" : "hidden"}`}>
            <div
              className='bg-primary font-medium  md:text-base sm:text-base text-sm text-white cursor-pointer sm:px-10 px-5 sm:py-3.5 py-2 rounded-md'>
              <button>+ New Post</button></div>
          </Link>
        </div>
        {/* new start  */}
        {/* {postsData && postsData.length > 0? */}
        <div className="  w-full   h-fit">
          <div className="flex flex-col gap-8 ">
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
                          <div className="text-primary font-semibold lg:text-lg sm:text-sm text-xs">
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
                                      setDocId(post.id)
                                      setIsDeleted(true)
                                      // console.log(post.id);

                                    }}
                                    className={`${active ? "bg-primary text-white" : "text-gray-900"
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
                        <h2 className="xl:text-lg lg:text-base text-sm font-semibold ">
                          {/* Deliver Conference */}
                          {post.title}
                        </h2>
                        <p className="text-xs text-[#9fa0a2]  font-medium">

                          {post.description}
                        </p>
                      </div>
                      <div className="w-full bg-white border border-gray-500 rounded-full flex items-center md:gap-5  pr-1 comment-placeholder">
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
                                return <div key={idx} className="mt-4 ">
                                  <div className="flex  items-start gap-2 ">
                                    <div className="flex items-start gap-4 ">
                                      <div className="h-10 w-10 rounded-full"><Image src={msg.createdBy?.image?.url} alt="" height={1000} width={1000} className="h-[100%] w-[100%] rounded-full" /></div>
                                      <div className=" flex flex-col gap-1 ">
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
                                    </div>
                                    {/* <div className="">
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
                {isDeleted &&
                  <div className="h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.3)] fixed top-0 left-0  flex justify-center items-center z-30">
                    <div className="sm:w-fit w-[90%]  bg-[white] rounded-md md:px-5 px-5 md:py-5 py-5">
                      <div className='flex flex-col md:gap-7 gap-5'>
                        <div className='text-gray-600 sm:text-base text-sm'><h2>Are you sure you want to delete this post ?</h2></div>
                        <div className='flex w-full gap-5 sm:text-sm text-xs'>
                          <div
                            onClick={async () => {
                              setIsDeleted(false)
                              await postDeleteHandler()
                            }}
                            className="w-[50%] bg-primary text-white py-2.5 rounded-md cursor-pointer flex items-center justify-center "
                          >
                            <button style={{ height: "100%", position: "relative", }}>
                              {isLoading && (
                                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", }}>
                                  <Loader />
                                </div>
                              )}
                              {!isLoading && "Yes"}
                            </button>
                          </div>
                          <div onClick={() => setIsDeleted(false)} className='w-[50%] bg-black text-white rounded-md flex items-center py-2.5 justify-center cursor-pointer'>
                            <button >No</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
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
        {/* :
        <div className='w-full h-[100%] border border-[red] flex justify-center items-center'><h1>No posts yet</h1></div>
        } */}
        {/* new end  */}
      </div>
    </>
  )
}

export default ManagePost