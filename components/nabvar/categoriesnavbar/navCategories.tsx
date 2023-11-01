"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import FlatIcon from "../../flatIcon/flatIcon";

const data = ["About", "Explore", "Schemes", "Financials", "Account"];

const Categories = () => {

  const textStyle="lg:text-base md:text-sm text-xs  md:px-2 "
  return (
    <div className="w-full bg-[#272726] px-body flex justify-center items-center   py-4 ">
      <div className="flex justify-center lg:gap-10 md:gap-4 gap-3  w-full w-[100%]  ">
        <Link href={"/about"} className="">
        <div className={`text-[#cbcbcb] ${textStyle}`}><h1 >About</h1></div>
        </Link>
        <div className={`text-[#cbcbcb] ${textStyle}`}><h1 >Explore</h1></div>
        <div className={`text-[#cbcbcb] flex gap-2 items-center ${textStyle} `}><h1 >Schemes</h1>
         <FlatIcon className="flaticon-down-arrow md:text-xs text-[10px] font-semibold" />
         </div>
         <Link href={"/financials"}>
        <div className={`text-[#cbcbcb] flex gap-2 ${textStyle} `}><h1 >Financials</h1>
        <FlatIcon className="flaticon-down-arrow md:text-xs text-[10px] font-semibold" />
        </div>
        </Link>
        <Link href={"/account"}>
          <div className={`text-[#cbcbcb] ${textStyle}`}>
            <h1 className=" ">Account</h1>
          </div>
        </Link>
        <Link href={"/welcome"}>
          <div className={`text-[#cbcbcb] ${textStyle}`}>
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
