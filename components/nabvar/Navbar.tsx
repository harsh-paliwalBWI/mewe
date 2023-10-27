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
    <div className="flex items-center justify-between px-[4%] py-5 cursor-pointer bg-white w-full">
      <Link href={"/"}>
        <div>
          <Image
            src={logo}
            alt=""
            width={75}
            height={75}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
      </Link>

      <div className="flex justify-between  items-center gap-3 w-[40%] ">
        <div className="flex  items-center gap-1 rounded-full  w-[50%] bg-[#e5eaf1]">
          <div className=" h-full py-2 pl-2 pr-2 text-[#ced3d8] ">
            <FlatIcon className="flaticon-search md:text-lg" />
          </div>

          <input
            className="  outline-0  w-full h-full text-[#ced3d8] bg-[#e5eaf1] rounded-full"
            placeholder="Search"
          />
        </div>

        <div className="flex justify-between items-center cursor-pointer w-[50%]">
          <FlatIcon className="flaticon-facebook md:text-xl text-lg text-[#383838]" />
          <FlatIcon className="flaticon-instagram md:text-xl text-lg text-[#383838]" />
          <FlatIcon className="flaticon-twitter md:text-xl text-lg text-[#383838]" />
      

          <div className="flex gap-2 items-center cursor-pointer ">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={flag}
                alt="Flag"
                width={100}
                height={100}
                layout="responsive"
                className="w-full h-full"
              />
            </div>

            <div className="flex flex-col gap-1 justify-between ">
              <p className="text-[#656564] text-xs ">Language</p>
              <p className="flex text-sm font-semibold gap-1 items-center">English  <span> <FlatIcon className="flaticon-arrow-down md:text-sm text-xs font-semibold" /></span></p>
            </div>
          </div>
        </div>
      </div>
     
    </div>
    <Categories/>
    </div>
  );
};
export default Navbar;
