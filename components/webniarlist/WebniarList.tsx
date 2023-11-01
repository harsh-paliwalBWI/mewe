"use client";
import React, { useState } from "react";
import mainImg from "../../images/me we.png";
import Image from "next/image";
import webheaderimg from "../../images/webinar banner.svg";
import StartupCard from "../startupcard/StartupCard";
import Searchsidecomponent from "../searchsidecomponent/Searchsidecomponent";
import WebniarCard2 from "../webniarcard2/WebniarCard2";

const WebniarList = () => {
  return (
    <>
      <div className="h-84 w-full bg-black  ">
        <Image
          src={webheaderimg}
          alt="image"
          width={1000}
          height={1000}
          layout="responsive"
          className="object-contain w-full h-full opacity-60"
        />
        
      </div>
      <div className="px-body flex md:flex-row flex-col-reverse gap-6 sm:gap-8 md:gap-10 my-4 sm:my-12 md:my-20 justify-between">
        <div className="md:w-[60%] gap-2 sm:gap-4 md:gap-6 flex flex-col ">
          <h3 className="text-black text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4">
          Upcoming Webinar Sessions
          </h3>

          <WebniarCard2 />
          <WebniarCard2 />
     
        </div>

        <Searchsidecomponent />
      </div>
    </>
  );
};

export default WebniarList;
