"use client";
import React from "react";
import { Carousel } from 'antd';

// import CategoryCard from "./categoryCard/CategoryCard";
import img from "../../../images/ME_WE.svg";
import bottomImg from "../../../images/ME_WE.svg";
import Image from "next/image";
import CategoryCard from "@/components/categorycard/CategoryCard";
import BussinessCard from "@/components/bussinesscard/BussinessCard";
import PostCard from "@/components/postcard/PostCard";

const Posts = () => {
    // const responsiveSettings = {
    //     xs: 1,  // Number of items to show on extra small screens (less than 576px)
    //     sm: 1.25,  // Number of items to show on small screens (576px and above)
    //     md: 1,  // Number of items to show on medium screens (768px and above)
    //     lg: 1.75,  // Number of items to show on large screens (992px and above)
    //     xl: 2,  // Number of items to show on extra large screens (1200px and above)
    //     xxl: 2.5, // Number of items to show on extra extra large screens (1600px and above)
    //   };

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
          },
        },
        {
          breakpoint: 1600, // Extra large screens (1200px and above)
          settings: {
            slidesToShow: 1.75,
            slidesToScroll: 1,
            initialSlide: 0,
          },
        },
      ];

  return (
    <div className="px-body flex flex-col gap-10 mt-10">
    <div className="flex justify-between">
      <h1 className="opacity-80 text-black text-4xl font-semibold">
        Posts
      </h1>
      <p className="opacity-80 text-black text-xl font-medium underline underline-offset-2">
        View all
      </p>
    </div>

  
        <Carousel responsive={responsiveSettings}  >
          <div className="px-4"><PostCard /></div>
          <div className="px-4"><PostCard /></div>
          <div className="px-4"><PostCard /></div>
          <div className="px-4"><PostCard /></div>
          <div className="px-4"><PostCard /></div>
          <div className="px-4"><PostCard /></div>
        </Carousel>
      </div>

  );
};

export default Posts;
