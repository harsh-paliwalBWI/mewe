"use client";
import React, { useState, Fragment } from "react";
import FlatIcon from "@/components/flatIcon/flatIcon";
import PostCard2 from "@/components/postcard/PostCard2";
import { fetchPosts } from "@/services/postService";
import { getStartUpData } from "@/services/startupService";
import "@ant-design/cssinjs";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const ManagePost = () => {
  const pathName = usePathname();
  const router = useRouter();
  const cookies = { value: getCookie("uid") };

  const { data: startUpData } = useQuery({
    queryKey: ["startUpData"],
    queryFn: () => getStartUpData(cookies),
  });

  console.log("startUpData", startUpData);

  const { data: postsData } = useQuery({
    queryKey: ["postsData"],
    queryFn: () => fetchPosts(startUpData?.id),
  });

  {console.log(postsData,"zzzzzz")}

  return (
    <>
      <div
        className={` h-fit ${
          pathName.includes("manage-posts")
            ? "block w-[100%]  sm:mt-5 md:mt-10 md:mb-24 mb-5"
            : "sm:block hidden md:w-[60%] w-[100%]"
        }`}
      >
        {pathName.includes("manage-posts") && (
          <div
            onClick={() => {
              router.replace("/account?tab=my-profile");
            }}
            className="mb-2"
          >
            <FlatIcon className="flaticon-arrow-right rotate-180 text-2xl font-bold" />
          </div>
        )}
        <div className="flex items-center justify-between my-5">
          <div className="text-primary font-bold sm:text-lg text-lg ">
            <h2>My Posts</h2>
          </div>
          <Link
            href={{ pathname: "/account", query: { tab: "new-post" } }}
            className={`${
              pathName.includes("manage-posts") ? "hidden" : "block"
            }`}
          >
            <div className="bg-primary font-medium  md:text-base sm:text-base text-sm text-white cursor-pointer sm:px-10 px-5 sm:py-3.5 py-2 rounded-md">
              <button>+ New Post</button>
            </div>
          </Link>
          <Link
            href={"/new-post"}
            className={`${
              pathName.includes("manage-posts") ? "block" : "hidden"
            }`}
          >
            <div className="bg-primary font-medium  md:text-base sm:text-base text-sm text-white cursor-pointer sm:px-10 px-5 sm:py-3.5 py-2 rounded-md">
              <button>+ New Post</button>
            </div>
          </Link>
        </div>
        {/* new start  */}
      

        {postsData && postsData.length <= 0 ? (
          <div className="md:text-xl text-base text-center md:h-[70vh] h-[20vh] flex items-center justify-center text-primary ">
            <h1>No posts yet !</h1>
          </div>
        ) : (
          <div className="  w-full   h-fit">
            <div className="flex flex-col gap-8 ">
              {postsData &&
                postsData?.length > 0 &&
                postsData?.map((post: any, idx: number) => {
                  return (
                    <div className="px-2 sm:px-3 md:px-4 lg:px-5" key={idx}>
                      <PostCard2 singlepost={post} />
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ManagePost;
