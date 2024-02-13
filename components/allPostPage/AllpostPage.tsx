"use client";
import { fetchAllPosts } from "@/services/postService";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import PostCard from '../postcard/PostCard';
import Loading from "../../app/loading";
import { getCookie } from "cookies-next";
import { getStartUpData } from "@/services/startupService";

const AllPostPage = () => {
  const [isClient, setIsClient] = useState(false);
  const cookies = { value: getCookie("uid") };
  // console.log(cookies.value)

  const { data: allposts } = useQuery({
    queryKey: ["Posts"],
    queryFn: () => fetchAllPosts(),
  });
//   const { data: startUpData } = useQuery({
//     queryKey: ["startUpData"],
//     queryFn: () => getStartUpData(cookies),
//   });
  // console.log(allposts,"---------");

  useEffect(() => {
    setIsClient(true);
  }, [allposts]);
  return (
    <div className="px-body">
      {allposts && allposts.length > 0 && isClient ? (
        <>
          <div>
            {" "}
            <h1 className="opacity-80 text-black md:text-4xl sm:text-3xl text-2xl font-semibold sm:mt-10 mt-5">
              Posts
            </h1>
          </div>
          <div className=" sm:mt-10 mt-5 md:mb-20 sm:mb-10 mb-5  grid w-full  xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1   grid-cols-1 gap-y-4  sm:gap-y-8  md:gap-y-10 lg:gap-y-12   gap-x-4  sm:gap-x-8  md:gap-x-10 lg:gap-x-12  ">
            {allposts &&
              allposts.length > 0 &&
              allposts
                .map((singlepost: any, idx: number) => {
                    return (
                        <div className="px-2 sm:px-3 md:px-4 lg:px-5" key={idx}>
                          <PostCard singlePost={singlepost}/>
                        </div>
                      );
              })}
          </div>
        </>
      ) : (
        <div className="px-body">
          <h1 className="opacity-80 text-black md:text-4xl sm:text-3xl text-2xl font-semibold sm:mt-10 mt-5">
            Posts
          </h1>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default AllPostPage;
