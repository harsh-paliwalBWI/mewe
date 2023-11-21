"use client";

// import img2 from "../../images/Ellipse 32.svg";
// import img3 from "../../images/Ellipse 77.svg";
// import img4 from "../../images/Ellipse 34.svg";
// import img5 from "../../images/Ellipse 35.svg";
// import img6 from "../../images/Ellipse 36.svg";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useContext, useRef } from "react";
// import profileImg from "../../images/Ellipse 31.svg";
import Image from "next/image";
import FlatIcon from "@/components/flatIcon/flatIcon";
import avatarimg from "../../images/avatar.png";
import SingleChat from "@/components/singleChat/SingleChat";
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

const ChatMobile = () => {
  const pathName = usePathname();
  const router = useRouter();
  const params = useSearchParams();
  const currTab = params.get("tab");

  const [username, setUsername] = useState("");
  const [searchlist, setsearchlist] = useState([]);

  const [chats, setChats] = useState([]);
  const { dispatch } = useContext(ChatContext);
  const { data } = useContext(ChatContext);

  const currUser = auth.currentUser;

  const handleKey = async (e: any) => {
    if (e.code === "Enter") {
      const searchResult: any = await handleSearch(username);
      setsearchlist(searchResult.arr || []);
    }
  };

  const handleChange = (u: any) => {
    console.log(u, "gggg");
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  useEffect(() => {
    const getChats = () => {
      if (currUser?.uid) {
        const q = query(
          collection(db, "chat", currUser?.uid, "startups")
          // orderBy("lastMsgAt", "desc")
        );
        console.log("Current", "kkkk");
        const chatsarr = onSnapshot(q, (querySnapshot) => {
          const chatscol: any = [];
          querySnapshot.forEach((doc) => {
            let obj = { ...doc.data(), id: doc.id };
            chatscol.push(obj);
          });
          console.log("Current", chatscol, "kkkk");
          chatscol.sort((a: any, b: any) => {
            const dateA: any = new Date(a.lastMsgAt);
            const dateB: any = new Date(b.lastMsgAt);
            return dateB - dateA;
          });

          setChats(chatscol);
        });
      }
      //   console.log("This is called");
    };
    currUser?.uid && getChats();
  }, [currUser?.uid]);

  //   console.log(chats);
  //   console.log(searchlist, "jkkkk");
  //   console.log(data.chatId, "jzzzzzz");

  //   console.log(username, "mmm");

  return (
    <div
      className={`block  ${
        currTab === "chat" ? "md:hidden sm:block hidden" : "block"
      } ${pathName.includes("all-chats") && "mt-5"}`}
    >
      {pathName.includes("all-chats") && (
        <div
          onClick={() => {
            router.replace("account?tab=chat");
          }}
          className=""
        >
          <FlatIcon className="flaticon-arrow-right  sm:mt-5 sm:mb-3 mb-3 mt-3 rotate-180 text-2xl font-bold" />
        </div>
      )}

      <div className="w-[100%] flex justify-between items-center sm:gap-5 bg-white  px-4 py-3 chat-container  rounded-md ">
        <div className="md:text-xl text-base font-bold px-2 ">Chats</div>
        <div className="flex items-center justify-end lg:gap-x-10 gap-4 sm:w-full w-[50%] ">
          <div className="  hidden bg-[#e5eaf1]  sm:flex items-center gap-x-2 h-fit rounded-full px-5 border md:w-[32%] w-[50%] search-container">
            <div>
              {" "}
              <FlatIcon className="flaticon-search md:text-xl text-[#5c636a] font-bold" />
            </div>
            <input
              type="text"
              className="bg-transparent py-1.5 outline-0 "
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

      <div
        className={`sm:h-full max-h-[80vh] h-auto border border-black rounded-md w-[100%] sm:pt-6 pt-4 mt-4 overflow-y-scroll`}
      >
        <div>
          {searchlist.length !== 0 ? (
            <>
              <div className="font-bold sm:text-lg text-base md:mb-5 sm:mb-4 mb-3 px-5 ">
                Search Result
              </div>
              <div className=" mb-4 sm:mb-6 md:mb-8">
                <div className=" hover:bg-[#F3F7FA] px-5 ">
                  {searchlist.map((item, index) => (
                    <div
                      className="flex  items-center gap-4 border-b-2 border-b-[#c6c8c9]  py-4  "
                      key={index}
                      onClick={() => {
                        handleSelect((item as any)?.id);

                        // () => handleChange(item);
                        setUsername("");
                        setsearchlist([]);
                      }}
                    >
                      <div className="w-[60px] h-[60px] rounded-full aspect-square">
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

          <div className="font-bold sm:text-lg text-sm sm:mb-4 mb-3 px-5 ">
            My Chats
          </div>
          <div className=" ">
            {chats?.map((singlechat) => (
              <Link href={"/chat-page"}>
                <div
                  className=" hover:bg-[#F3F7FA] px-5 "
                  key={(singlechat as any)?.id}
                  onClick={() => handleChange(singlechat)}
                >
                  <div className="flex  items-center gap-4 border-b-2 border-b-[#c6c8c9]  py-4 ">
                    <div className="w-[60px] h-[60px] rounded-full aspect-square ">
                      <Image
                        src={(singlechat as any)?.coverPic || avatarimg}
                        alt=""
                        height={1000}
                        width={1000}
                        className="h-[100%] w-[100%] rounded-full object-fill"
                      />
                    </div>
                    <div className="w-full flex  flex-col sm:gap-1">
                      <div className="flex justify-between">
                        <h2 className="sm:text-base text-sm font-bold ">
                          {" "}
                          {(singlechat as any)?.name || ""}
                        </h2>
                        <div className="flex items-center  text-2xl ">
                          <FlatIcon className="flaticon-readed text-primary" />
                          <p className="text-xs text-primary font-bold">
                            {" "}
                            {new Date(
                              (singlechat as any)?.lastMsgAt
                            ).getHours() > 9
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
              </Link>
            ))}
          </div>

          {/* <Link href={"/chat-page"}>
            <div className=" bg-[#F3F7FA] px-5 border-2 border-green-800">
              <div className="flex  items-center gap-4 border-b-2 border-b-[#c6c8c9]  py-4 ">
                <div className="w-[60px] h-[60px] rounded-full aspect-square">
                  <Image
                    src={profileImg}
                    alt=""
                    height={1000}
                    width={1000}
                    className="h-[100%] w-[100%] rounded-full object-fill"
                  />
                </div>
                <div className="w-[80%]  w-full flex  flex-col sm:gap-1">
                  <div className="flex justify-between">
                    <h2 className="sm:text-base text-sm font-bold ">
                      {" "}
                      Formonix
                    </h2>
                    <div className="flex items-center  text-2xl ">
                      <FlatIcon className="flaticon-readed text-primary" />
                      <p className="text-xs text-primary font-bold">02:38</p>
                    </div>
                  </div>

                  <p className="text-[#999999] sm:text-sm text-xs font-medium  line-clamp-1">
                    Quis autem vel eum iure reprehenderit ...
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <Link href={"/chat-page"}>
            <div className=" px-5">
              <div className="flex gap-4 items-center border-b-2 border-b-[#c6c8c9]  py-4">
                <div className="w-[60px] h-[60px]  rounded-full ">
                  <Image
                    src={img2}
                    alt=""
                    height={1000}
                    width={1000}
                    className="h-[100%] w-[100%] rounded-full object-fill"
                  />
                </div>
                <div className="w-[80%] flex flex-col  gap-1 w-full">
                  <div className="flex justify-between">
                    <h2 className="sm:text-sm text-xs font-bold ">
                      Crowdstage
                    </h2>
                    <p className="text-xs text-primary font-bold">01:34</p>
                  </div>
                  <div className="flex justify-between items-center ">
                    <p className="text-[#999999]  w-[90%]  sm:text-sm text-xs font-medium  line-clamp-1">
                      Nemo enim ipsam voluptatem quia voluptas sit..
                    </p>
                    <div className="h-[20px] w-[20px] rounded-full flex items-center justify-center bg-primary text-white text-xs">
                      3
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link href={"/chat-page"}>
            <div className=" px-5">
              <div className="flex gap-4 items-center border-b-2 border-b-[#c6c8c9]   py-4 ">
                <div className="w-[60px] h-[60px]  rounded-full ">
                  <Image
                    src={img3}
                    alt=""
                    height={1000}
                    width={1000}
                    className="h-[100%] w-[100%] rounded-full object-fill"
                  />
                </div>
                <div className="w-[80%] flex flex-col sm:gap-1 w-full">
                  <div className="flex justify-between">
                    <h2 className="sm:text-sm text-xs font-bold ">
                      MetConnect
                    </h2>
                    <div className="flex items-center  text-2xl ">
                      <FlatIcon className="flaticon-readed text-primary" />
                      <p className="text-xs text-primary font-bold">02:38</p>
                    </div>
                  </div>
                  <p className="text-[#999999] sm:text-sm text-xs font-medium  line-clamp-1">
                    Quis autem vel eum iure reprehenderit ...
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <Link href={"/chat-page"}>
            <div className=" px-5">
              <div className="flex gap-4 items-center border-b-2 border-b-[#c6c8c9]   py-4">
                <div className="w-[60px] h-[60px]  rounded-full ">
                  <Image
                    src={img4}
                    alt=""
                    height={1000}
                    width={1000}
                    className="h-[100%] w-[100%] rounded-full object-fill"
                  />
                </div>
                <div className="w-[80%] flex flex-col gap-1 w-full">
                  <div className="flex justify-between">
                    <h2 className="sm:text-sm text-xs font-bold ">
                      Crystal Clear Solutions
                    </h2>
                    <p className="text-xs text-primary font-bold">12:56</p>
                  </div>
                  <div className="flex justify-between items-center ">
                    <p className="text-[#999999]  w-[90%]  sm:text-sm text-xs font-medium  line-clamp-1">
                      Nemo enim ipsam voluptatem quia voluptas sit..
                    </p>
                    <div className="h-[20px] w-[20px] rounded-full flex items-center justify-center bg-primary text-white text-xs">
                      2
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link href={"/chat-page"}>
            <div className=" px-5">
              <div className="flex items-center gap-4 items-center border-b-2 border-b-[#c6c8c9]   py-4 ">
                <div className="w-[60px] h-[60px]  rounded-full ">
                  <Image
                    src={img5}
                    alt=""
                    height={1000}
                    width={1000}
                    className="h-[100%] w-[100%] rounded-full object-fill"
                  />
                </div>
                <div className="w-[80%] flex flex-col sm:gap-1 w-full">
                  <div className="flex justify-between">
                    <h2 className="sm:text-sm text-xs font-bold ">
                      CodeFusion
                    </h2>
                    <div className="flex items-center  text-2xl ">
                      <FlatIcon className="flaticon-readed text-primary" />
                      <p className="text-xs text-primary font-bold">02:38</p>
                    </div>
                  </div>
                  <p className="text-[#999999] sm:text-sm text-xs font-medium  line-clamp-1">
                    Quis autem vel eum iure reprehenderit ...
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <Link href={"/chat-page"}>
            <div className=" px-5">
              <div className="flex gap-4 items-center  py-4 ">
                <div className="w-[60px] h-[60px]  rounded-full ">
                  <Image
                    src={img6}
                    alt=""
                    height={1000}
                    width={1000}
                    className="h-[100%] w-[100%] rounded-full object-fill"
                  />
                </div>
                <div className="w-[80%] flex flex-col sm:gap-1 w-full">
                  <div className="flex justify-between">
                    <h2 className="sm:text-sm text-xs font-bold ">
                      InvestSpend
                    </h2>
                    <div className="flex items-center  text-2xl ">
                      <FlatIcon className="flaticon-readed text-primary" />
                      <p className="text-xs text-primary font-bold">02:38</p>
                    </div>
                  </div>
                  <p className="text-[#999999] sm:text-sm text-xs font-medium  line-clamp-1">
                    Quis autem vel eum iure reprehenderit ...
                  </p>
                </div>
              </div>
            </div>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default ChatMobile;
