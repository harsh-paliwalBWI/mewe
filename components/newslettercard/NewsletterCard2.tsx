"use client";
import React,{FC} from "react";

// import CategoryCard from "./categoryCard/CategoryCard";
import img from "../../../images/ME_WE.svg";
import startup from "../../images/startup 1.svg";
import { constant } from "@/utils/constants";

import Image from "next/image";
import FlatIcon from "../flatIcon/flatIcon";
import Link from "next/link";

interface Props{
  scheme:any
  idx:number
}

const NewsletterCard2:FC<Props> = ({scheme,idx}) => {
  // console.log(scheme,"cheme",idx);
  // scheme.image?scheme?.image?.url:constant.errImage
  return (
    <div key={idx} className="  flex flex-col lg:flex-row justify-between gap-0.5 sm:gap-1 md:gap-2  p-3 sm:p-5 md:p-7 bg-[#f7f9fb]">
<div className="w-full lg:w-[33%] overflow-hidden flex justify-center">
        <div className="w-full  lg:w-64 h-36 sm:h-48 md:h-60 lg:h-72 ">
          <Image
            src={scheme.image?scheme?.image?.url:constant.errImage}
            alt=""
            width={1000}
            height={1000}
            className="w-[100%] h-[100%] object-cover  "
          />
 
      </div>   
           </div>
      <div className=" w-full lg:w-[63%]   ">
        <div className="  flex flex-col h-full gap-1 sm:gap-2 md:gap-3 justify-between ">
          <div className="  flex flex-col gap-1 sm:gap-2 md:gap-3  justify-between ">
            <h3 className=" text-black text-sm sm:text-base md:text-lg font-semibold">
              {/* Nemo enim ipsam voluptatem quia voluptas sit aspernatur */}
              {scheme?.name}
            </h3>
            <div 
            dangerouslySetInnerHTML={{__html:scheme.description}}
             className="opacity-70 text-black text-sm sm:text-base md:text-lg font-medium line-clamp-3"/>
              {/* Ut enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut al */}
              {/* {scheme.description} */}
          </div>
          <Link href={`${scheme?.link}`} target="_blank">
          <div className="w-full   bg-[#054A91] rounded-[5px] flex justify-between px-1 sm:px-2 md:px-3 py-1 sm:py-2 md:py-3 cursor-pointer">
            <div className="text-white text-sm sm:text-base md:text-lg font-normal cursor-pointer">
              Continue Reading
            </div>
            <FlatIcon className="flaticon-down-arrow md:text-xl sm:text-lg text-base text-white  -rotate-90" />
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
// h-48 sm:h-48 md:h-64
export default NewsletterCard2;
