"use client";
import React, { FC, useState, useEffect, useContext } from "react";
import logoImg from "../../../images/a5 1.png";
import Image from "next/image";
import blueTickImg from "../../../images/verify 3.svg";
import buildingImg from "../../../images/glass-architecture 1.svg";
import bookMarkImg from "../../../images/Layer 2.svg";
import FlatIcon from "@/components/flatIcon/flatIcon";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import avatarimg from "../../../images/avatar.png";
import { toast } from "react-toastify";

import {
  getStartUpData,
  fetchBusinessAccountDetails,
} from "@/services/startupService";
import { getCookie } from "cookies-next";
import { fetchPosts } from "@/services/postService";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase-config";
import Modal from "@/components/Modal/modal";
import { CircularProgress } from "@mui/material";
import { getDataofstartup } from "@/services/chatService";
import { ChatContext } from "../../../utils/ChatContext";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  setSelectedTab: any; // Adjust the type as needed
  selectedTab: any;
  aboutInfo: any;
}

const AboutOptions: FC<Props> = ({
  setSelectedTab,
  selectedTab,
  aboutInfo,
}) => {
  // console.log("aboutInfo", aboutInfo);

  const [client, setClient] = useState(false);

  const { dispatch } = useContext(ChatContext);

  const cookies = { value: getCookie("uid") };
  const router = useRouter();

  const optionStyle =
    "flex gap-x-4 bg-[#F3F7FA] px-4 text-sm font-semibold py-4 cursor-pointer";
  const optionTabStyle =
    "flex w-full justify-between xl:text-lg text-sm font-medium items-center";
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: startUpData } = useQuery({
    queryKey: ["startUpData"],
    queryFn: () => getStartUpData(cookies),
  });
  // console.log("startUpData", startUpData);

  const { data: businessAccountData } = useQuery({
    queryKey: ["businessAccountData"],
    queryFn: () => fetchBusinessAccountDetails(cookies),
  });

  const { data: postsData } = useQuery({
    queryKey: ["postsData"],
    queryFn: () => fetchPosts(aboutInfo?.id),
  });

  const isFollowing = startUpData?.following?.some(
    (item: any) => item?.docId === aboutInfo?.id
  );

  const onFollowHandler = async (data: any) => {
    // console.log(data, "from follow");
    setIsModalOpen(true);
    try {
      const docid = startUpData?.id;
      // for following start
      if (docid) {
        const docRef = doc(db, `startups/${docid}`);
        const docSnap = await getDoc(docRef);
        const existingFollowing = docSnap.data()?.following || [];
        const newFollowingObj = {
          // [data?.docId]: {
          docId: data?.id,
          name: data?.name || "",
          coverPic: {
            mob: data?.basic?.coverPic?.mob || "",
            url: data?.basic?.coverPic?.url || "",
            thumb: data?.basic?.coverPic?.thumb || "",
          },
          category: {
            id: data?.basic?.category?.id || "",
            name: data?.basic?.category?.name || "",
            // },
          },
        };
        const updatedFollowing = [...existingFollowing, newFollowingObj];
        await setDoc(docRef, { following: updatedFollowing }, { merge: true });
        // for following end
      }
      // for followers start
      const followersId = data?.id;
      if (followersId) {
        const docRef = doc(db, `startups/${followersId}`);
        const docSnap = await getDoc(docRef);
        const existingFollowers = docSnap.data()?.followers || [];
        const newFollowerObj = {
          // [startUpData?.id]: {
          docId: startUpData?.id,
          name: startUpData?.name || "",
          coverPic: {
            mob: startUpData?.basic?.coverPic?.mob || "",
            url: startUpData?.basic?.coverPic?.url || "",
            thumb: startUpData?.basic?.coverPic?.thumb || "",
          },
          category: {
            id: startUpData?.basic?.category?.id || "",
            name: startUpData?.basic?.category?.name || "",
          },
          // }
        };
        const updatedFollowers = [...existingFollowers, newFollowerObj];
        await setDoc(docRef, { followers: updatedFollowers }, { merge: true });
      }
      // for followers end
      await queryClient.invalidateQueries({ queryKey: ["startUpData"] });
      await queryClient.refetchQueries({ queryKey: ["startUpData"] });
      toast.success("Followed.");
      setIsModalOpen(false);
    } catch (err) {
      setIsModalOpen(false);
      toast.error("Something went wrong!");
    }
  };

  const handleSelect = async (selectedUser: any) => {
    const currentUser = cookies?.value;
    console.log(currentUser, "currentUseroooo");
    console.log(selectedUser, "selectedUserooo");
    
    try {
      const q = doc(db, `chat/${currentUser}/startups/${selectedUser}`);
      const res = await getDoc(q);
      console.log(res.data(),"res")

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

  const onUnfollowHandler = async (data: any) => {
    // console.log(data, "from unfollow");
    setIsModalOpen(true);
    try {
      const docid = startUpData?.id;
      // from following start
      if (docid) {
        const docRef = doc(db, `startups/${docid}`);
        const docSnap = await getDoc(docRef);
        const existingFollowing = docSnap.data()?.following || [];
        const updatedFollowing = existingFollowing.filter(
          (item: any) => item.docId !== data?.id
        );
        await setDoc(docRef, { following: updatedFollowing }, { merge: true });
      }
      // from following end
      // from followers start
      const followersId = data?.id;
      if (followersId) {
        const followersDocRef = doc(db, `startups/${followersId}`);
        const docSnap = await getDoc(followersDocRef);
        const existingFollowers = docSnap.data()?.followers || [];
        const updatedFollowers = existingFollowers.filter(
          (item: any) => item.docId !== startUpData?.id
        );
        await setDoc(
          followersDocRef,
          { followers: updatedFollowers },
          { merge: true }
        );
      }
      // from followers end
      await queryClient.invalidateQueries({ queryKey: ["startUpData"] });
      await queryClient.refetchQueries({ queryKey: ["startUpData"] });
      setIsModalOpen(false);
      toast.success("Unfollowed.");
    } catch (err) {
      setIsModalOpen(false);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    // console.log("inside use effect");
    setClient(true);
  }, []);

  return (
    <>
      <div className=" w-[100%] filter-border  h-fit  bg-[#F8FAFC] relative z-10">
        <div className="w-full h-[100px] ">
          <Image
            src={buildingImg}
            alt=""
            height={1000}
            width={1000}
            className="w-[100%] h-[100%] object-cover"
          />
        </div>
        <div className=" xl:px-8 px-4">
          {/* top section  */}
          <div className="flex items-end gap-2 xl:mt-[-70px] md:mt-[-50px] sm:mt-[-70px] mt-[-30px] z-30">
            <div className="flex justify-center ">
              <div className="xl:h-[145px] md:h-[100px] xl:w-[145px] md:w-[100px] sm:w-[100px] sm:h-[100px] w-[100px] h-[100px]   rounded-full  relative">
                <Image
                  src={
                    client && aboutInfo?.basic?.coverPic?.url
                      ? aboutInfo?.basic?.coverPic?.url
                      : avatarimg
                  }
                  alt=""
                  height={1000}
                  width={1000}
                  className="h-[100%] w-[100%] object-fill  rounded-full "
                />
                <div className="lg:h-[46px] h-[36px] lg:w-[46px] w-[36px] absolute right-0 top-0">
                  <Image
                    src={blueTickImg}
                    height={1000}
                    width={1000}
                    alt=""
                    className="h-[100%] w-[100%] object-fill  "
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-start  w-full">
              <div className="flex flex-col gap-1">
                <div className=" xl:text-lg lg:text-base text-sm font-semibold ">
                  <h2>{client && aboutInfo?.name ? aboutInfo?.name : ""}</h2>
                </div>
                <div className=" lg:text-base text-sm font-medium text-[#868E97] ">
                  <p>
                    {client && aboutInfo?.basic?.category?.name
                      ? aboutInfo?.basic?.category?.name
                      : " "}
                  </p>
                </div>
              </div>
              {/* <div>
                <FlatIcon className="flaticon-bookmark text-black xl:text-3xl text-xl font-bold" />
              </div> */}
            </div>
          </div>
          <div className="flex items-center gap-1 mt-6 ">
            <FlatIcon className="flaticon-map xl:text-2xl text-lg" />
            <p className="text-[#707172] xl:text-base text-xs  font-medium capitalize">
              {client && businessAccountData?.city
                ? businessAccountData?.city
                : "Your Startup City"}
            </p>
          </div>
          {startUpData?.id !== aboutInfo?.id && (
            <div className="flex xl:text-base text-sm font-medium tracking-widest gap-3 mt-6">
              {client && isFollowing ? (
                <div
                  onClick={async () => await onUnfollowHandler(aboutInfo)}
                  className="w-[50%] text-center rounded-full bg-primary text-white xl:py-3 py-2 flex justify-center cursor-pointer "
                >
                  <button className="flex items-center justify-center gap-1">
                    <FlatIcon className="flaticon-add-user xl:text-2xl text-xl " />
                    <span className="">Following</span>
                  </button>
                </div>
              ) : (
                <div
                  onClick={async () => await onFollowHandler(aboutInfo)}
                  className="w-[50%] text-center rounded-full bg-primary text-white xl:py-3 py-2 flex justify-center  cursor-pointer"
                >
                  <button className="flex items-center justify-center gap-1">
                    <FlatIcon className="flaticon-add-user xl:text-2xl text-xl" />
                    <span>Follow</span>
                  </button>
                </div>
              )}
               {client && isFollowing ? (
              <div className="w-[50%] border border-primary text-center rounded-full xl:py-3 py-2 text-primary cursor-pointer">
                <button
                  onClick={() => {
                    handleSelect(aboutInfo?.id);
                    // console.log((item as any)?.docId, "kkkgkk");
                    console.log(aboutInfo?.id, "cvcvcv");
                    // () => handleChange(item);
                    router.push("/account?tab=chat");
                  }}
                >
                  Message
                </button>
              </div>):null}
            </div>
          )}
          <Modal isOpen={isModalOpen} setOpen={setIsModalOpen}>
            <div className="flex flex-col gap-2 justify-center items-center">
              <CircularProgress className="!text-white"></CircularProgress>
              <p className="text-white font-medium text-lg">Processing..</p>
            </div>
          </Modal>
          <div className="flex flex-col gap-4 xl:pb-10 py-5">
            <div
              //   onClick={()=>setSelectedTab(1)}
              className={`flex w-full xl:text-lg  text-sm font-medium ${
                businessAccountData?.description
                  ? "flex-col justify-start items-start"
                  : "flex-row justify-between  items-center"
              }`}
            >
              <h2 className="text-primary">About</h2>
              {/* {businessAccountData?.description ? <br></br>:null} */}
              <h2 className="text-[#868E97] text-xs sm:text-sm md:text-base">
                {client && businessAccountData?.description
                  ? businessAccountData?.description
                  : "-"}
              </h2>
            </div>
            <div
              //   onClick={()=>setSelectedTab(2)}
              className={`${optionTabStyle}`}
            >
              <h2 className="text-primary">Photos</h2>
              <h2 className="text-[#868E97]">564</h2>
            </div>
            <div
              //   onClick={()=>setSelectedTab(3)}
              className={`${optionTabStyle}`}
            >
              <h2 className="text-primary">Videos</h2>
              <h2 className="text-[#868E97]">21</h2>
            </div>
            <div
              //   onClick={()=>setSelectedTab(4)}
              className={`${optionTabStyle}`}
            >
              <h2 className="text-primary">Posts</h2>
              <h2 className="text-[#868E97]">
                {client && postsData && postsData?.length > 0
                  ? postsData?.length
                  : "0"}
              </h2>
            </div>
            <div
              //   onClick={()=>setSelectedTab(4)}
              className={`${optionTabStyle}`}
            >
              <h2 className="text-primary">Followers</h2>
              {/* <h2 className="text-[#868E97]">{(client&&aboutInfo)? aboutInfo.followers?.length: "-"}</h2> */}
              <h2 className="text-[#868E97]">
                {client && aboutInfo?.followers
                  ? aboutInfo?.followers?.length
                  : "0"}
              </h2>
            </div>
            <div
              //   onClick={()=>setSelectedTab(4)}
              className={`${optionTabStyle}`}
            >
              <h2 className="text-primary">Followings</h2>
              <h2 className="text-[#868E97]">
                {client && aboutInfo?.following
                  ? aboutInfo?.following?.length
                  : "0"}
              </h2>

              {/* <h2 className="text-[#868E97]">{(client&&aboutInfo)? aboutInfo.following?.length: "-"}</h2> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutOptions;
