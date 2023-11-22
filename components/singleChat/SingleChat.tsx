"use client";

import profileImg from "../../images/Ellipse 31.svg";
import Image from "next/image";
import FlatIcon from "../flatIcon/flatIcon";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useContext, useRef } from "react";
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
  handleSelect,
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
} from "firebase/firestore";

const SingleChat = () => {
  const pathName = usePathname();
  const router = useRouter();

  const params = useSearchParams();
  const currTab = params.get("tab");
  const [err, setErr] = useState(false);
  const { dispatch } = useContext(ChatContext);
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const currUser = auth.currentUser;
  const { data: startUpData } = useQuery({
    queryKey: ["startUpData"],
    queryFn: () => getStartUpData(null),
  });

  const handleSend = async () => {
    let messagedoc = {
      createdAt: Date(),
      type: "text",
      msg: text,
      by: currUser?.uid,
    };

    await addDoc(
      collection(db, `chat/${currUser?.uid}/startups/${data.chatId}/messages`),
      messagedoc
    );

    if (currUser?.uid) {
      await NewCreation(data.chatId, currUser?.uid);

      const docRef = doc(db, "chat", currUser?.uid, "startups", data.chatId);
      try {
        await updateDoc(docRef, {
          lastMsg: text,
          lastMsgAt: messagedoc.createdAt,
        });
        console.log("Document successfully updated!");

        const docRef2 = doc(db, "chat", data.chatId, "startups", currUser?.uid);

        await addDoc(
          collection(
            db,
            `chat/${data.chatId}/startups/${currUser?.uid}/messages`
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

    setText("");
  };

  useEffect(() => {
    if (currUser?.uid) {
      const q = query(
        collection(
          db,
          "chat",
          currUser?.uid,
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
              <div className="flex flex-col gap-1  sm:w-[53px] sm:h-[53px] h-[35px] w-[35px] bg-[#F3F7FA] rounded-full items-center justify-center">
                <FlatIcon className="flaticon-options rotate-90 text-black sm:text-3xl text-xl" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full">
              <div
                className="flex flex-col gap-4  max-h-[60vh]  overflow-y-scroll "
                ref={messagesContainerRef}
              >
                {messages.map((mg: any) => (
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
                ))}

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
                  />
                  <div className="" onClick={async () => await handleSend()}>
                    <FlatIcon className="flaticon-send text-white sm:text-xl text-base" />
                  </div>
                </div>
                <div className="bg-[#4d4d4d] sm:w-[54px] sm:h-[54px] w-[45px] h-[45px] flex items-center  justify-center text-white   rounded-full">
                  <button>
                    <FlatIcon className="flaticon-plus text-white md:text-2xl text-sm font-medium" />
                  </button>
                </div>
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
