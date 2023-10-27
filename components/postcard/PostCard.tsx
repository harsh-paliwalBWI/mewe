"use client";
import React from "react";

// import CategoryCard from "./categoryCard/CategoryCard";
import profile from "../../images/a5 2.svg";
import img1 from "../../images/abstract-virtual-fingerprint-illustration-modern-coworking-room-background-personal-biometric-data-concept-multiexposure 1.svg";
import img2 from "../../images/modern-luxury-hotel-office-reception-lounge-with-meeting-room 1.svg";

import Image from "next/image";
import FlatIcon from "../flatIcon/flatIcon";
import { Carousel } from 'antd';

const PostCard = () => {
  return (
    <div className="flex flex-col  gap-1 sm:gap-2 md:gap-3  bg-[#f7f9fb]   p-6">
      {/* Header Section */}
      <div className=" flex items-center justify-between ">
      <div className=" flex items-center  gap-4">
        <div className="h-16 w-16  rounded-full  overflow-hidden">
          <Image src={profile} alt="" className="h-full w-full object-cover " />
        </div>
        <div className="flex flex-col gap-1 border-2  border-green-800">
          <div className="flex  gap-3 items-center border-2 border-red-800">
            <h2 className="text-[#205d9d] text-lg font-medium border-2 border-yellow-800">
              Code Fusion
            </h2>
            <span className="h-1.5 w-1.5 bg-[#205d9d] aspect-square rounded-full text-center"></span>
            <p className="  text-[#626565] text-base font-medium  h-fit ">
              5mins ago
            </p>
          </div>

          <p className=" text-[#626565] text-base font-medium">@codefusion243</p>
        </div>
      </div>
      <FlatIcon className="flaticon-star text-2xl  text-[#054A91]  " />
      </div>

      {/* Image Carousel Section */}
      <div className="imageCarousel mb-4"> 
       <Carousel autoplay>
       <div className="h-64 w-full    overflow-hidden">
          <Image src={img2} alt="" className="h-full w-full object-contain " />
        </div>
        <div className="h-64 w-full  overflow-hidden">
          <Image src={img2} alt="" className="h-full w-full object-contain " />
        </div>
        <div className="h-64 w-full  overflow-hidden">
          <Image src={img2} alt="" className="h-full w-full object-contain " />
        </div>
        </Carousel>
        </div>

      {/* Like, Comment, Share Icons Section */}
      <div className="icons flex justify-between mb-4">
        <FlatIcon className="flaticon-heart text-4xl font-bold text-white " />
        <FlatIcon className="flaticon-heart text-4xl font-bold text-white " />
        <FlatIcon className="flaticon-heart text-4xl font-bold text-white " />
      </div>

      {/* Third Section */}
      <div className="content">
        <h2 className="text-xl font-semibold mb-2">heading</h2>
        <p className="text-gray-700">paragraph</p>
      </div>
    </div>
  );
};

export default PostCard;
