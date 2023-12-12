"use client";

import profileImg from "../../images/Ellipse 31.svg";
import Image from "next/image";
import FlatIcon from "../flatIcon/flatIcon";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useContext, useRef, Fragment, } from "react";
// import profileImg from "../../images/Ellipse 31.svg";
import avatarimg from "../../images/avatar.png";
import { auth, db } from "@/config/firebase-config";
import { ChatContext } from "../../utils/ChatContext";
import { getStartUpData } from "../../services/startupService";
import { useQuery } from "@tanstack/react-query";
import {
  NewCreation,
  getDataofstartup,
  handleSearch,
  getDisplayDate,
} from "../../services/chatService";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { Menu } from "@headlessui/react";
import { Transition } from "@headlessui/react";
import Loader from "@/components/loader/Loader";
import { getCookie } from "cookies-next";

const SingleChat = () => {
  const pathName = usePathname();
  const router = useRouter();

  const params = useSearchParams();
  const currTab = params.get("tab");
  const [err, setErr] = useState(false);
  const { dispatch } = useContext(ChatContext);
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const [userId, setuserId] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [isClear, setIsClear] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const cookies = { value: getCookie("uid") };
  const currUser = cookies?.value;
  const { data: startUpData } = useQuery({
    queryKey: ["startUpData"],
    queryFn: () => getStartUpData(null),
  });

  const handleKey2 = async (e: any) => {
    if (e.code === "Enter") {
      await handleSend();
    }
  };

  


  const handleSend = async () => {
    setText("");

    let messagedoc = {
      createdAt: Date(),
      type: "text",
      msg: text,
      by: currUser,
    };

    await addDoc(
      collection(db, `chat/${currUser}/startups/${data.chatId}/messages`),
      messagedoc
    );

    if (currUser) {
      await NewCreation(data.chatId, currUser);

      const docRef = doc(db, "chat", currUser, "startups", data.chatId);
      try {
        await updateDoc(docRef, {
          lastMsg: text,
          lastMsgAt: messagedoc.createdAt,
        });
        console.log("Document successfully updated!");

        const docRef2 = doc(db, "chat", data.chatId, "startups", currUser);

        await addDoc(
          collection(
            db,
            `chat/${data.chatId}/startups/${currUser}/messages`
          ),
          messagedoc
        );

        try {
          const docRefSnapshot = await getDoc(docRef);

          const updatedLastMsg = docRefSnapshot.exists()
            ? docRefSnapshot.data().lastMsg
            : null;
          console.log(updatedLastMsg, "rrrrrr");

          await updateDoc(docRef2, {
            lastMsg: updatedLastMsg,
            lastMsgAt: messagedoc.createdAt,
          });

          console.log(updatedLastMsg, "aaaa");
          console.log("Document successfully updated! 2");
        } catch (e) {
          console.error("Error updating document: ", e);
        }
      } catch (e) {
        console.error("Error updating document: ", e);
      }
    } else {
      console.error("User ID is undefined. Unable to update document.");
    }

    
  };


  const handleClearChat = async () => {
    try {
      const currentUser = cookies?.value;
      const selectedUser = data.user?.id;

      const messagesRef = collection(
        db,
        `chat/${currentUser}/startups/${selectedUser}/messages`
      );
      const messagesQuery = query(messagesRef);
      const messagesSnapshot = await getDocs(messagesQuery);

      const deleteMessagesPromises = messagesSnapshot.docs.map(async (doc) => {
        await deleteDoc(doc.ref);
      });

      await Promise.all(deleteMessagesPromises);

      const chatDocRef = doc(
        db,
        `chat/${currentUser}/startups/${selectedUser}`
      );
      await updateDoc(chatDocRef, {
        lastMsg: null,
        lastMsgAt: null,
        totalUnReads: 0,
      });

      // const updatedChatDocSnapshot = await getDoc(chatDocRef);
      // console.log("Updated Chat Document:", updatedChatDocSnapshot.data());

      console.log("Chat cleared successfully!");
    } catch (error) {
      console.error("Error clearing chat:", error);
    }
  };

  const handleDeleteChat = async () => {
    try {
      const currentUser = cookies?.value;
      const selectedUser = data.user?.id;
  
      // Delete all messages in the chat
      const messagesRef = collection(
        db,
        `chat/${currentUser}/startups/${selectedUser}/messages`
      );
      const messagesQuery = query(messagesRef);
      const messagesSnapshot = await getDocs(messagesQuery);
  
      const deleteMessagesPromises = messagesSnapshot.docs.map(async (doc) => {
        await deleteDoc(doc.ref);
      });
  
      await Promise.all(deleteMessagesPromises);
  
      // Delete the chat document
      const chatDocRef = doc(
        db,
        `chat/${currentUser}/startups/${selectedUser}`
      );
      await deleteDoc(chatDocRef);

      dispatch({ type: "RESET_STATE" });
  
      console.log("Chat deleted successfully!");
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  useEffect(() => {
    if (currUser) {
      const q = query(
        collection(
          db,
          "chat",
          currUser,
          "startups",
          data.chatId,
          "messages"
        )
        // orderBy("createdAt", "asc")
        // orderBy(
      );
      console.log("Current", "kkkk");
      const chatsarr = onSnapshot(q, (querySnapshot) => {
        const messagescol: any = [];
        querySnapshot.forEach((doc) => {
          let obj = { ...doc.data(), id: doc.id };
          messagescol.push(obj);
        });
        console.log("Current", messagescol, "kkkk");

        messagescol.sort((a: any, b: any) => {
          const dateA: any = new Date(a.createdAt);
          const dateB: any = new Date(b.createdAt);
          return dateA - dateB;
        });

        setMessages(messagescol);
      });
    }
  }, [data.chatId]);

  console.log(data.chatId, "jzzzzzz");
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
    // console.log("This is called2");
  }, [messages]);

  return (
    <div className="">
      <div className="flex items-center gap-2 sm:mt-5 sm:mb-5 mb-3 mt-3">
        {pathName.includes("chat-page") && (
          <div
            onClick={() => {
              router.replace("/all-chats");
            }}
            className=""
          >
            <FlatIcon className="flaticon-arrow-right   rotate-180 text-2xl font-bold" />
          </div>
        )}
        <div>
          <h2 className="sm:text-xl text-lg font-bold text-primary ">
            Chat Here{" "}
          </h2>
        </div>
      </div>
      <div
        className={` border-t-2  border-t-black border-b-2 border-b-black border-r-2 border-r-black w-[100%] relative  min-h-[100%]  rounded-xl sm:px-5 px-3 sm:py-5 py-3 ${
          pathName.includes("chat-page")
            ? "block  w-[100%]  border-2 border-black"
            : "sm:block hidden  w-[100%]"
        }`}
      >
        {data.chatId !== "null" ? (
          <div className=" min-h-[80vh] w-full relative ">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-[55px] h-[55px] rounded-full ">
                  <Image
                    src={data.user?.coverPic}
                    alt=""
                    height={1000}
                    width={1000}
                    className="h-[100%] w-[100%] rounded-full object-fill"
                  />
                </div>

                <div className="sm:text-lg text-base font-semibold ">
                  <h2>{data.user?.name}</h2>
                </div>
              </div>
              
              <Menu
                  as="div"
                  className="relative   flex flex-col gap-1  w-[53px] h-[53px] bg-[#F3F7FA] rounded-full items-center justify-center cursor-pointer"
                >
                  <div className="flex justify-center items-center w-full h-full rounded-full">
                    <Menu.Button className="w-full h-full rounded-full">
                      <div className="flex justify-center items-center ">
                        <FlatIcon className="flaticon-options rotate-90 text-black text-3xl" />
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
                    <Menu.Items className="z-50 absolute right-0 mt-2 top-full w-28 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href={`/startup/${data.user?.name
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                            >
                              <button
                                // onClick={() => {
                                //   setDocId({data.user?.id});
                                //   setIsDeleted(true);
                                //   console.log(post.id);
                                // }}
                                className={`${
                                  active
                                    ? "bg-primary text-white"
                                    : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                {/* {active ? "active" : "notActive"} */}
                                View Profile
                              </button>
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => {
                                // setuserId(data.user?.id);
                                setIsClear(true);
                                // console.log(data.user?.id, "uuu");
                              }}
                              className={`${
                                active
                                  ? "bg-primary text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {/* {active ? "active" : "notActive"} */}
                              Clear Chat
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => {
                                // setuserId(data.user?.id);
                                setIsDeleted(true);
                                // console.log(data.user?.id, "fff");
                              }}
                              className={`${
                                active
                                  ? "bg-primary text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {/* {active ? "active" : "notActive"} */}
                              Delete Chat
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                {isClear && (
                  <div className="h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.3)] fixed top-0 left-0  flex justify-center items-center z-30">
                    <div className="sm:w-fit w-[90%]  bg-[white] rounded-md md:px-5 px-5 md:py-5 py-5">
                      <div className="flex flex-col md:gap-7 gap-5">
                        <div className="text-gray-600 sm:text-base text-sm">
                          <h2>Are you sure you want to clear this chat ?</h2>
                        </div>
                        <div className="flex w-full gap-5 sm:text-sm text-xs">
                          <div
                            onClick={async () => {
                              setIsClear(false);
                              await handleClearChat();
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
                            onClick={() => setIsClear(false)}
                            className="w-[50%] bg-black text-white rounded-md flex items-center py-2.5 justify-center cursor-pointer"
                          >
                            <button>No</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

{isDeleted && (
                  <div className="h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.3)] fixed top-0 left-0  flex justify-center items-center z-30">
                    <div className="sm:w-fit w-[90%]  bg-[white] rounded-md md:px-5 px-5 md:py-5 py-5">
                      <div className="flex flex-col md:gap-7 gap-5">
                        <div className="text-gray-600 sm:text-base text-sm">
                          <h2>Are you sure you want to Delete this chat ?</h2>
                        </div>
                        <div className="flex w-full gap-5 sm:text-sm text-xs">
                          <div
                            onClick={async () => {
                              setIsDeleted(false);
                              await handleDeleteChat();
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
            <div className="absolute bottom-0 left-0 w-full">
              <div
                className="flex flex-col gap-4  max-h-[60vh]  overflow-y-scroll "
                ref={messagesContainerRef}
              >
                {messages.map((mg: any, index: number) => (
                  <div key={mg?.id}>
                    {/* Display date block if date has changed */}
                    {index === 0 ||
                    getDisplayDate(mg?.createdAt) !==
                      getDisplayDate(messages[index - 1]?.createdAt) ? (
                      <div className="flex items-center justify-center my-6">
                        <div
                          className="text-center text-xs sm:text-sm md:text-base lg:text-lg text-gray-500 
                      px-4 py-1 sm:px-5 sm:py-1.5 md:px-6 md:py-2 md:p-2 border-2 border-text-gray-500  w-fit rounded-full"
                        >
                          {getDisplayDate(mg?.createdAt)}
                        </div>
                      </div>
                    ) : null}

                    {/* Render message */}
                    <div
                      className={`flex w-[97%]  ${
                        mg?.by === data.chatId ? "" : "justify-end"
                      }`}
                    >
                      {/* Differentiate messages based on sender */}
                      {mg?.by === data.chatId && (
                        <div className="w-[60%] flex  gap-2">
                          <div className="w-[40px] h-[40px] rounded-full aspect-square ">
                            <Image
                              src={data.user?.coverPic}
                              alt=""
                              height={1000}
                              width={1000}
                              className="h-[100%] w-[100%] rounded-full object-fill"
                            />
                          </div>
                          <div className={`relative bg-[#F3F7FA]  w-fit pr-12 text-ellipsis overflow-hidden ...`}>
                            <div className="text-sm font-medium p-3 rounded-md w-full ">
                            <p className="w-full text-ellipsis break-words ...">
                                  {mg?.msg}
                                </p>
                            </div>
                            <div className="flex text-xs items-center absolute bottom-[3px] right-[5px]">
                              <div>
                                <FlatIcon className="flaticon-readed text-primary text-2xl" />
                              </div>
                              <p className="text-xs font-semibold text-primary">
                                {new Date(mg?.createdAt).getHours() > 9
                                  ? new Date(mg?.createdAt).getHours()
                                  : "0" + new Date(mg?.createdAt).getHours()}
                                :
                                {new Date(mg?.createdAt).getMinutes() > 9
                                  ? new Date(mg?.createdAt).getMinutes()
                                  : "0" + new Date(mg?.createdAt).getMinutes()}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Differentiate messages based on receiver */}
                      {mg?.by !== data.chatId && (
                        <div className="w-[60%] flex gap-2 justify-end text-ellipsis overflow-hidden ...">
                          <div className={`relative bg-[#F3F7FA]  w-fit pr-12 text-ellipsis overflow-hidden ...`}>
                            <div className="text-sm font-medium p-3 rounded-md w-full ">
                            <p className="w-full text-ellipsis break-all ...">
                                  {mg?.msg}
                                </p>
                            </div>
                            <div className="flex text-xs items-center absolute bottom-[3px] right-[5px]">
                              <div>
                                <FlatIcon className="flaticon-readed text-primary text-2xl" />
                              </div>
                              <p className="text-xs font-semibold text-primary">
                                {new Date(mg?.createdAt).getHours() > 9
                                  ? new Date(mg?.createdAt).getHours()
                                  : "0" + new Date(mg?.createdAt).getHours()}
                                :
                                {new Date(mg?.createdAt).getMinutes() > 9
                                  ? new Date(mg?.createdAt).getMinutes()
                                  : "0" + new Date(mg?.createdAt).getMinutes()}
                              </p>
                            </div>
                          </div>
                          <div className="w-[40px] h-[40px] rounded-full aspect-square ">
                            <Image
                              src={startUpData?.basic?.coverPic?.url}
                              alt=""
                              height={1000}
                              width={1000}
                              className="h-[100%] w-[100%] rounded-full object-fill"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* {messages.map((mg: any) => (
                  <div
                    className={`flex w-[97%]  ${
                      mg?.by === data.chatId ? "" : "justify-end"
                    }`}
                    key={mg?.id}
                  >
                    {mg?.by === data.chatId && (
                      <div className="w-[50%] flex  gap-2">
                        <div className="w-[40px] h-[40px] rounded-full aspect-square ">
                          <Image
                            src={data.user?.coverPic}
                            alt=""
                            height={1000}
                            width={1000}
                            className="h-[100%] w-[100%] rounded-full object-fill"
                          />
                        </div>
                        <div className={`relative bg-[#F3F7FA]  w-fit pr-12`}>
                          <div className="text-sm font-medium p-3 rounded-md w-full ">
                            <p className="w-full">{mg?.msg}</p>
                          </div>
                          <div className="flex text-xs items-center absolute bottom-[3px] right-[5px]">
                            <div>
                              <FlatIcon className="flaticon-readed text-primary text-2xl" />
                            </div>
                            <p className="text-xs font-semibold text-primary">
                              {new Date(mg?.createdAt).getHours() > 9
                                ? new Date(mg?.createdAt).getHours()
                                : "0" + new Date(mg?.createdAt).getHours()}
                              :
                              {new Date(mg?.createdAt).getMinutes() > 9
                                ? new Date(mg?.createdAt).getMinutes()
                                : "0" + new Date(mg?.createdAt).getMinutes()}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {mg?.by !== data.chatId && (
                      <div className="w-[50%] flex gap-2 justify-end">
                        <div className={`relative bg-[#F3F7FA]  w-fit pr-12`}>
                          <div className="text-sm font-medium p-3 rounded-md w-full ">
                            <p className="w-full">{mg?.msg}</p>
                          </div>
                          <div className="flex text-xs items-center absolute bottom-[3px] right-[5px]">
                            <div>
                              <FlatIcon className="flaticon-readed text-primary text-2xl" />
                            </div>
                            <p className="text-xs font-semibold text-primary">
                              {new Date(mg?.createdAt).getHours() > 9
                                ? new Date(mg?.createdAt).getHours()
                                : "0" + new Date(mg?.createdAt).getHours()}
                              :
                              {new Date(mg?.createdAt).getMinutes() > 9
                                ? new Date(mg?.createdAt).getMinutes()
                                : "0" + new Date(mg?.createdAt).getMinutes()}
                            </p>
                          </div>
                        </div>
                        <div className="w-[40px] h-[40px] rounded-full aspect-square ">
                          <Image
                            src={startUpData?.basic?.coverPic?.url}
                            alt=""
                            height={1000}
                            width={1000}
                            className="h-[100%] w-[100%] rounded-full object-fill"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))} */}

                {/* <div className="flex items-end gap-4">
                <div className="w-[40px] h-[40px] rounded-full ">
                  <Image
                    src={profileImg}
                    alt=""
                    height={1000}
                    width={1000}
                    className="h-[100%] w-[100%] rounded-full object-fill"
                  />
                </div>
                <div className="relative">
                  <div className="bg-[#F3F7FA] sm:text-sm text-xs font-medium  p-3 rounded-md">
                    <p>
                      Donec sed erat ut magna <br /> suscipit mattis. Aliquam
                      erat <br /> volutpat.
                    </p>{" "}
                  </div>
                  <div className="flex text-xs items-center  absolute bottom-[5px] right-[10px]">
                    <div>
                      <FlatIcon className="flaticon-readed text-primary text-2xl" />
                    </div>
                    <p className="text-xs font-semibold text-primary">2:38</p>
                  </div>
                </div>
              </div>



              <div className="flex items-end gap-4">
                <div className="w-[40px] h-[40px] rounded-full ">
                  <Image
                    src={profileImg}
                    alt=""
                    height={1000}
                    width={1000}
                    className="h-[100%] w-[100%] rounded-full object-fill"
                  />
                </div>
                <div className="relative">
                  <div className="bg-[#F3F7FA] sm:text-sm text-xs font-medium  p-3 rounded-md">
                    <p>
                      <span className="font-semibold">Formonix</span> is
                      typing....
                    </p>{" "}
                  </div>
                </div>
              </div> */}
              </div>
              <div className="flex items-center w-full gap-3 mt-4  ">
                <div className="bg-[#4d4d4d] flex  items-center sm:w-[95%] w-[80%] px-5 rounded-full py-3 msg-container">
                  <input
                    type="text"
                    className="bg-transparent w-[100%] outline-0 text-white"
                    placeholder="Type something..."
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    onKeyDown={handleKey2}
                  />
                  </div>
                  {text.trim() ? (
                    <div
                      onClick={async () => await handleSend()}
                      className="bg-[#4d4d4d] w-[54px] h-[54px] flex items-center  justify-center text-white   rounded-full cursor-pointer"
                    >
                      <FlatIcon className="flaticon-send text-white text-2xl font-medium" />
                    </div>
                  ) : (
                    <div className="bg-[#4d4d4d] w-[54px] h-[54px] flex items-center  justify-center text-white   rounded-full cursor-pointer">
                      <FlatIcon className="flaticon-plus text-white text-2xl font-medium" />
                    </div>
                  )}
                
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full w-full flex justify-center items-center">
            <h1>Please Select Startup to Chat With</h1>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleChat;
