"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FlatIcon from "../../flatIcon/flatIcon";
import { usePathname } from "next/navigation";

const data = ["About", "Explore", "Schemes", "Financials", "Account"];

const Categories = () => {
  const pathName = usePathname();
  const textStyle = "lg:text-base md:text-sm text-xs  md:px-2   relative"
  return (
    <div className="w-full bg-[#272726] px-body flex justify-center items-center py-2 sm:py-3 md:py-4 ">
      <div className="flex justify-center lg:gap-10 md:gap-4 gap-3  w-[100%]    ">
        <Link href={"/about-our-company"} className="">
          <div className={`text-[#cbcbcb] ${textStyle}`}>
            <h1 className=" ">About</h1>
            {pathName.includes("about-our-company") &&
              <div className="w-full h-[2px] bg-[#CBCBCB] "></div>
            }
          </div>
        </Link>
        <Link href={"/"} className="">
          <div className={`text-[#cbcbcb] ${textStyle} `}>
            <h1 className=" ">Explore</h1>
            {pathName === "/" &&
              <div className="w-full h-[2px] bg-[#CBCBCB] "></div>
            }
          </div>
        </Link>
        <Link href={"/schemes"} className="relative">
          <div className={`text-[#CBCBCB]  ${textStyle} `}>
            <div className="flex gap-2">
              <h1 >Schemes</h1>
              <FlatIcon className="flaticon-down-arrow md:text-xs text-[10px] font-semibold" />
            </div>
            {pathName.includes("schemes") &&
              <div className="w-full h-[2px] bg-[#CBCBCB] "></div>
            }
          </div>
        </Link>
        <Link href={"/financials"} className="relative">
          <div className={`text-[#CBCBCB]  ${textStyle} `}>
            <div className="flex gap-2">
              <h1 >Financials</h1>
              <FlatIcon className="flaticon-down-arrow md:text-xs text-[10px] font-semibold" />
            </div>
            {pathName.includes("financials") &&
              <div className="w-full h-[2px] bg-[#CBCBCB] "></div>
            }
          </div>
        </Link>
        <Link href={{pathname: '/account', query: { tab: 'my-profile' },}}>
          <div className={`text-[#CBCBCB] ${textStyle}`}>
            <h1 className=" ">Account</h1>
            {pathName.includes("account") &&
              <div className="w-full h-[2px] bg-[#CBCBCB]"></div>
            }
          </div>
        </Link>
        <Link href={"/welcome"}>
          <div className={`text-[#CBCBCB] ${textStyle}`}>
            <h1 className=" ">
              Log in / Sign up
            </h1>
            {pathName.includes("welcome") &&
              <div className="w-full h-[2px] bg-[#CBCBCB]"></div>
            }
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Categories;



