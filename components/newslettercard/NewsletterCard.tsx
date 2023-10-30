"use client";
import React from "react";

// import CategoryCard from "./categoryCard/CategoryCard";
import img from "../../../images/ME_WE.svg";
import startup from "../../images/startup 1.svg";
import add from "../../images/add (1) 1.svg";
import bird from "../../images/Ellipse 52.svg";
import verify from "../../images/verify 2.svg";
import Image from "next/image";
import FlatIcon from "../flatIcon/flatIcon";

const NewsletterCard = () => {
  return (
    <div className="  flex flex-col lg:flex-row justify-between gap-1 sm:gap-2 md:gap-3  p-3 sm:p-5 md:p-7 bg-[#f7f9fb]">
<div className="w-full lg:w-[41%] overflow-hidden flex justify-center">
        <div className="w-full  lg:w-64 h-36 sm:h-48 md:h-60 lg:h-72 ">
          <Image
            src={startup}
            alt=""
            width={1000}
            height={1000}
            className="w-full h-full object-cover  "
          />
 
      </div>   
           </div>
      <div className=" w-full lg:w-[55%]   ">
        <div className="  flex flex-col h-full gap-1 sm:gap-2 md:gap-3 justify-between ">
          <div className="  flex flex-col gap-1 sm:gap-2 md:gap-3  justify-between ">
            <h3 className=" text-black text-sm sm:text-base md:text-lg font-semibold">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur
            </h3>
            <div className="opacity-70 text-black text-sm sm:text-base md:text-lg font-normal ">
              Ut enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut al
            </div>
          </div>
          <div className="w-full  bg-[#054A91] rounded-[5px] flex justify-between px-1 sm:px-2 md:px-3 py-1 sm:py-2 md:py-3">
            <div className="text-white text-sm sm:text-base md:text-lg font-normal cursor-pointer">
              Continue Reading
            </div>
            <FlatIcon className="flaticon-arrow-right md:text-xl sm:text-lg text-base text-white " />
          </div>
        </div>
      </div>
    </div>
  );
};
// h-48 sm:h-48 md:h-64
export default NewsletterCard;
