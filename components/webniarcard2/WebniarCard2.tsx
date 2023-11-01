"use client";
import React from "react";

// import CategoryCard from "./categoryCard/CategoryCard";
import bg from "../../images/bg.svg";
import man from "../../images/man.svg";

import Image from "next/image";
import FlatIcon from "../flatIcon/flatIcon";

const WebniarCard2 = () => {
  return (
    // flex-col lg:
    <div className="  flex flex-row justify-between gap-1 sm:gap-2 md:gap-3 mt-12 sm:mt-16 md:mt-20 bg-[#f2fff3] rounded-lg w-full">
      {/* w-full lg: */}
      <div className="w-[35%]  flex justify-center ">
        <div className="w-full md:w-60 lg:w-72 h-36 sm:h-44 md:h-52 lg:h-60 relative  ">
          <div className="absolute bottom-0">
            <Image
              src={bg}
              alt=""
              width={1000}
              height={1000}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[85%]  ">
            <Image
              src={man}
              alt=""
              width={1000}
              height={1000}
              className="w-full h-full object-contain  "
            />
          </div>

          <div className="flex  items-center gap-0.5 sm:gap-1 md:gap-1.5 rounded-full   bg-white absolute py-0.5 md:py-1  px-1 md:px-2  bottom-0 left-[-5px] transform translate-x-1/3 -translate-y-1/2 ">
            <div className="h-1 w-1 sm:h-2 sm:w-2 md:h-3 md:w-3 bg-[#00FF0A] aspect-square rounded-full text-center"></div>

            <p className=" text-black text-[10px] sm:text-xs md:text-sm font-semibold uppercase">
              Live
            </p>
          </div>
        </div>
      </div>
      <div className=" w-[63%]  pt-1 sm:pt-3 md:pt-5 pb-0.5 sm:pb-1 md:pb-2 pr-1 sm:pr-3 md:pr-5 ">
        <div className="  flex flex-col h-full gap-1 sm:gap-2.5 md:gap-4 justify-between ">
          <div className="  flex flex-col gap-1 sm:gap-2 md:gap-3  justify-between ">
            <div className="flex justify-between gap-1 sm:gap-2 md:gap-3 items-start">
              <h3 className=" text-black text-lg sm:text-xl md:text-[22px] font-semibold">
                How to startup a new businesss
              </h3>
              <FlatIcon className="flaticon-bookmark md:text-3xl sm:text-2xl text-xl font-bold " />
            </div>
            <h3 className="opacity-80 text-black text-xs sm:text-sm md:text-lg font-bold">
              By Jane cooper
            </h3>
            <p className=" opacity-40 text-black text-[10px] sm:text-xs md:text-sm font-semibold w-[80] ">
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit, sed qu
            </p>
          </div>

          <div className="flex justify-between items-center gap-1 sm:gap-2 md:gap-3">
            <div className="  flex flex-col gap-0.5 sm:gap-1 md:gap-2  justify-between ">
              <div className="flex gap-1 sm:gap-2 md:gap-3 cursor-pointer items-center">
                <div>
                  <FlatIcon className="flaticon-calander md:text-3xl sm:text-2xl text-xl font-bold text-[#054a91]  " />
                </div>
                <p className="opacity-80 text-black md:text-base sm:text-sm text-xs font-semibold">
                  02/09/12
                </p>
              </div>
              <div className="flex justify-between gap-1 sm:gap-2 md:gap-3 items-center">
                <div className="flex gap-1 sm:gap-2 md:gap-3 cursor-pointer items-center">
                  <div>
                    <FlatIcon className="flaticon-clock md:text-3xl sm:text-2xl text-xl font-bold text-[#054a91] " />
                  </div>
                  <p className=" opacity-80 text-black md:text-base sm:text-sm text-xs font-semibold ">
                    09:21:37 IST{" "}
                    <span
                      className="opacity-90 text-black text-[8px] sm:text-[10px] md:text-xs font-semibold ml-0
                  sm:ml-1 md:ml-2"
                    >
                      (45mins)
                    </span>
                  </p>
                </div>
              </div>
            </div>
            {/* px-1 sm:px-6 md:px-11 lg:px-16  */}
            <div
              className=" w-[45%] md:w-[41%] h-fit flex  justify-center  items-center  rounded-lg     
            py-0.5 sm:py-1 md:py-2 lg:py-3 border-2  bg-[#054a91] cursor-pointer"
            >
              <h2 className=" text-white text-xs sm:text-sm md:text-base lg:text-lg font-medium ">
                Book Now
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// h-48 sm:h-48 md:h-64
export default WebniarCard2;
