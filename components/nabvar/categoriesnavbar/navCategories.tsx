"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FlatIcon from "../../flatIcon/flatIcon";
const data = ["About", "Explore", "Schemes", "Financials", "Account"];
const Categories = () => {
  const textStyle="lg:text-base md:text-sm text-xs  md:px-2 "
  return (
    <div className="w-full bg-[#272726] px-body flex justify-center items-center py-2 sm:py-3 md:py-4 ">
      <div className="flex justify-center lg:gap-10 md:gap-4 gap-3  w-[100%]    ">
         <Link href={"/about-our-company"} className="">
          <div className={`text-[#cbcbcb] ${textStyle}`}>
            <h1 className=" ">About</h1>
          </div>
        </Link>
        <Link href={"/"} className="">
          <div className={`text-[#cbcbcb] ${textStyle}`}>
            <h1 className=" ">Explore</h1>
          </div>
        </Link>
        {/* <div className={`text-[#CBCBCB] cursor-pointer ${textStyle}`}><h1 >Explore</h1></div> */}
        <Link href={"/schemes"}>
        <div className={`text-[#CBCBCB] flex gap-2 items-center cursor-pointer ${textStyle} `}><h1 >Schemes</h1>
         <FlatIcon className="flaticon-down-arrow md:text-xs text-[10px] font-semibold" />
         </div>
         </Link>
         <Link href={"/financials"}>
        <div className={`text-[#CBCBCB] flex gap-2 ${textStyle} `}><h1 >Financials</h1>
        <FlatIcon className="flaticon-down-arrow md:text-xs text-[10px] font-semibold" />
        </div>
        </Link>
        <Link href={"/account"}>
          <div className={`text-[#CBCBCB] ${textStyle}`}>
            <h1 className=" ">Account</h1>
          </div>
        </Link>
        <Link href={"/welcome"}>
          <div className={`text-[#CBCBCB] ${textStyle}`}>
            <h1 className=" ">
              Log in / Sign up
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Categories;



