"use client";
import React, { useState } from "react";
import mainImg from "../../images/me we.png";
import Image from "next/image";
import webheaderimg from "../../images/webinar banner.svg";

import Searchsidecomponent from "../searchsidecomponent/Searchsidecomponent";
import WebniarCard2 from "../webniarcard2/WebniarCard2";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchWebniars } from "@/services/webniarService";
import { fetchAllWebinars } from "@/services/homeService";

const WebniarList = () => {

  // const { data: webinars } = useQuery({
  //   queryKey: ["webniars"],
  //   queryFn: () => fetchWebniars(),
  // });

  const { data: webinarsData } = useQuery({
    queryKey: ["webinarsData"],
    queryFn: () => fetchAllWebinars(),
    // keepPreviousData: true
  });
  // console.log(webinars,"PPPP")

  return (
    <>
      <div className="h-84 w-full bg-black  ">
        <Image
          src={webheaderimg}
          alt="image"
          width={1000}
          height={1000}
          layout="responsive"
          className="object-contain w-full h-full opacity-60"
        />
      </div>
      <div className="px-body flex md:flex-row flex-col-reverse gap-6 sm:gap-8 md:gap-10 my-6 sm:my-12 md:my-16 justify-between">
        <div className="md:w-[60%] gap-6 sm:gap-12 md:gap-8 lg:gap-16 flex flex-col xl:mb-16 md:mb-8 mb-4 ">
          <h3 className="text-black text-lg sm:text-lg md:text-2xl font-bold  sm:mb-3 xl:mb-10">
            Upcoming Webinar Sessions
          </h3>
          <div className="flex flex-col  xl:gap-28 lg:gap-16 md:gap-12 sm:gap-16 gap-8 ">
            {webinarsData && webinarsData.length > 0 && webinarsData?.filter((webinar: any) => webinar?.active).map((singlewebinar: any, idx: number) => {
              return <div key={idx}>
                <WebniarCard2 singlewebinar={singlewebinar} idx={idx} />
              </div>
            })
            }
          </div>
        </div>
        <Searchsidecomponent />
      </div>
    </>
  )
};

export default WebniarList;
