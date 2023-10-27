"use client";
import React from "react";


import img from "../../../images/ME_WE.svg";
import bottomImg from "../../../images/ME_WE.svg";
import Image from "next/image";
import CategoryCard from "@/components/categorycard/CategoryCard";
import NewsletterCard from "@/components/newslettercard/NewsletterCard";

const Newsletter = () => {
  return (
    <div className="px-body flex flex-col gap-10 my-10 ">
      <div className="flex flex-col gap-4">
        <h1 className="opacity-80 text-black text-2xl font-medium">
        Daily Digest
        </h1>
        <p className=" opacity-80 text-black text-4xl font-semibold">
        Newsletter
        </p>
      </div>
      <div className="grid w-full  xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1   grid-cols-1 gap-y-6  sm:gap-y-8  md:gap-y-10 lg:gap-y-12   gap-x-6  sm:gap-x-8  md:gap-x-10 lg:gap-x-12   border-2 border-red-800">
        <NewsletterCard />
        <NewsletterCard/>
     
      
       
      </div>
    </div>
  );
};

export default Newsletter;
