"use client";
import React, { useState } from "react";
import mainImg from "../../images/me we.png";
import Image from "next/image";

import top from "../../images/top-rated 1.svg";
import newimg from "../../images/new 2.svg";
import upcoming from "../../images/check-in 1.svg";
import headerimg from "../../images/Rectangle image.svg";
import FlatIcon from "../flatIcon/flatIcon";
import StartupCard from "../startupcard/StartupCard";
import Searchsidecomponent from "../searchsidecomponent/Searchsidecomponent";

const StartupList = () => {
  return (
    <>
      <div className="h-84 w-full bg-black  ">
        <Image
          src={headerimg}
          alt="image"
          width={1000}
          height={1000}
          layout="responsive"
          className="object-contain w-full h-full opacity-60"
        />
        
      </div>
      <div className="px-body flex md:flex-row flex-col-reverse gap-6 sm:gap-8 md:gap-10 my-4 sm:my-12 md:my-20 justify-between">
        <div className="md:w-[60%] gap-2 sm:gap-4 md:gap-6 flex flex-col ">
          <h3 className="text-black text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4">
            Promoted Startups
          </h3>

          <StartupCard />
          <StartupCard />
          <StartupCard />
          <StartupCard />
        </div>

        <Searchsidecomponent />
      </div>
    </>
  );
};

export default StartupList;
