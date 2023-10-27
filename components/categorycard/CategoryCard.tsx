"use client";
import React from "react";

// import CategoryCard from "./categoryCard/CategoryCard";
import img from "../../../images/ME_WE.svg";
import vector from "../../images/Vector.svg";
import Image from "next/image";

const CategoryCard = () => {
  return (
    <div className="flex flex-col justify-between items-center border-2 gap-1 sm:gap-2 md:gap-3 border-black">
      <div className=" flex  justify-center items-center  bg-[#054a91] rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl   aspect-square w-full  border-2 border-black">
        <div className=" h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20">
          <Image
            src={vector}
            alt="image"
            width={1000}
            height={100}
            // layout="responsive"
            className="object-fill w-full h-full"
          />
        </div>
      </div>
      <p className=" text-black text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium ">Education</p>
    </div>
  );
};

export default CategoryCard;
