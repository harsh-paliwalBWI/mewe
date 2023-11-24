"use client";
import React from "react";

// import CategoryCard from "./categoryCard/CategoryCard";
import img from "../../../images/ME_WE.svg";
import bottomImg from "../../../images/ME_WE.svg";
import Image from "next/image";
import CategoryCard from "@/components/categorycard/CategoryCard";
import BussinessCard from "@/components/bussinesscard/BussinessCard";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchAllStartUps } from "@/services/homeService";
import { log } from "console";


const Bussiness = () => {
  const { data:allStartUpsData } = useQuery({
    queryKey: ["allStartUpsData"],
    queryFn: () => fetchAllStartUps(),
});
// console.log("allStartUpsData-------",allStartUpsData);
// console.log(allStartUpsData.slice(0,4),"----------");



  return (
    <div className="px-body flex flex-col gap-6 sm:gap-8 md:gap-10 mt-8 sm:mt-16 md:mt-24 lg:mt-32">
      <div className="flex justify-between items-center">
        <h1 className="opacity-80 text-black md:text-4xl sm:text-3xl text-2xl font-semibold ">
        Promoted Businesses
        </h1>
        <Link href={"/startup-listing"}>
        <p className="opacity-80 text-black md:text-xl sm:text-lg text-base font-medium underline underline-offset-2 cursor-pointer">
          View all
        </p>
        </Link>
      </div>
      <div className="grid w-full  xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2   grid-cols-2 gap-y-6  sm:gap-y-8  md:gap-y-10 lg:gap-y-12   gap-x-6  sm:gap-x-8  md:gap-x-10 lg:gap-x-12  ">
      
      {
        allStartUpsData&&allStartUpsData.length>0&&allStartUpsData.slice(0,4).map((startUp:any,idx:number)=>{
          return <div key={idx}>
            <BussinessCard startup={startUp}/>
          </div>
        })
      }
        {/* <BussinessCard />
        <BussinessCard />
        <BussinessCard />
        <BussinessCard /> */}
      
       
      </div>
    </div>
  );
};

export default Bussiness;
