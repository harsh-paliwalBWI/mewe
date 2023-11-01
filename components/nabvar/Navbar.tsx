"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import logo from "../../images/image 14.svg";
import flag from "../../images/united-kingdom 1.svg";
import Image from "next/image";
import FlatIcon from "../flatIcon/flatIcon";
import Categories from "./categoriesnavbar/navCategories";
import { usePathname } from "next/navigation";
import Navmobile from "../navMobile/NavMobile";


const Navbar =  () => {
  const pathName=usePathname()
  return (
    <>
    <Navmobile/>
    <>
    <div className={`w-full sm:block hidden ${(pathName.includes("welcome") || pathName.includes("signup") || pathName.includes("signin") || pathName.includes("verification"))?"hidden":"block"}`}>
      <div className="flex items-center justify-between px-[4%] py-5 cursor-pointer bg-white w-full gap-3">
        <Link href={"/"}>
          <div className="border border-primary p-[1px] rounded-lg">
          <div className=" w-[56px] h-[56px]  ">
            <Image src={logo} alt="" className="w-full h-full object-contain " />
          </div>
          </div>
        </Link>
        <div className="flex justify-between  items-center gap-3 md:gap-5 w-full sm:w-[70%] md:w-[55%]  lg:w-[40%] ">
          <div className="flex px-3  items-center gap-0.5 md:gap-1 rounded-full  w-[50%] bg-[#e5eaf1] header-search-conatiner ">
            <div className=" h-full  text-[#ced3d8] ">
              <FlatIcon className="flaticon-search text-sm sm:text-base md:text-xl font-semibold" />
            </div>
            <input
            type="text"
              className="  outline-0    py-2 px-1  w-full h-full text-[#ced3d8] bg-[#e5eaf1] rounded-full text-xs sm:text-sm md:text-base"
              placeholder="Search"
            />
          </div>
          <div className="flex justify-between gap-2 md:gap-0 items-center cursor-pointer w-[50%] ">
            <FlatIcon className="flaticon-linkedin md:text-2xl sm:text-lg text-base text-[#383838]" />
            <FlatIcon className="flaticon-instagram md:text-2xl sm:text-lg text-base text-[#383838]" />
            <FlatIcon className="flaticon-twitter md:text-2xl  sm:text-lg text-base text-[#383838]" />
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
                    <FlatIcon className="flaticon-down-arrow md:text-sm sm:text-xs text-[10px]  font-bold" />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Categories />
    </div>
    </>
    </>
  );
};
export default Navbar;
