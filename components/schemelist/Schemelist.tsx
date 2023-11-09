"use client";
import React, { useState } from "react";
import mainImg from "../../images/me we.png";
import Image from "next/image";
import govt from "../../images/govt of india.svg";
import { fetchSchemes } from "@/services/schemesService";
import {useQuery} from "@tanstack/react-query"
import {constant} from "../../utils/constants"


import Searchsidecomponent from "../searchsidecomponent/Searchsidecomponent";

import NewsletterCard2 from "../newslettercard/NewsletterCard2";
// import { log } from "console";

const SchemeList = () => {
  const { data: schemes, isLoading } = useQuery({
    queryKey: ["schemes"],
    queryFn: () => fetchSchemes(),
  });
  // const data=fetchSchemes()
  // console.log("hjgh");
  console.log(schemes,"fgffh");
  
  return (
    <>
      <div className="px-body flex md:flex-row flex-col-reverse gap-6 sm:gap-8 md:gap-10 my-4 sm:my-12 md:my-20 justify-between">
        <div className="md:w-[60%] gap-4 sm:gap-6 md:gap-8 flex flex-col ">
          <div className=" flex items-end  gap-1 sm:gap-4 md:gap-7 w-full mb-4 sm:mb-10 md:mb-16" >
            <div className="w-20 h-20 sm:w-28 sm:h-28  md:w-36 md:h-36  rounded-full  overflow-hidden ">
              <Image
                src={govt}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-0.5 sm:gap-1 md:gap-2  w-[70%] lg:w-[75%] ">
              <h2 className="text-black text-xs sm:text-base md:text-xl font-bold ">
                Government Schemes
              </h2>
              <p className=" opacity-60 text-black text-xs sm:text-base md:text-xl font-medium ">
                Ut enim ad minima veniam, quis nostrum exercitationem ullam
                corporis suscipit laboriosam, nisi ut al
              </p>
            </div>
          </div>
{
  schemes&&schemes.length>0&&schemes.map((scheme:any,idx:number)=>{
    console.log(idx,"idx");
    
    return <NewsletterCard2 scheme={scheme} idx={idx}/>
  })
}
          {/* <NewsletterCard2 />
          <NewsletterCard2 /> */}
        </div>

        <Searchsidecomponent />
      </div>
    </>
  );
};

export default SchemeList;
