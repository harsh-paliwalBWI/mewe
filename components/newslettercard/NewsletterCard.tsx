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
    <div className="  flex flex-row justify-between border-2 border-black p-8  bg-[#f7f9fb]">
      <div className=" w-[40%]  border-2 border-black ">
        <div className="w-full h-auto ">
          <Image
            src={startup}
            alt=""
            width={1000}
            height={1000}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className=" w-[56%]  border-2 border-black ">
        <div className="  flex flex-col h-full justify-between border-2 border-black">
          <div className="  flex flex-col gap-3  justify-between ">
            <h3 className=" text-black text-lg font-semibold">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur
            </h3>
            <div className="opacity-70 text-black text-lg font-normal ">
              Ut enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut al
            </div>
          </div>
          <div className="w-full  bg-[#054A91] rounded-[5px] flex justify-between px-3 py-3">
            <div className="text-white text-sm sm:text-base md:text-lg font-normal">
              Continue Reading
            </div>
            <FlatIcon className="flaticon-left-arrow md:text-xl text-lg text-white rotate-180" />
          </div>
        </div>
      </div>
    </div>
  );
};
// h-48 sm:h-48 md:h-64
export default NewsletterCard;
