"use client";
import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  Fragment,
} from "react";
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
  getDisplayDate,
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
  deleteDoc,
} from "firebase/firestore";
import { getCookie } from "cookies-next";
import { Menu } from "@headlessui/react";
import { Transition } from "@headlessui/react";
import Loader from "@/components/loader/Loader";

const ChatsPage = () => {
  const [username, setUsername] = useState("");
  // const [user, setUser] = useState([]:any);
  const [searchlist, setsearchlist] = useState([]);
  // const [err, setErr] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const [chats, setChats] = useState([]);
  const { dispatch } = useContext(ChatContext);
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const [userId, setuserId] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [isClear, setIsClear] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currUser = auth.currentUser;
  // console.log(currUser?.uid, "auth");
  const cookies = { value: getCookie("uid") };
  // console.log(cookies?.value, "cookies");
  const { data: startUpData } = useQuery({
    queryKey: ["startUpData"],
    queryFn: () => getStartUpData(null),
  });

  const handleKey = async (e: any) => {
    if (e.code === "Enter" && username) {
      const searchResult: any = await handleSearch(username, cookies);
      // console.log(searchResult.arr, "eeeeee");
      setsearchlist(searchResult.arr);
      setSearchPerformed(true);
    }
  };

  const newsearch = async () => {
    if (username) {
      const searchResult: any = await handleSearch(username, cookies);
      // console.log(searchResult.arr, "eeeeee");
      setsearchlist(searchResult.arr);
      // console.log(searchlist, "ffffffff");
      setSearchPerformed(true);
    }
  };

  const handleKey2 = async (e: any) => {
    if (e.code === "Enter") {
      await handleSend();
    }
  };

  function formatTwoDigits(value: any) {
    return value > 9 ? value : `0${value}`;
  }

  const handleChange = (u: any) => {
    // console.log(u,"gggg")
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  const handleSend = async () => {
    let messagedoc = {
      createdAt: Date(),
      type: "text",
      msg: text,
      by: cookies?.value,
    };
    await addDoc(
      collection(db, `chat/${cookies?.value}/startups/${data.chatId}/messages`),
      messagedoc
    );

    setText("");

    if (cookies?.value) {
      await NewCreation(data.chatId, cookies?.value);

      const docRef = doc(db, "chat", cookies?.value, "startups", data.chatId);
      try {
        await updateDoc(docRef, {
          lastMsg: text,
          lastMsgAt: messagedoc.createdAt,
        });
        // console.log("Document successfully updated!");
        // console.log("Current Timestamp:", messagedoc.createdAt);

        const docRef2 = doc(
          db,
          "chat",
          data.chatId,
          "startups",
          cookies?.value
        );

        await addDoc(
          collection(
            db,
            `chat/${data.chatId}/startups/${cookies?.value}/messages`
          ),
          messagedoc
        );

        try {
          const docRefSnapshot = await getDoc(docRef);

          const updatedLastMsg = docRefSnapshot.exists()
            ? docRefSnapshot.data().lastMsg
            : null;
          // console.log(updatedLastMsg, "rrrrrr");

          await updateDoc(docRef2, {
            lastMsg: updatedLastMsg,
            lastMsgAt: messagedoc.createdAt,
          });

          // console.log(updatedLastMsg, "aaaa");
          // console.log("Document successfully updated! 2");
          // console.log("Current Timestamp:", messagedoc.createdAt);
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

  const handleSelect = async (selectedUser: any) => {
    const currentUser = cookies?.value;
    // console.log(currentUser, "currentUser");
    try {
      const q = doc(db, `chat/${currentUser}/startups/${selectedUser}`);
      const res = await getDoc(q);
      // console.log(res.data(),"res")

      if (!res.exists()) {
        const otherstartupdata = await getDataofstartup(selectedUser);
        // console.log(otherstartupdata, "hhhhhhhhh");
        let chatstartup = {
          coverPic: otherstartupdata?.basic?.coverPic?.url
            ? otherstartupdata?.basic?.coverPic?.url
            : avatarimg,
          lastMsgAt: Date(),
          name: otherstartupdata?.name,
          lastMsg: "",
          totalUnReads: 0,
        };
        let chatobj = {
          totalUnreads: 0,
        };

        const mainDoc = await getDoc(doc(db, `chat/${currentUser}`));
        if (!mainDoc.exists()) {
          await setDoc(doc(db, `chat/${currentUser}`), chatobj, {
            merge: true,
          });
        }

        await setDoc(
          doc(db, `chat/${currentUser}/startups/${selectedUser}`),
          chatstartup,
          {
            merge: true,
          }
        );
      }

      try {
        const chatDoc = await getDoc(q);
        if (chatDoc.exists()) {
          const chatData = { id: chatDoc.id, ...chatDoc.data() };
          console.log("Chat Data:", chatData);
          dispatch({ type: "CHANGE_USER", payload: chatData });
        } else {
          console.log("Chat document not found");
        }
      } catch (error) {
        console.error("Error getting chat document:", error);
      }
    } catch (err) {}
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
    const getChats = () => {
      if (cookies?.value) {
        const q = query(
          collection(db, "chat", cookies?.value, "startups")
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
      // console.log("This is called");
    };
    cookies?.value && getChats();
  }, [cookies?.value]);

  // console.log(chats);

  useEffect(() => {
    if (cookies?.value) {
      const q = query(
        collection(
          db,
          "chat",
          cookies?.value,
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
    // console.log("This is called2");
  }, [messages]);

  return (
    <div className="md:w-[70%] w-[100%] h-[90vh] lg:h-full md:mb-18 sm:block hidden ">
      <ChatMobile />

      <div className="lg:block hidden ">
        <div className=" w-[100%] flex justify-between items-center sm:gap-5 bg-white  px-4 py-3 chat-container  rounded-md ">
          <div className="md:text-xl text-base font-bold px-2 ">Chats</div>
          <div className="flex items-center justify-end lg:gap-x-10 gap-4 sm:w-full w-[50%] ">
            <div className="  hidden bg-[#e5eaf1]  sm:flex items-center gap-x-2 h-fit rounded-full px-5 border lg:w-[32%] w-[50%] search-container">
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
            <div
              className="bg-primary md:text-base sm:text-sm text-xs text-white cursor-pointer lg:px-10 md:px-6  px-3 md:py-3 py-2 rounded-md"
              onClick={async () => await newsearch()}
            >
              + New Chat
            </div>
          </div>
        </div>
      </div>

      <div className="flex sm:flex-row flex-col w-full h-[80vh]  sm:mt-6 mt-3 gap-1 ">
        {/* left section start  */}
        <div className="lg:block hidden  sm:h-full h-auto border-2 border-black rounded-xl md:w-[40%] w-[100%] sm:pt-6 pt-4 pb-2">
          {/* <Link href={"/chat-page"}> */}
          <div className=" h-full w-full overflow-y-scroll  relative ">
            {searchPerformed ? (
              searchlist.length !== 0 ? (
                <>
                  <div className="font-bold sm:text-lg text-base sm:mb-4 mb-3 px-5 ">
                    Search Result
                  </div>
                  <div className="mb-4 sm:mb-6 md:mb-8">
                    <div className="  px-5">
                      {searchlist.map((item, index) => (
                        <div
                          className="flex hover:bg-[#F3F7FA] gap-4 items-center border-b-2 border-b-[#c6c8c9]  py-4 "
                          key={index}
                          onClick={() => {
                            handleSelect((item as any)?.docId);
                            // console.log((item as any)?.docId, "kkkgkk");
                            // console.log(item as any, "cvcvcv");
                            // () => handleChange(item);
                            setUsername("");
                            setsearchlist([]);
                            setSearchPerformed(false);
                          }}
                        >
                          <div className="w-[20%] aspect-square rounded-full ">
                            <Image
                              src={(item as any).coverPic?.url || avatarimg}
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
              ) : (
                <>
                  <>
                    <div className="font-bold sm:text-lg text-base sm:mb-4 mb-3 px-5">
                      Search Result
                    </div>
                    <div className="h-12 sm:h-16 md:h-20 w-full flex justify-center items-center">
                      <h1>No Startup Found With This Name</h1>{" "}
                    </div>
                  </>
                </>
              )
            ) : null}

            <div className="font-bold sm:text-lg text-base sm:mb-5 mb-4 px-5   ">
              My Chats
            </div>
            <div className=" ">
              {chats?.map((singlechat) => (
                <div
                  className=" hover:bg-[#F3F7FA] px-5 "
                  key={(singlechat as any)?.id}
                  onClick={() => {
                    handleChange(singlechat);
                    // console.log(singlechat, "ppppp");
                  }}
                >
                  <div className="flex gap-4 items-center border-b-2 border-b-[#c6c8c9]  py-4 ">
                    <div className="w-[15%] aspect-square rounded-full ">
                      <Image
                        src={(singlechat as any)?.coverPic || avatarimg}
                        alt=""
                        height={1000}
                        width={1000}
                        className="h-[100%] w-[100%] rounded-full object-fill"
                      />
                    </div>
                    <div className="  w-[80%] flex flex-col sm:gap-1">
                      <div className="flex justify-between">
                        <h2 className="xl:text-base text-sm font-bold ">
                          {" "}
                          {(singlechat as any)?.name || ""}
                        </h2>
                        {(singlechat as any)?.lastMsgAt && (
                          <div className="flex items-center  text-2xl ">
                            <FlatIcon className="flaticon-readed text-primary" />
                            <p className="text-xs text-primary font-bold">
                              {" "}
                              <p className="text-xs text-primary font-bold">
                                {formatTwoDigits(
                                  new Date(
                                    (singlechat as any)?.lastMsgAt
                                  ).getHours()
                                )}
                                :
                                {formatTwoDigits(
                                  new Date(
                                    (singlechat as any)?.lastMsgAt
                                  ).getMinutes()
                                )}
                              </p>
                            </p>
                          </div>
                        )}
                      </div>

                      <p className="text-[#999999] sm:text-sm text-xs font-medium  line-clamp-1 text-ellipsis overflow-hidden ...">
                        {(singlechat as any)?.lastMsg}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:block hidden border-t-2 border-t-black border-b-2 border-b-black border-r-2 border-r-black sm:w-[60%] w-[100%] relative flex-1 min-h-[100%]  rounded-xl px-5 py-5 ">
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

              <div className="absolute bottom-0 left-0 w-full h-[65vh] ">
                <div
                  className="flex flex-col gap-4   overflow-y-scroll  h-[55vh] w-[35vw]"
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
                            className="text-center text-xs  md:text-sm bg-[#E8E8E8] text-gray-500 
                      px-4 py-1 md:px-5 md:py-1.5 border-2 border-text-gray-500  w-fit rounded-full"
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
                          <div className="w-[60%] flex  gap-2 ">
                            <div className="w-[40px] h-[40px] rounded-full aspect-square ">
                              <Image
                                src={data.user?.coverPic}
                                alt=""
                                height={1000}
                                width={1000}
                                className="h-[100%] w-[100%] rounded-full object-fill"
                              />
                            </div>
                            <div
                              className={`relative bg-[#F3F7FA]  w-fit pr-12 text-ellipsis overflow-hidden ...`}
                            >
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
                                    : "0" +
                                      new Date(mg?.createdAt).getMinutes()}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Differentiate messages based on receiver */}
                        {mg?.by !== data.chatId && (
                          <div className="w-[60%] flex gap-2 justify-end text-ellipsis overflow-hidden ...">
                            <div
                              className={`relative bg-[#F3F7FA]  w-fit pr-12  `}
                            >
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
                                    : "0" +
                                      new Date(mg?.createdAt).getMinutes()}
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
                </div>

                <div className="flex items-center w-full gap-3 mt-4 ">
                  <div className="bg-[#4d4d4d] flex items-center gap-2 w-[88%] px-5 rounded-full py-3 msg-container ">
                    <input
                      type="text"
                      className="bg-transparent w-[100%] outline-0 text-white "
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

        {/* right section end  */}
      </div>
    </div>
  );
};

export default ChatsPage;
