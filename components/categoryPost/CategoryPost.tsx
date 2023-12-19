"use client";
import { fetchAllPosts } from "@/services/postService";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import PostCard from "../postcard/PostCard";
import Loading from "../../app/loading";
import { getCookie } from "cookies-next";
import { getStartUpData } from "@/services/startupService";
import FlatIcon from "../flatIcon/flatIcon";

const CategoryPost = (selectedCategory: any) => {
  const [isClient, setIsClient] = useState(false);
  //   const cookies = { value: getCookie("uid") };
  //   console.log(cookies.value)

  const { data: allposts } = useQuery({
    queryKey: ["Posts"],
    queryFn: () => fetchAllPosts(),
  });
  //   const { data: startUpData } = useQuery({
  //     queryKey: ["startUpData"],
  //     queryFn: () => getStartUpData(cookies),
  //   });
  // console.log(allposts, "---------");

  useEffect(() => {
    setIsClient(true);
  }, [allposts]);
  return (
    <>
      {allposts && allposts.length > 0 && isClient ? (
        <>
          <div className="flex flex-row justify-between items-center ">
            <h1 className=" text-black md:text-4xl sm:text-2xl text-lg font-semibold  ">
              Posts
            </h1>
            <div className="flex px-3 justify-center h-[80%] items-center gap-0.5 md:gap-1 rounded-full w-[50%] sm:w-[40%] md:w-[30%] bg-[#e5eaf1] header-search-conatiner ">
              <div className=" h-full  ">
                <FlatIcon className="flaticon-search text-sm sm:text-base md:text-xl font-semibold text-[#ced3d8]" />
              </div>
              <input
                type="text"
                className="  outline-0  py-1 px-0.5  md:py-2 md:px-1  w-full h-full text-black bg-[#e5eaf1] rounded-full text-xs sm:text-sm md:text-base placeholder-[#ced3d8]"
                placeholder="Search by City"
              />
            </div>
          </div>

          <div className=" sm:mt-5 mt-2 md:mb-20 sm:mb-10 mb-5 flex flex-col gap-3 sm:gap-4 md:gap-5 ">
            {allposts &&
              allposts.length > 0 &&
              allposts.map((singlepost: any, idx: number) => {
                return (
                  <div className="" key={idx}>
                    <PostCard singlePost={singlepost} />
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
};

export default CategoryPost;
