"use client";
import React from "react";

// import CategoryCard from "./categoryCard/CategoryCard";
import img from "../../../images/ME_WE.svg";
import bussinessimg from "../../images/bussinessimg.svg";
import add from "../../images/add (1) 1.svg";
import bird from "../../images/Ellipse 52.svg";
import verify from "../../images/verify 2.svg";
import Image from "next/image";
import FlatIcon from "../flatIcon/flatIcon";
import Link from "next/link";

const BussinessCard = () => {
  return (
    <Link href={"/about"}>
    <div className="flex flex-col justify-between items-center gap-1 sm:gap-2 md:gap-3  bg-[#f6f9fd] rounded-[5px] ">
      <div className="relative rounded-[5px] w-full h-auto flex items-center justify-center  ">
        <Image
          src={bussinessimg}
          alt=""
          width={1000}
          height={1000}
          className="w-full h-full object-contain 
          
                "
        />

        <div className="absolute  top-0 right-0 transform -translate-x-1/2 translate-y-1/2  cursor-pointer">
          <FlatIcon className="flaticon-close  md:text-xl sm:text-lg text-base text-black" />
        </div>
        <div className="w-12 h-12 sm:w-16 sm:h-16  md:w-20 md:h-20 bottom-0 md:translate-y-1/2 sm:translate-y-1/2 translate-y-1/2 absolute ">
          <Image src={bird} 
          alt="" 
          className=" rounded-full w-full h-full object-contain" />
          <div className="absolute w-4 h-4 sm:w-6 sm:h-6  md:w-8 md:h-8 top-0 right-0 transform -translate-y-1/3">
            <Image
              src={verify}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col  gap-2 sm:gap-3 md:gap-4   items-center w-full mt-5 sm:mt-7 md:mt-9 mb-3">
        <h2 className=" md:text-xl sm:text-lg text-base font-medium text-black ">
          Formonix
        </h2>
        <div className="flex flex-col gap-1.5 sm:gap-2 md:gap-3 items-center justify-center">
          <p className="opacity-40 text-black  text-xs sm:text-sm md:text-[15px] font-normal text-center">
            Health & care Services
          </p>
          <p className="opacity-40 text-black text-[10px] sm:text-xs md:text-sm font-normal ">
            1,29,039 followers
          </p>
        </div>

        <div className=" w-[85%] flex  justify-center  items-center gap-1 sm:gap-2 md:gap-3 rounded-full px-4 sm:px-6 md:px-8 py-1 sm:py-2 md:py-3 border border-[#a3bad6] cursor-pointer">
          <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ">
            <Image
              src={add}
              alt=""
             
              className="w-full h-full object-contain 
          
                "
            />
          </div>

          <h2 className=" text-[#326aa4] text-sm sm:text-base md:text-lg font-semibold ">
            Follow
          </h2>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default BussinessCard;
