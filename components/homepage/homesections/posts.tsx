"use client";
import React from "react";
import { Carousel } from "antd";

import PostCard from "@/components/postcard/PostCard";

const Posts = () => {
  const responsiveSettings = [
    {
      breakpoint: 576, // Extra small screens (less than 576px)
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
      },
    },
    {
      breakpoint: 768, // Small screens (576px and above)
      settings: {
        slidesToShow: 1.25,
        slidesToScroll: 1,
        initialSlide: 0,
      },
    },
    {
      breakpoint: 992, // Medium screens (768px and above)
      settings: {
        slidesToShow: 1.5,
        slidesToScroll: 1,
        initialSlide: 0,
      },
    },
    {
      breakpoint: 1200, // Large screens (992px and above)
      settings: {
        slidesToShow: 1.75,
        slidesToScroll: 1,
        initialSlide: 0,
        centerPadding: "800px", 
      },
    },
    {
      breakpoint: 1600, // Extra large screens (1200px and above)
      settings: {
        slidesToShow: 1.75,
        slidesToScroll: 1,
        initialSlide: 0,
        centerPadding: "600px", 
      },
    },
  ];

  return (
    <div className="px-body flex flex-col gap-6 sm:gap-8 md:gap-10 mt-16 sm:mt-24 md:mt-32">
      <div className="flex justify-between">
        <h1 className="opacity-80 text-black md:text-4xl sm:text-3xl text-2xl font-semibold">Posts</h1>
        <p className="opacity-80 text-black md:text-xl sm:text-lg text-base font-medium underline underline-offset-2 cursor-pointer">
          View all
        </p>
      </div>

      <Carousel responsive={responsiveSettings} autoplay>
        <div className="px-3 sm:px-4 md:px-5">
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
        </div>
        <div className="px-2 sm:px-3 md:px-4 lg:px-5">
          <PostCard />
        </div>
      </Carousel>
    </div>
  );
};

export default Posts;
