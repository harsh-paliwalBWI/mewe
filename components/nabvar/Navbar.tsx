import Link from "next/link";
import React, { useEffect, useState } from "react";
import logo from "../../images/ME_WE.svg";
import flag from "../../images/united-kingdom 1.svg";
import Image from "next/image";
import FlatIcon from "../flatIcon/flatIcon";
import Categories from "./categoriesnavbar/navCategories";

const Navbar = async () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-[4%] py-5 cursor-pointer bg-white w-full gap-3">
        <Link href={"/"}>
          <div className="  w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 ">
            <Image src={logo} alt="" className="w-full h-full object-contain" />
          </div>
        </Link>

        <div className="flex justify-between  items-center gap-2 md:gap-3 w-full sm:w-[70%] md:w-[55%]  lg:w-[40%] ">
          <div className="flex  items-center gap-0.5 md:gap-1 rounded-full  w-[50%] bg-[#e5eaf1]">
            <div className=" h-full py-1 md:py-2 pl-1.5 md:pl-2 pr-1 md:pr-2 text-[#ced3d8] ">
              <FlatIcon className="flaticon-search text-sm sm:text-base md:text-lg" />
            </div>

            <input
              className="  outline-0  p-1  md:p-2 w-full h-full text-[#ced3d8] bg-[#e5eaf1] rounded-full text-xs sm:text-sm md:text-base"
              placeholder="Search"
            />
          </div>

          <div className="flex justify-between items-center cursor-pointer w-[50%]">
            <FlatIcon className="flaticon-linkedin md:text-xl sm:text-lg text-base text-[#383838]" />
            <FlatIcon className="flaticon-instagram md:text-xl sm:text-lg text-base text-[#383838]" />
            <FlatIcon className="flaticon-twitter md:text-xl  sm:text-lg text-base text-[#383838]" />

            <div className="flex gap-1 md:gap-2 items-center cursor-pointer ">
              <div className="w-6 h-6  sm:w-8 sm:h-8  md:w-10 md:h-10 rounded-full overflow-hidden">
                <Image
                  src={flag}
                  alt="Flag"
                  width={100}
                  height={100}
                  layout="responsive"
                  className="w-full h-full"
                />
              </div>

              <div className="flex flex-col gap-0.5 md:gap-1 justify-between ">
                <p className="text-[#656564] text-[8px] sm:text-[10px] md:text-xs ">
                  Language
                </p>
                <p className="flex text-[10px] sm:text-xs md:text-sm font-semibold gap-0.5 md:gap-1 items-center">
                  English{" "}
                  <span>
                    {" "}
                    <FlatIcon className="flaticon-down-arrow md:text-sm sm:text-xs text-[10px]  font-semibold" />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Categories />
    </div>
  );
};
export default Navbar;
