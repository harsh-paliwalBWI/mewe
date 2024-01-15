"use client";
import React,{FC} from "react";
// import CategoryCard from "./categoryCard/CategoryCard";
import img from "../../images/we.svg";
import vector from "../../images/Vector.svg";
import Image from "next/image";
import Link from "next/link";
import { constant } from "@/utils/constants";

interface Props {
  
    isviewall:any;
  }

// 
// 
const CategoryCard3:FC<Props> = ({isviewall}) => {


  return (
    
    <div className="flex flex-col justify-between items-center  gap-1 sm:gap-2 md:gap-3  cursor-pointer">
      <div className={`flex justify-center items-center rounded-lg md:rounded-xl lg:rounded-2xl aspect-[6/5] w-full ${isviewall === true ? 'bg-[#054a91]' : 'bg-[#a8abac]'}`}>
        {/* h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 */}
        <div className="w-[50px] h-[46px] ">
          <Image
            src={img}
            alt="image"
            width={1000}
            height={100}
            // layout="responsive"
            className="object-fill w-full h-full "
          />
        </div>
      </div>
      <p className=" text-black text-sm sm:text-base md:text-sm lg:text-lg font-medium  ">All</p>
    </div>

  );
};

export default CategoryCard3;
