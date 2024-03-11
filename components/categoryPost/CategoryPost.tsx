"use client";
import { fetchAllPosts, fetchPostsByCategory } from "@/services/postService";
import { useQuery } from "@tanstack/react-query";
import React, { FC, useEffect, useState } from "react";
import PostCard from "../postcard/PostCard";
import Loading from "../../app/loading";
import { getCookie } from "cookies-next";
import { getStartUpData } from "@/services/startupService";
import FlatIcon from "../flatIcon/flatIcon";
import { fetchCategoryStartUps } from "@/services/homeService";
import useDebounce from "@/utils/useDebounce";
import { fetchPostsByCategoryAndLocation } from "@/config/typesense";

interface Props {
  selectedCategory: any;
  isviewall: any;
}

const CategoryPost: FC<Props> = ({ selectedCategory, isviewall }) => {
  const { data: allposts } = useQuery({
    queryKey: ["Posts"],
    queryFn: () => fetchAllPosts(),
  });

  const categoryname = selectedCategory?.name;
  // const [isClient, setIsClient] = useState(false);
  // console.log(categoryname, "CCCCCCCCX")

  const { data: categoryposts } = useQuery({
    queryKey: ["categoryposts", categoryname],
    queryFn: () => fetchPostsByCategory(categoryname),
  });

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [searchedPostsbyCity, setSearchedPostsbyCity] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  async function fetchSearchedPostsbyCity() {
    setIsSearching(true);
    const res = await fetchPostsByCategoryAndLocation(isviewall?null:selectedCategory,debouncedSearch);
    if (res) {
      setSearchedPostsbyCity(res);
    }
    setIsSearching(false);

    console.log(searchedPostsbyCity, "kkkkkkkkk")
  }

  useEffect(() => {
    if (searchQuery === "") {
      setSearchedPostsbyCity([]);
    }
    if (debouncedSearch) {
      fetchSearchedPostsbyCity();
      // fetch(`/api/search?q=${debouncedSearch}`);
    }
  }, [debouncedSearch]);


  // console.log(categoryposts, "mmmmmmmm")
  //   const { data: startUpData } = useQuery({
  //     queryKey: ["startUpData"],
  //     queryFn: () => getStartUpData(cookies),
  //   });
  // console.log(allposts, "---------");

  // useEffect(() => {
  //   setIsClient(true);
  // }, [allposts]);
  return (
    <>
      {isviewall ? (
        <>
          {allposts && allposts.length > 0 ? (
            // isClient ?
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
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
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
            <p>No posts available.</p>
          )}
        </>
      ) : (
        <>
          {categoryposts && categoryposts.length > 0 ? (
            // isClient ?
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
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className=" sm:mt-5 mt-2 md:mb-20 sm:mb-10 mb-5 flex flex-col gap-3 sm:gap-4 md:gap-5 ">
                {categoryposts &&
                  categoryposts.length > 0 &&
                  categoryposts.map((singlepost: any, idx: number) => {
                    return (
                      <div className="" key={idx}>
                        <PostCard singlePost={singlepost} />
                      </div>
                    );
                  })}
              </div>
            </>
          ) : (
            <p className="items-center justify-center font-semibold text-xl sm:text-2xl md:text-3xl h-full w-full">No posts available for the selected category.</p>
          )}
        </>
      )}
    </>
  );
};

export default CategoryPost;
