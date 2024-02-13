"use client"
import { fetchAllWebinars } from '@/services/homeService';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import Link from 'next/link';
import WebniarCard from '../webniarcard/WebniarCard';

const AllWebinarsPage = () => {
    const { data: webinarsData } = useQuery({
        queryKey: ["webinarsData"],
        queryFn: () => fetchAllWebinars
        
        (),
        // keepPreviousData: true
      });
      // console.log("webinarsData",webinarsData);
  return (
<div className="px-body flex flex-col gap-4 sm:gap-0 xl:gap-10  sm:mt-8 md:mt-8 xl:mt-12 pt-5 sm:pt-0 xl:mb-32 md:mb-16 mb-8">
      <div className="flex justify-between items-center sm:mb-0 mb-0 ">
        <h1 className="opacity-80 text-black md:text-4xl sm:text-2xl text-2xl font-semibold  ">
          Webinar Sessions
        </h1>
       
      </div>
      <div className="grid w-full  xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1   grid-cols-1 gap-y-4  sm:gap-y-0  md:gap-y-0 xl:gap-y-12   gap-x-4  sm:gap-x-6  md:gap-x-8 lg:gap-x-10  ">
        {webinarsData&&webinarsData.length>0&&webinarsData?.filter((webinar:any) => webinar?.active).map((webinar: any, idx: number) => {
          // console.log("singlewebinar",webinar,idx);
          return <div key={idx}>
            {/* {webinar?.active && ( <WebniarCard singleWebinar={webinar} />)} */}
            <WebniarCard singleWebinar={webinar} />
          </div>
        })}
      </div>
    </div>
  )
}

export default AllWebinarsPage