"use client";
import React from "react";

import img from "../../../images/ME_WE.svg";
import bottomImg from "../../../images/ME_WE.svg";
import Image from "next/image";
import CategoryCard from "@/components/categorycard/CategoryCard";
import WebniarCard from "@/components/webniarcard/WebniarCard";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchWebniars } from "@/services/webniarService";

const Webniar = () => {
  const { data: webinars } = useQuery({
    queryKey: ["webniars"],
    queryFn: () => fetchWebniars(),
  });

  return (
    <div className="px-body flex flex-col gap-6 sm:gap-8 md:gap-10 mt-8 sm:mt-16 md:mt-24 lg:mt-32 pt-5 sm:pt-0">
      <div className="flex justify-between items-center">
        <h1 className="opacity-80 text-black md:text-4xl sm:text-3xl text-2xl font-semibold ">
          Webinar Sessions
        </h1>
        <Link href={"/webniar"}>
          <p className="opacity-80 text-black md:text-xl sm:text-lg text-base font-medium underline underline-offset-2 cursor-pointer">
            View all
          </p>
        </Link>
      </div>
      <div className="grid w-full  xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1   grid-cols-1 gap-y-4  sm:gap-y-6  md:gap-y-8 lg:gap-y-10   gap-x-4  sm:gap-x-6  md:gap-x-8 lg:gap-x-10  ">
        {webinars?.slice(0, 2).map((singlewebinar: any, idx: number) => {
          return <WebniarCard singlewebinar={singlewebinar} />;
        })}
      </div>
    </div>
  );
};

export default Webniar;
