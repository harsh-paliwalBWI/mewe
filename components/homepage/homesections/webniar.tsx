"use client";
import React from "react";


import img from "../../../images/ME_WE.svg";
import bottomImg from "../../../images/ME_WE.svg";
import Image from "next/image";
import CategoryCard from "@/components/categorycard/CategoryCard";
import WebniarCard from "@/components/webniarcard/WebniarCard";

const Webniar = () => {
  return (
    <div className="px-body flex flex-col gap-6 sm:gap-8 md:gap-10 mt-16 sm:mt-24 md:mt-32 ">
      <div className="flex justify-between items-center">
        <h1 className="opacity-80 text-black md:text-4xl sm:text-3xl text-2xl font-semibold ">
        Webinar Sessions
        </h1>
        <p className="opacity-80 text-black md:text-xl sm:text-lg text-base font-medium underline underline-offset-2 cursor-pointer">
          View all
        </p>
      </div>
      <div className="grid w-full  xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1   grid-cols-1 gap-y-4  sm:gap-y-6  md:gap-y-8 lg:gap-y-10   gap-x-4  sm:gap-x-6  md:gap-x-8 lg:gap-x-10  ">
        <WebniarCard/>
        <WebniarCard/>
     
      
       
      </div>
    </div>
  );
};

export default Webniar;
