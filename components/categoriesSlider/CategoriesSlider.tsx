"use client";
import React from "react";

// import CategoryCard from "./categoryCard/CategoryCard";
import img from "../../../images/ME_WE.svg";
import bottomImg from "../../../images/ME_WE.svg";
import Image from "next/image";
import CategoryCard from "@/components/categorycard/CategoryCard";
import Link from "next/link";
import { Carousel } from "antd";


const responsiveSettings = [
    {
      breakpoint: 576, // Extra small screens (less than 576px)
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
      },
    },
    {
      breakpoint: 768, // Small screens (576px and above)
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
      },
    },
    {
      breakpoint: 992, // Medium screens (768px and above)
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
      },
    },
    {
      breakpoint: 1200, // Large screens (992px and above)
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6,
        initialSlide: 0,
        centerPadding: "800px", 
      },
    },
    {
      breakpoint: 1600, // Extra large screens (1200px and above)
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6,
        initialSlide: 0,
        centerPadding: "600px", 
      },
    },
  ];

const CategoriesSlider = () => {
  return (


    <div className="px-body flex flex-col gap-6 sm:gap-8 md:gap-10 mt-16 sm:mt-24 md:mt-32 ">
      <div className="flex justify-between items-center">
        <h1 className="opacity-80 text-black md:text-4xl sm:text-3xl text-2xl font-semibold ">
          Categories
        </h1>
        
      </div>
      <Carousel responsive={responsiveSettings} autoplay>
        <div className="px-3 sm:px-4 md:px-5">
        <CategoryCard />
        </div>
        <div className="px-2 sm:px-3 md:px-4 lg:px-5">
        <CategoryCard />
        </div>
        <div className="px-2 sm:px-3 md:px-4 lg:px-5">
        <CategoryCard />
        </div>
        <div className="px-2 sm:px-3 md:px-4 lg:px-5">
        <CategoryCard />
        </div>
        <div className="px-2 sm:px-3 md:px-4 lg:px-5">
        <CategoryCard />
        </div>
        <div className="px-2 sm:px-3 md:px-4 lg:px-5">
        <CategoryCard />
        </div>
        <div className="px-3 sm:px-4 md:px-5">
        <CategoryCard />
        </div>
        <div className="px-2 sm:px-3 md:px-4 lg:px-5">
        <CategoryCard />
        </div>
        <div className="px-2 sm:px-3 md:px-4 lg:px-5">
        <CategoryCard />
        </div>
        <div className="px-2 sm:px-3 md:px-4 lg:px-5">
        <CategoryCard />
        </div>
        <div className="px-2 sm:px-3 md:px-4 lg:px-5">
        <CategoryCard />
        </div>
        <div className="px-2 sm:px-3 md:px-4 lg:px-5">
        <CategoryCard />
        </div>
      </Carousel>
    </div>
  );
};

export default CategoriesSlider;
