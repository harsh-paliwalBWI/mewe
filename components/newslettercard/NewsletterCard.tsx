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
import { constant } from "@/utils/constants";

const NewsletterCard = (singleNewsletter: any) => {
  let singleNewsletterdata = singleNewsletter.singleNewsletter;

  return (
    <div className="  flex flex-col lg:flex-row justify-between gap-1 sm:gap-2 md:gap-3  py-3 sm:py-5 md:py-7 px-2 sm:px-4 md:px-6 bg-[#f7f9fb]">
      <div className="w-full lg:w-[41%] overflow-hidden flex justify-center ">
        <div className="w-full  lg:w-64 h-36 sm:h-48 md:h-60 lg:h-[17rem] ">
          <Image
            src={
              singleNewsletterdata?.image?.url
                ? singleNewsletterdata?.image?.url
                : constant.errImage
            }
            alt=""
            width={1000}
            height={1000}
            className="w-full h-full object-contain  "
          />
        </div>
      </div>
      <div className=" w-full lg:w-[56%] ">
        <div className="  flex flex-col h-full gap-1 sm:gap-2 md:gap-3 justify-between ">
          <div className="  flex flex-col gap-1 sm:gap-2 md:gap-3  justify-between ">
            <h3 className=" text-black text-sm sm:text-base md:text-lg font-semibold">
            {singleNewsletterdata?.name}
            </h3>
            <div className="opacity-70 text-black text-sm sm:text-base md:text-lg font-normal ">
            {singleNewsletterdata?.description}
            </div>
          </div>
          <div className="w-full  bg-[#054A91] rounded-[5px] flex justify-between px-1 sm:px-2 md:px-3 py-1 sm:py-2 md:py-3 cursor-pointer">
            <div className="text-white text-sm sm:text-base md:text-lg font-normal ">
              Continue Reading
            </div>
            <FlatIcon className="flaticon-down-arrow md:text-xl sm:text-lg text-base text-white  -rotate-90" />
          </div>
        </div>
      </div>
    </div>
  );
};
// h-48 sm:h-48 md:h-64
export default NewsletterCard;
