"use client";
import React, { useState } from "react";
import mainImg from "../../images/me we.png";
import Image from "next/image";
import headerimg from "../../images/Rectangle image.svg";
import bussinessimg from "../../images/bussinessimg.svg";
import add from "../../images/add (1) 1.svg";
import bird from "../../images/Ellipse 52.svg";
import verify from "../../images/verify 2.svg";
import FlatIcon from "../flatIcon/flatIcon";

const StartupCard = () => {
  return (
    <>
      

{/* flex-col md: */}
          <div className="  flex flex-row justify-between items-center gap-1 sm:gap-2 md:gap-3  p-1 sm:p-2.5 md:p-4 bg-[#f7f9fb]">
            <div className="w-[75%] gap-2 sm:gap-5 md:gap-8 flex ">
              <div className="w-20 h-20 sm:w-24 sm:h-24  md:w-28 md:h-28 bottom-0  relative">
                <Image
                  src={bird}
                  alt=""
                  className=" rounded-full w-full h-full object-contain"
                />
                
                <div className="absolute w-6 h-6 sm:w-8 sm:h-8  md:w-10 md:h-10 top-[5px] right-0 transform -translate-y-1/3">
                  <Image
                    src={verify}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-0.5 sm:gap-1.5 md:gap-3">
                <div className="text-black text-base sm:text-lg md:text-xl font-bold ">Formonix</div>
                <div className="flex flex-col ">
                  <div className="opacity-40 text-black text-sm sm:text-base md:text-lg font-semibold">
                    Health & care Services
                  </div>
                  <div className="opacity-40 text-black text-[10px] sm:text-sm md:text-lg font-semibold">
                    1,29,039 followers
                  </div>
                </div>
              </div>
            </div>

            <div className="w-fit ">
              <div className=" w-full flex  justify-center  items-center gap-0.5 sm:gap-1 md:gap-2 rounded-full px-2 sm:px-5 md:px-8 py-0 sm:py-1.5 md:py-3 border-2  border-[#326aa4] cursor-pointer">
                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ">
                  <Image
                    src={add}
                    alt=""
                    className="w-full h-full object-contain" 
          
                  />
                </div>

                <h2 className=" text-[#326aa4] text-sm sm:text-base md:text-lg font-semibold ">
                  Follow
                </h2>
              </div>
            </div>
          </div>

    </>
  );
};

export default StartupCard;
