"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FlatIcon from "../../flatIcon/flatIcon";
import { usePathname } from "next/navigation";
import { getStartUpData } from "@/services/startupService";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const data = ["About", "Explore", "Schemes", "Financials", "Account"];

const Categories = ({ cookie }: any) => {
  const { data: startUpData } = useQuery({
    queryKey: ["startUpData"],
    queryFn: () => getStartUpData(cookie),
  });
  const pathName = usePathname();
  const textStyle = "lg:text-base md:text-sm text-xs  md:px-2   relative";
  return (
    <div className="w-full bg-[#272726] px-body flex justify-center md:justify-start lg:justify-center items-center py-2 sm:py-3 md:py-4 ">
      <div className="flex justify-center  gap-4 w-full  md:w-[80%] lg:w-full   relative ">
        <Link href={"/about-our-company"} className="">
          <div className={`text-[#cbcbcb] ${textStyle}`}>
            <h1 className=" ">About</h1>
            {pathName.includes("about-our-company") && (
              <div className="w-full h-[2px] bg-[#CBCBCB] "></div>
            )}
          </div>
        </Link>
        <Link href={"/"} className="">
          <div className={`text-[#cbcbcb] ${textStyle} `}>
            <h1 className=" ">Explore</h1>
            {pathName === "/" && (
              <div className="w-full h-[2px] bg-[#CBCBCB] "></div>
            )}
          </div>
        </Link>
        <Link href={"/schemes"} className="relative">
          <div className={`text-[#CBCBCB]  ${textStyle} `}>
            <div className="flex gap-1  lg:gap-2">
              <h1>Schemes</h1>
              <FlatIcon className="flaticon-down-arrow md:text-xs text-[10px] font-semibold" />
            </div>
            {pathName.includes("schemes") && (
              <div className="w-full h-[2px] bg-[#CBCBCB] "></div>
            )}
          </div>
        </Link>
        <Link href={"/financials"} className="relative">
          <div className={`text-[#CBCBCB]  ${textStyle} `}>
            <div className="flex gap-1  lg:gap-2">
              <h1>Financials</h1>
              <FlatIcon className="flaticon-down-arrow md:text-xs text-[10px] font-semibold" />
            </div>
            {pathName.includes("financials") && (
              <div className="w-full h-[2px] bg-[#CBCBCB] "></div>
            )}
          </div>
        </Link>
        <Link
          onClick={(e) => {
            if (!startUpData) {
              e.preventDefault();
              toast.error("Sign in first.");
            }
          }}
          href={{ pathname: "/account", query: { tab: "my-profile" } }}
        >
          <div className={`text-[#CBCBCB] ${textStyle}`}>
            <h1 className=" ">Account</h1>
            {pathName.includes("account") && (
              <div className="w-full h-[2px] bg-[#CBCBCB]"></div>
            )}
          </div>
        </Link>
        <Link href={"/welcome"}>
          <div className={`text-[#CBCBCB] ${textStyle}`}>
            <h1 className=" ">Log in/Sign up</h1>
            {pathName.includes("welcome") && (
              <div className="w-full h-[2px] bg-[#CBCBCB]"></div>
            )}
          </div>
        </Link>
      </div>
      <div className="md:block hidden absolute right-[4%] ">
        <Link href={{ pathname: "/account", query: { tab: "new-post" } }}>
          <div className="  justify-center  items-center rounded sm:rounded-md md:rounded-lg px-1 sm:px-2 md:px-4 lg:px-6 py-0 sm:py-0.5 md:py-1 bg-[#054A91] cursor-pointer">
            <h2 className="text-[10px] sm:text-xs md:text-sm lg:text-base   text-white ">
              Create Post
            </h2>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Categories;
