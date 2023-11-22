"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
// import profileImg from "../../../images/Ellipse 31.svg";
import Image from "next/image";
import FlatIcon from "@/components/flatIcon/flatIcon";
// import img2 from "../../../images/Ellipse 32.svg";
// import img3 from "../../../images/Ellipse 77.svg";
// import img4 from "../../../images/Ellipse 34.svg";
// import img5 from "../../../images/Ellipse 35.svg";
// import img6 from "../../../images/Ellipse 36.svg";
import avatarimg from "../../../images/avatar.png";
// import Link from 'antd/es/typography/Link'
import Link from "next/link";
// import SingleChat from "@/components/singleChat/SingleChat";
import ChatMobile from "@/components/chatMobile/ChatMobile";
import { auth, db } from "@/config/firebase-config";
import { ChatContext } from "../../../utils/ChatContext";
import { getStartUpData } from "@/services/startupService";
import { useQuery } from "@tanstack/react-query";
import {
  NewCreation,
  getDataofstartup,
  handleSearch,
  handleSelect,
} from "@/services/chatService";
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

const ChatsPage = () => {
  const [username, setUsername] = useState("");
  // const [user, setUser] = useState([]:any);
  const [searchlist, setsearchlist] = useState([]);
  const [err, setErr] = useState(false);

  const [chats, setChats] = useState([]);
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

  const handleKey = async (e: any) => {
    if (e.code === "Enter") {
      const searchResult: any = await handleSearch(username);
      setsearchlist(searchResult.arr || []);
    }
  };

  const handleChange = (u: any) => {
    // console.log(u,"gggg")
    dispatch({ type: "CHANGE_USER", payload: u });
  };

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
    const getChats = () => {
      if (currUser?.uid) {
        const q = query(
          collection(db, "chat", currUser?.uid, "startups")
          // orderBy("lastMsgAt", "desc")
        );
        // console.log("Current" ,"kkkk");
        const chatsarr = onSnapshot(q, (querySnapshot) => {
          const chatscol: any = [];
          querySnapshot.forEach((doc) => {
            let obj = { ...doc.data(), id: doc.id };
            chatscol.push(obj);
          });
          // console.log("Current", chatscol, "kkkk");
          chatscol.sort((a: any, b: any) => {
            const dateA: any = new Date(a.lastMsgAt);
            const dateB: any = new Date(b.lastMsgAt);
            return dateB - dateA;
          });

          setChats(chatscol);
        });
      }
      console.log("This is called");
    };
    currUser?.uid && getChats();
  }, [currUser?.uid]);

  // console.log(chats);

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

        //   Timestamp.fromDate(new Date((messages as any)[0]?.createdAt)),
        //   'asc'
        // )
      );
      // console.log("Current" ,"kkkk");
      const chatsarr = onSnapshot(q, (querySnapshot) => {
        const messagescol: any = [];
        querySnapshot.forEach((doc) => {
          let obj = { ...doc.data(), id: doc.id };
          messagescol.push(obj);
        });
        // console.log("Current", messagescol, "kkkk");

        messagescol.sort((a: any, b: any) => {
          const dateA: any = new Date(a.createdAt);
          const dateB: any = new Date(b.createdAt);
          return dateA - dateB;
        });

        setMessages(messagescol);
      });
    }
  }, [data.chatId]);

  // console.log(data.chatId, "jzzzzzz");
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
    console.log("This is called2");
  }, [messages]);

  return (
    <div className="md:w-[70%] w-[100%] h-[90vh] lg:h-full md:mb-18 sm:block hidden ">
      <ChatMobile />

      <div className="md:block hidden">
        <div className=" w-[100%] flex justify-between items-center sm:gap-5 bg-white  px-4 py-3 chat-container  rounded-md ">
          <div className="md:text-xl text-base font-bold px-2 ">Chats</div>
          <div className="flex items-center justify-end lg:gap-x-10 gap-4 sm:w-full w-[50%] ">
            <div className="  hidden bg-[#e5eaf1]  sm:flex items-center gap-x-2 h-fit rounded-full px-5 border md:w-[32%] w-[50%] search-container">
              <div>
                {" "}
                <FlatIcon className="flaticon-search md:text-xl text-[#5c636a] font-bold" />
              </div>
              <input
                type="text"
                className="bg-transparent py-1.5 outline-0"
                placeholder="Search"
                onKeyDown={handleKey}
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div className="bg-primary md:text-base sm:text-sm text-xs text-white cursor-pointer lg:px-10 md:px-6  px-3 md:py-3 py-2 rounded-md">
              + New Chat
            </div>
          </div>
        </div>
      </div>

      <div className="flex sm:flex-row flex-col w-full h-[80vh]  sm:mt-6 mt-3 gap-1 ">
        {/* left section start  */}
        <div className="md:block hidden  sm:h-full h-auto border-2 border-black rounded-xl md:w-[40%] w-[100%] sm:pt-6 pt-4 pb-2">
          
      
          {/* <Link href={"/chat-page"}> */}
          <div className=" h-full w-full overflow-y-scroll  relative ">
          {searchlist.length !== 0 ? (
            <>
              <div className="font-bold sm:text-lg text-base sm:mb-4 mb-3 px-5 ">
                Search Result
              </div>
              <div className="mb-4 sm:mb-6 md:mb-8">
                <div className=" hover:bg-[#F3F7FA] px-5">
                  {searchlist.map((item, index) => (
                    <div
                      className="flex gap-4 items-center border-b-2 border-b-[#c6c8c9]  py-4 "
                      key={index}
                      onClick={() => {
                        handleSelect((item as any)?.id);
                        // console.log((item as any)?.id, "kkkgkk");
                        () => handleChange(item);
                        setUsername("");
                        setsearchlist([]);
                      }}
                    >
                      <div className="w-[20%] aspect-square rounded-full ">
                        <Image
                          src={(item as any)?.basic?.coverPic?.url || avatarimg}
                          alt=""
                          height={1000}
                          width={1000}
                          className="h-[100%] w-[100%] rounded-full object-fill"
                        />
                      </div>
                      <div className="  w-full flex flex-col sm:gap-1">
                        <div className="flex justify-between">
                          <h2 className="sm:text-base text-sm font-bold ">
                            {" "}
                            {(item as any)?.name || ""}
                          </h2>
                          {/* <div className="flex items-center  text-2xl ">
                          <FlatIcon className="flaticon-readed text-primary" />
                          <p className="text-xs text-primary font-bold">
                          {new Date((item as any)?.lastMsgAt).getHours()}:
                          {new Date(
                            (item as any)?.lastMsgAt
                          ).getMinutes()}
                          </p>
                        </div> */}
                        </div>

                        {/* <p className="text-[#999999] sm:text-sm text-xs font-medium  line-clamp-1">
                         {(item as any)?.lastMsg || ""}
                      </p> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : // <div className="h-full w-full flex justify-center items-center">
          //   <h1>No Startup Found With This Name</h1>{" "}
          // </div>
          null}

          <div className="font-bold sm:text-lg text-base sm:mb-5 mb-4 px-5   ">
            My Chats
          </div>
          <div className=" ">
            {chats?.map((singlechat) => (
              <div
                className=" hover:bg-[#F3F7FA] px-5 "
                key={(singlechat as any)?.id}
                onClick={() => handleChange(singlechat)}
              >
                <div className="flex gap-4 items-center border-b-2 border-b-[#c6c8c9]  py-4 ">
                  <div className="w-[20%] aspect-square rounded-full ">
                    <Image
                      src={(singlechat as any)?.coverPic || avatarimg}
                      alt=""
                      height={1000}
                      width={1000}
                      className="h-[100%] w-[100%] rounded-full object-fill"
                    />
                  </div>
                  <div className="  w-full flex flex-col sm:gap-1">
                    <div className="flex justify-between">
                      <h2 className="sm:text-base text-sm font-bold ">
                        {" "}
                        {(singlechat as any)?.name || ""}
                      </h2>
                      <div className="flex items-center  text-2xl ">
                        <FlatIcon className="flaticon-readed text-primary" />
                        <p className="text-xs text-primary font-bold">
                          {" "}
                          {new Date((singlechat as any)?.lastMsgAt).getHours() >
                          9
                            ? new Date(
                                (singlechat as any)?.lastMsgAt
                              ).getHours()
                            : "0" +
                              new Date(
                                (singlechat as any)?.lastMsgAt
                              ).getHours()}
                          :
                          {new Date(
                            (singlechat as any)?.lastMsgAt
                          ).getMinutes() > 9
                            ? new Date(
                                (singlechat as any)?.lastMsgAt
                              ).getMinutes()
                            : "0" +
                              new Date(
                                (singlechat as any)?.lastMsgAt
                              ).getMinutes()}
                        </p>
                      </div>
                    </div>

                    <p className="text-[#999999] sm:text-sm text-xs font-medium  line-clamp-1">
                      {(singlechat as any)?.lastMsg}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
        <div className="md:block hidden border-t-2 border-t-black border-b-2 border-b-black border-r-2 border-r-black sm:w-[60%] w-[100%] relative flex-1 min-h-[100%]  rounded-xl px-5 py-5 ">
          {data.chatId !== "null" ? (
            <div className=" h-full w-full relative ">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-[55px] h-[55px] rounded-full  ">
                    <Image
                      src={data.user?.coverPic}
                      alt=""
                      height={1000}
                      width={1000}
                      className="h-[100%] w-[100%] rounded-full object-fill"
                    />
                  </div>

                  <div className="text-base font-semibold ">
                    <h2>{data.user?.name}</h2>
                  </div>
                </div>
                <div className="flex flex-col gap-1  w-[53px] h-[53px] bg-[#F3F7FA] rounded-full items-center justify-center">
                  <FlatIcon className="flaticon-options rotate-90 text-black text-3xl" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-[65vh] ">
                <div
                  className="flex flex-col gap-4   overflow-y-scroll  h-[55vh] w-[35vw]"
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
                </div>

                <div className="flex items-center w-full gap-3 mt-4 ">
                  <div className="bg-[#4d4d4d] flex items-center gap-2 w-[88%] px-5 rounded-full py-3 msg-container ">
                    <input
                      type="text"
                      className="bg-transparent w-[100%] outline-0 text-white "
                      placeholder="Type something..."
                      onChange={(e) => setText(e.target.value)}
                      value={text}
                    />
                    <div onClick={async () => await handleSend()}>
                      <FlatIcon className="flaticon-send text-white text-xl" />
                    </div>
                  </div>
                  <div className="bg-[#4d4d4d] w-[54px] h-[54px] flex items-center  justify-center text-white   rounded-full">
                    <button>
                      <FlatIcon className="flaticon-plus text-white text-2xl font-medium" />
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

        {/* right section end  */}
      </div>
    </div>
  );
};

export default ChatsPage;
