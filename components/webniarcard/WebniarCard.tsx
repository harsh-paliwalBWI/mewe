"use client";
import React,{FC} from "react";

// import CategoryCard from "./categoryCard/CategoryCard";
import bg from "../../images/bg.svg";
import man from "../../images/man.svg";

import Image from "next/image";
import FlatIcon from "../flatIcon/flatIcon";
import Link from "next/link";
import { constant } from "@/utils/constants";
interface Props{
  singleWebinar:any
}

const WebniarCard:FC<Props>  = (singleWebinar) => {
  // console.log("singlewebinar",singleWebinar);
  
  let singlewebinardata= singleWebinar.singleWebinar;
  // console.log("singlewebinardata",singlewebinardata);

  return (
    // flex-col lg:
    <Link href={"/webinar"}>

    <div className="  flex flex-row justify-between gap-1 sm:gap-2 md:gap-3 mt-4 sm:mt-8 md:mt-12 bg-[#f2fff3]">
      {/* w-full lg: */}
      <div className="w-[42%]  flex justify-center  ">
        <div className="w-full md:w-60 lg:w-72 h-36 sm:h-44 md:h-52 lg:h-60 relative">
          <div className="absolute bottom-0">
            <Image
              src={bg}
              alt=""
              width={1000}
              height={1000}
              className="w-full h-full object-contain   "
            />
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[85%] xl:h-[275px] md:h-[200px] sm:h-[150px] h-[100px] ">
            <Image
              src={
                singlewebinardata?.image?.url &&
                singlewebinardata?.image?.url?.includes("bwi-mewe.appspot")
                  ?singlewebinardata?.image?.url
                  :constant.errImage
              }
              alt=""
              width={1000}
              height={1000}
              className="w-full h-full object-fill "
            />
          </div>

          <div className="flex  items-center gap-0.5 sm:gap-1 md:gap-1.5 rounded-full   bg-white absolute py-0.5 md:py-1  px-1 md:px-2  bottom-0 left-[-5px] transform translate-x-1/3 -translate-y-1/2">
            <div className="h-1 w-1 sm:h-2 sm:w-2 md:h-3 md:w-3 bg-[#00FF0A] aspect-square rounded-full text-center"></div>

            <p className=" text-black text-[10px] sm:text-xs md:text-sm font-semibold uppercase">
              Live
            </p>
          </div>
        </div>
      </div>
      <div className=" w-full lg:w-[55%]  pt-1 sm:pt-3 md:pt-5 pb-0.5 sm:pb-1 md:pb-2 pr-1 sm:pr-3 md:pr-5 ">
        <div className="  flex flex-col h-full gap-1 sm:gap-2 md:gap-3 justify-between ">
          <div className="  flex flex-col gap-1 sm:gap-2 md:gap-3  justify-between ">
            <div className="flex justify-between gap-1 sm:gap-2 md:gap-3 items-start">
              <h3 className=" text-black text-lg sm:text-xl md:text-[22px] font-semibold">
                {/* How to startup a new businesss{" "} */}
                {singlewebinardata?.title}
              </h3>
              <FlatIcon className="flaticon-bookmark md:text-3xl sm:text-2xl text-xl font-bold " />
            </div>
            <p className="opacity-70 text-black text-[8px] sm:text-[10px] md:text-xs font-normal ">
              {/* Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit, sed qu{" "} */}
              {singlewebinardata?.description}
            </p>
          </div>

          <div className="  flex flex-col gap-1 sm:gap-2 md:gap-3  justify-between ">
            <div className="flex gap-2 sm:gap-3 md:gap-4 cursor-pointer items-center">
              <div>
                <FlatIcon className="flaticon-calander md:text-4xl sm:text-3xl text-2xl font-bold text-[#054a91]  " />
              </div>
              <p className="opacity-80 text-black md:text-base sm:text-sm text-xs font-semibold">
                {/* 02/09/12 */}
                {singlewebinardata?.date}
              </p>
            </div>
            <div className="flex justify-between gap-1 sm:gap-2 md:gap-3 items-center">
              <div className="flex gap-2 sm:gap-3 md:gap-4 cursor-pointer items-center">
                <div>
                  <FlatIcon className="flaticon-clock md:text-4xl sm:text-3xl text-2xl font-bold text-[#054a91] " />
                </div>
                <p className=" opacity-80 text-black md:text-base sm:text-sm text-xs font-semibold">
                 
                  {singlewebinardata?.time}
                 
                </p>
              </div>
              {singlewebinardata?.duration&&
              <p className="opacity-70 text-black text-[8px] sm:text-[10px] md:text-xs font-semibold">
               
                ({singlewebinardata?.duration})
              </p>
}
            </div>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};
// h-48 sm:h-48 md:h-64
export default WebniarCard;
