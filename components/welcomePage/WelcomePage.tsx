"use client";
import React, { useState } from "react";
import mainImg from "../../images/me we.png";
import Image from "next/image";
import falgImg from "../../images/Group 34168.svg";
import googleImg from "../../images/google.svg";
import linkedIn from "../../images/Group.svg";
import appleImg from "../../images/Group 34165.svg";
import Link from "next/link";

const WelcomePage = () => {
  return (
    <>
      <div className="flex py-6 justify-center items-center  md:h-[100vh] h-auto">
        <div className="w-[50%] md:block hidden  h-[100%] pl-6 ">
          <Image
            src={mainImg}
            alt=""
            height={1000}
            width={1000}
            className=" w-[100%] h-[100%] object-fill"
          />
        </div>
        <div className="md:w-[45%] sm:w-[70%] w-[100%]  xl:px-20 md:px-10 px-5 md:mt-0 mt-16 ">
          <div className="flex justify-center items-center lg:text-4xl sm:text-2xl text-xl font-bold  ">
            <h1>
              {" "}
              Welcome <span className="font-semibold">to</span>{" "}
              <span className="text-primary font-bold">MEWE</span>
            </h1>
          </div>
          <div className="flex justify-center items-center text-center text-[#666666] font-medium xl:text-lg lg:text-base sm:text-sm text-xs mt-6  ">
            <h4>
              Full | Mischievous dramedy featuring accordion,
              <br /> tuba & pizzicato violin
            </h4>
          </div>
          <div className="flex flex-col gap-5 my-12">
            <Link href={"/signup"}>
              <div className=" border border-primary text-primary flex justify-center items-center py-3 rounded-full lg:text-lg sm:text-base text-xs font-semibold w-[85%] mx-auto cursor-pointer">
                <button className="">Log In</button>
              </div>
            </Link>
            <Link href={"/signup"}>
              <div className="bg-primary text-white flex justify-center items-center py-3 rounded-full lg:text-lg sm:text-base text-xs font-semibold w-[85%] mx-auto cursor-pointer ">
                <button className="">Sign Up</button>
              </div>
            </Link>
          </div>
          <div className="text-center lg:text-lg sm:text-base text-sm text-[#383838] font-medium  mb-8">
            <h2>or Sign In with</h2>
          </div>
          <div className="flex items-center justify-center gap-x-6">
            <div className="sm:h-[55px] sm:w-[55px] h-[45px] w-[45px] cursor-pointer">
              <Image
                src={googleImg}
                alt=""
                height={1000}
                width={1000}
                className="h-full w-full object-fill"
              />
            </div>
            <div className="sm:h-[55px] sm:w-[55px] h-[45px] w-[45px] cursor-pointer">
              <Image
                src={appleImg}
                alt=""
                className="h-full w-full object-fill"
              />
            </div>
            <div className="sm:h-[55px] sm:w-[55px] h-[45px] w-[45px] cursor-pointer">
              <Image
                src={linkedIn}
                alt=""
                className="h-full w-full object-fill"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
