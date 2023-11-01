"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import FlatIcon from "../../flatIcon/flatIcon";

const data = ["About", "Explore", "Schemes", "Financials", "Account"];

const Categories = () => {
  const textStyle = "lg:text-base md:text-sm text-xs  md:px-2 ";
  return (
    <div className="w-full bg-[#272726] px-body flex justify-center items-center py-1  sm:py-2 md:py-3 ">
      <div className="flex justify-between gap-0.5 sm:gap-3 md:gap-6  w-full md:w-[80%] lg:w-[50%]  border-2 border-white  ">
        <Link href={"/about-our-company"} className="">
          <div className={`text-[#cbcbcb] ${textStyle}`}>
            <h1 className="md:text-base sm:text-sm text-xs ">About</h1>
          </div>
        </Link>
        <div className={`text-[#cbcbcb] ${textStyle}`}>
          <h1 className="md:text-base sm:text-sm text-xs ">Explore</h1>
        </div>

        <div
          className={`text-[#cbcbcb] flex gap-0.5 sm:gap-1 md:gap-2  ${textStyle} `}
        >
          <h1 className="md:text-base sm:text-sm text-xs">Schemes</h1>
          <FlatIcon className="flaticon-down-arrow md:text-xs text-[10px] font-semibold" />
        </div>
        <Link href={"/financials"}>
          <div
            className={`text-[#cbcbcb] flex gap-0.5 sm:gap-1 md:gap-2 ${textStyle} `}
          >
            <h1 className="md:text-base sm:text-sm text-xs ">Financials</h1>
            <FlatIcon className="flaticon-down-arrow md:text-xs text-[10px] font-semibold" />
          </div>
        </Link>

        <Link href={"/account"}>
          <div className={`text-[#cbcbcb] ${textStyle}`}>
            <h1 className=" md:text-base sm:text-sm text-xs">Account</h1>
          </div>
        </Link>
        <Link href={"/welcome"}>
          <div className={`text-[#cbcbcb] ${textStyle}`}>
            <h1 className="md:text-base sm:text-sm text-xs ">
              Log in / Sign up
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Categories;
