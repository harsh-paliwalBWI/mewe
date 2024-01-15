"use client";
import React, { FC, useState, Fragment, useRef } from "react";
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
  where,
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
import { GoHeartFill } from "react-icons/go";
import PostCard3 from "../postcard/PostCard3";

interface Props {
  aboutInfo: any;
}

const PostsSlider: FC<Props> = ({ aboutInfo }) => {
  // console.log(aboutInfo, "POST SLIDES");

  // const cookies = { value: getCookie("uid") };
  // const [data2, setData2] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [postMessages, setPostMessages] = useState<{ [key: string]: string }>(
  //   {}
  // );
  // const [viewMessage, setViewMessage] = useState([]);
  // const [viewComment, setViewComment] = useState(false);
  // const [docId, setDocId] = useState("");
  // const [isDeleted, setIsDeleted] = useState(false);
  // const queryClient = useQueryClient();
  // const [liked, setLiked] = useState(false);

  const { data: postsData } = useQuery({
    queryKey: ["postsData"],
    queryFn: () => fetchPosts(aboutInfo.id),
  });
  // console.log(postsData, "post data");



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
                return (
                  <div className="px-2 sm:px-3 md:px-4 lg:px-5" key={idx}>
                    <PostCard3 singlepost={post}  aboutInfo={aboutInfo}/>
                  </div>
                );
                
              })}
          </div>
         
        </div>
      )}
    </>
  );
};

export default PostsSlider;
