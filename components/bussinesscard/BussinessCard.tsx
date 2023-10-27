"use client";
import React from "react";

// import CategoryCard from "./categoryCard/CategoryCard";
import img from "../../../images/ME_WE.svg";
import bussinessimg from "../../images/bussinessimg.svg";
import add from "../../images/add (1) 1.svg";
import bird from "../../images/Ellipse 52.svg";
import verify from "../../images/verify 2.svg";
import Image from "next/image";
import FlatIcon from "../flatIcon/flatIcon";

const BussinessCard = () => {
  return (
    <div className="flex flex-col justify-between items-center gap-1 sm:gap-2 md:gap-3  bg-[#f6f9fd] rounded-[5px] ">
      <div className="relative bg-black w-full h-auto flex items-center justify-center  ">
        <Image
          src={bussinessimg}
          alt=""
          width={1000}
          height={1000}
          className="w-full h-full object-contain 
          
                "
        />

        <div className="absolute  top-0 right-0 transform -translate-x-1/2 translate-y-1/2 ">

        <FlatIcon className="flaticon-close md:text-xl text-lg text-black" />
        </div>
        <div className=" bottom-0 md:translate-y-1/2 sm:translate-y-[-30px] translate-y-[-15px] absolute ">
          <Image
            src={bird}
            alt=""
            width={80}
            height={80}
            className="md:w-[100%] md:h-[100%] sm:w-[60px] sm:h-[60px] h-[30px] w-[30px] rounded-full "
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
   <div className="absolute  top-0 right-0 transform ">
<Image
            src={verify}
            alt=""
            width={80}
            height={80}
            className="md:w-[100%] md:h-[100%] sm:w-[60px] sm:h-[60px] h-[30px] w-[30px]   "
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
</div>
        </div>
      </div>

      <div className="flex flex-col  gap-2 sm:gap-3 md:gap-4  border-2 border-black items-center w-full mt-9 mb-3">
        <h2 className="text-base sm:text-lg md:text-xl font-medium text-black ">
          Formonix
        </h2>
        <div className="flex flex-col gap-1.5 sm:gap-2 md:gap-3 items-center">
          <p className="opacity-40 text-black  text-xs sm:text-sm md:text-[15px] font-normal ">
            Health & care Services
          </p>
          <p className="opacity-40 text-black text-[10px] sm:text-xs md:text-sm font-normal ">
            1,29,039 followers
          </p>
        </div>

        <div className=" w-[85%] flex  justify-center  items-center md:gap-3 rounded-full  px-8  py-3 border border-[#a3bad6] ">
          <div className="relative  w-5 h-5 flex items-center justify-center  ">
            <Image
              src={add}
              alt=""
              width={1000}
              height={1000}
              className="w-full h-full object-contain 
          
                "
            />
          </div>

          <h2 className=" text-[#326aa4] text-sm sm:text-base md:text-lg font-semibold ">
            Follow
          </h2>
        </div>
      </div>
    </div>
  );
};

export default BussinessCard;
