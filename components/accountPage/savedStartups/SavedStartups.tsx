"use client"
import React from 'react'
import { getCookie } from "cookies-next";
import { useQuery } from '@tanstack/react-query';
import { fetchSavedStartUps } from '@/services/startupService';
import BussinessCard from '@/components/bussinesscard/BussinessCard';
import Loading from '@/app/loading';
import SavedStartUpCard from '@/components/savedStarupCard/SavedStartUpCard';

const SavedStartups = () => {
    const cookies = { value: getCookie("uid") };

    const { data: savedStartUpsData,isLoading } = useQuery({
        queryKey: ["savedStartUpsData"],
        queryFn: () => fetchSavedStartUps(cookies),
    });
    console.log("savedStartUpsData", savedStartUpsData);

  return (
    <div className='md:w-[70%] w-[100%] '>
      <h1 className='text-primary font-bold xl:text-xl sm:text-xl text-lg mb-10 '>My Startups</h1>
      {
        savedStartUpsData&&savedStartUpsData.length>0?
        (
          <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 xl:gap-x-8 gap-x-6 xl:gap-y-8 gap-y-6 w-[100%]'>
          {savedStartUpsData&&savedStartUpsData.length>0&&savedStartUpsData.map((item:any,idx:number)=>{
            return <div key={idx}>
              <SavedStartUpCard startup={item}/>
              {/* <BussinessCard startup={item}/> */}
            </div>
          })}
          </div>
        )
        :
        isLoading ? (
          <div className="">
            {/* <h1 className="sm:text-2xl text-xl font-semibold md:mt-10 mt-5 sm:mx-0 mx-5">
              MY WISHLIST
            </h1> */}
            <Loading />
          </div>
        ):
        (
          <div className="md:text-xl text-base text-center w-[100%] h-full flex items-center justify-center text-primary ">
              <h1>No saved startups yet !</h1></div>
        )
      }
    </div>
  )
}

export default SavedStartups