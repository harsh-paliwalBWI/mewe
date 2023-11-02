"use client";
import { usePathname } from "next/navigation";
import React from "react";
import logo from "../images/image 14.svg";
import Image from "next/image";
const Loading = () => {
  const pathname = usePathname();
  return (
    <div className={`w-full min-h-[70vh]  flex items-center justify-center `}>
      <div className=" flex-col gap-2 w-[40%] md:w-[20%] h-auto">
        <Image
          src={logo}
          alt=""
          className=" breathing-animation  "
          width={1000}
          height={1000}
          layout="responsive"
        />
      </div>
    </div>
  );
};
export default Loading;