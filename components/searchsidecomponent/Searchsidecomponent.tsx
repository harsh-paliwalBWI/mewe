"use client";
import React, { useState } from "react";
import mainImg from "../../images/me we.png";
import Image from "next/image";

import top from "../../images/top-rated 1.svg";
import newimg from "../../images/new 2.svg";
import upcoming from "../../images/check-in 1.svg";
import FlatIcon from "../flatIcon/flatIcon";
import StartupCard from "../startupcard/StartupCard";

const Searchsidecomponent = () => {
  return (
    <>
      <div className="w-full md:w-[35%] gap-2 sm:gap-4 md:gap-6 flex flex-col  ">
        <div className="flex  items-center gap-1 rounded-full  w-full bg-[#e7ecf4] px-1 sm:px-2 md:px-3 ">
          <div className=" h-full  py-1 sm:py-2 md:py-3 pl-2 pr-2 text-[#5d5f63] ">
            <FlatIcon className="flaticon-search text-sm sm:text-base md:text-lg" />
          </div>

          <input
            className=" outline-none  py-2 sm:py-2.5 md:py-3 w-full h-full text-[#5d5f63] bg-[#e7ecf4] rounded-full text-xs sm:text-sm md:text-base"
            placeholder="Search"
          />
          <div className=" h-full  py-1 sm:py-2 md:py-3 pl-2 pr-2 text-[#5d5f63] ">
            <FlatIcon className="flaticon-setting text-base sm:text-lg md:text-xl" />
          </div>
        </div>

        <h3 className="opacity-80 text-black md:text-base sm:text-sm text-xs font-bold ">
          Recent Searches
        </h3>

        <div className="flex flex-col gap-1 sm:gap-2 md:gap-3">
          <div className="flex justify-between gap-1 sm:gap-2 md:gap-3">
            <p className="opacity-60 text-black md:text-base sm:text-sm text-xs font-semibold ">
              Wade Warren
            </p>
            <FlatIcon className="flaticon-close  md:text-base sm:text-sm text-xs text-black  cursor-pointer" />
          </div>
          <div className="flex justify-between gap-1 sm:gap-2 md:gap-3">
            <p className="opacity-60 text-black md:text-base sm:text-sm text-xs font-semibold ">
              August webinars
            </p>
            <FlatIcon className="flaticon-close  md:text-base sm:text-sm text-xs text-black  cursor-pointer" />
          </div>
        </div>

        <h3 className="opacity-80 text-black md:text-base sm:text-sm text-xs font-bold ">
          Popular Search
        </h3>

        <div className="flex gap-1 sm:gap-2 md:gap-3 flex-wrap">
          <div className=" w-fit flex  justify-center  items-center gap-0.5 sm:gap-1 md:gap-2 rounded-full px-2 sm:px-3 md:px-5 py-0.5 sm:py-1 md:py-2 bg-[#fef8e7] cursor-pointer">
            <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ">
              <Image
                src={top}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>

            <h2 className=" text-[10px] sm:text-xs md:text-sm font-semibold ">
              Top Listed
            </h2>
          </div>

          <div className=" w-fit flex  justify-center  items-center gap-0.5 sm:gap-1 md:gap-2 rounded-full px-2 sm:px-3 md:px-5 py-0.5 sm:py-1 md:py-2 bg-[#fceeef] cursor-pointer">
            <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ">
              <Image
                src={newimg}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>

            <h2 className=" text-[10px] sm:text-xs md:text-sm font-semibold ">
              New
            </h2>
          </div>

          <div className=" w-fit flex  justify-center  items-center gap-0.5 sm:gap-1 md:gap-2 rounded-full px-2 sm:px-3 md:px-5 py-0.5 sm:py-1 md:py-2 bg-[#f8f1ee] cursor-pointer">
            <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ">
              <Image
                src={upcoming}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>

            <h2 className=" text-[10px] sm:text-xs md:text-sm font-semibold ">
              Upcoming
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Searchsidecomponent;
