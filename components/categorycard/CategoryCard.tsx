"use client";
import React from "react";

// import CategoryCard from "./categoryCard/CategoryCard";
import img from "../../../images/ME_WE.svg";
import vector from "../../images/Vector.svg";
import Image from "next/image";

const CategoryCard = () => {
  return (
    <div className="flex flex-col justify-between items-center  gap-1 sm:gap-2 md:gap-3  cursor-pointer">
      <div className=" flex  justify-center items-center  bg-[#054a91] rounded-lg md:rounded-xl lg:rounded-2xl   aspect-[6/5] w-full ">
        {/* h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 */}
        <div className="w-[45%] h-auto">
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
      <p className=" text-black text-base sm:text-lg md:text-xl lg:text-2xl font-medium ">Education</p>
    </div>
  );
};

export default CategoryCard;
