"use client";
import React from "react";
import { Carousel } from "antd";

import PostCard from "@/components/postcard/PostCard";
import { useQuery } from "@tanstack/react-query";
import { fetchAllPosts } from "@/services/postService";
import { getStartUpData } from "@/services/startupService";
import { getCookie } from "cookies-next";

const Posts = () => {
  // const responsiveSettings = [
  //   {
  //     breakpoint: 576, // Extra small screens (less than 576px)
  //     settings: {
  //       slidesToShow: 1,
  //       slidesToScroll: 1,
  //       initialSlide: 0,
  //     },
  //   },
  //   {
  //     breakpoint: 768, // Small screens (576px and above)
  //     settings: {
  //       slidesToShow: 1,
  //       slidesToScroll: 1,
  //       initialSlide: 0,
  //     },
  //   },
  //   {
  //     breakpoint: 992, // Medium screens (768px and above)
  //     settings: {
  //       slidesToShow: 2,
  //       slidesToScroll: 2,
  //       initialSlide: 0,
  //     },
  //   },
  //   {
  //     breakpoint: 1200, // Large screens (992px and above)
  //     settings: {
  //       slidesToShow: 2,
  //       slidesToScroll: 2,
  //       initialSlide: 0,
  //       // centerPadding: "800px",
  //     },
  //   },
  //   {
  //     breakpoint: 1600, // Extra large screens (1200px and above)
  //     settings: {
  //       slidesToShow: 2,
  //       slidesToScroll: 2,
  //       initialSlide: 0,
  //       // centerPadding: "600px",
  //     },
  //   },

  // ];

  const responsiveSettings = [
    {
      breakpoint: 2100,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: false,
        initialSlide: 0,
      },
    },

    {
      breakpoint: 1800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: false,
        initialSlide: 0,
      },
    },

    {
      breakpoint: 1515,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: false,
        initialSlide: 0,
      },
    },
    {
      breakpoint: 1242,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: false,
        initialSlide: 0,
      },
    },

    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: false,
        dots: true,
        initialSlide: 0,
      },
    },
    {
      breakpoint: 833,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
      },
    },
  ];

  const cookies = { value: getCookie("uid") };

  const { data: allposts } = useQuery({
    queryKey: ["Posts"],
    queryFn: () => fetchAllPosts(),
  });

  const { data: startUpData } = useQuery({
    queryKey: ["startUpData"],
    queryFn: () => getStartUpData(cookies),
  });

  // console.log(allposts,"---->")

  return (
    <div className="px-body flex flex-col gap-6 sm:gap-8 md:gap-10 mt-8 sm:mt-16 md:mt-24 lg:mt-32">
      <div className="flex justify-between">
        <h1 className="opacity-80 text-black md:text-4xl sm:text-3xl text-2xl font-semibold">
          Posts
        </h1>
        <p className="opacity-80 text-black md:text-xl sm:text-lg text-base font-medium underline underline-offset-2 cursor-pointer">
          View all
        </p>
      </div>

      <Carousel responsive={responsiveSettings} autoplay className="dot-black ">
      
        {allposts &&
          allposts.length > 0 &&
          allposts
            // .filter((post: any) => post?.docId !== startUpData?.id)
            .slice(0, 6)
            .map((singlepost: any, idx: number) => {
              return (
                <div className="px-2 sm:px-3 md:px-4 lg:px-5" key={idx}>
                  <PostCard singlePost={singlepost}/>
                </div>
              );
            })}

        {/* <div className="px-2 sm:px-3 md:px-4 lg:px-5">
          <PostCard />
        </div>
        <div className="px-2 sm:px-3 md:px-4 lg:px-5">
          <PostCard />
        </div>
        <div className="px-2 sm:px-3 md:px-4 lg:px-5">
          <PostCard />
        </div>
        <div className="px-2 sm:px-3 md:px-4 lg:px-5">
          <PostCard />
        </div>
        <div className="px-2 sm:px-3 md:px-4 lg:px-5">
          <PostCard />
        </div> */}
      </Carousel>
    </div>
  );
};

export default Posts;
