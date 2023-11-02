"use client"
import React from "react";
import Image from "next/image";
import invitebannerbg from "../../../images/invite banner-image.svg";

const InviteBanner = () => {
  return (
    <div className="mt-8 sm:mt-16 md:mt-24 lg:mt-32">
      <div className="h-auto w-full relative">
        <Image
          src={invitebannerbg}
          alt="image"
          width={1000}
          height={1000}
          layout="responsive"
          className="object-fill w-full h-full"
        />
        {/* sm:max-w-[65%] md:max-w-[70%] lg:max-w-[75%] 
        
        */}
        <div className=" max-w-[80%]  sm:max-w-[65%]  md:max-w-[55%] lg:max-w-[45%]   absolute w-fit  top-1/3 left-[-55px] sm:left-[-40px] md:left-[-55px] lg:left-[-70px] transform translate-x-1/4 -translate-y-1/3 flex flex-col justify-center gap-0 sm:gap-3 md:gap-6 lg:gap-8 ">
          <h2 className="font-bold text-black text-base sm:text-xl md:text-3xl lg:text-5xl">
            <span className="text-[#054A91]">Invite Users</span> to the
            Community!
          </h2>
          <h2 className="w-[75%] sm:w-[85%] md:w-[95%] text-[10px] sm:text-sm md:text-lg lg:text-2xl opacity-60 text-black font-semibold  ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default InviteBanner;
