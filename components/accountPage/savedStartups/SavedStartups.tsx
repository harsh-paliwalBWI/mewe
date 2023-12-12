"use client"
import React from 'react'
import { getCookie } from "cookies-next";
import { useQuery } from '@tanstack/react-query';
import { fetchSavedStartUps } from '@/services/startupService';
import BussinessCard from '@/components/bussinesscard/BussinessCard';
import Loading from '@/app/loading';
import SavedStartUpCard from '@/components/savedStarupCard/SavedStartUpCard';
import { usePathname } from 'next/navigation';
import FlatIcon from '@/components/flatIcon/flatIcon';
import { useRouter } from 'next/navigation';

const SavedStartups = () => {
  const cookies = { value: getCookie("uid") };
  const pathName = usePathname()
  const router = useRouter()
  const { data: savedStartUpsData, isLoading } = useQuery({
    queryKey: ["savedStartUpsData"],
    queryFn: () => fetchSavedStartUps(cookies),
  });
  // console.log("savedStartUpsData", savedStartUpsData);

  return (
    <div className={` ${pathName.includes("saved-startups") ? "block  w-[100%] sm:mt-5 md:mt-5 md:mb-24 mb-5" : "sm:block hidden md:w-[70%] w-[100%]"}`}>
      {
        pathName.includes("saved-startups") && <div
          onClick={() => {
            router.replace("/account?tab=my-profile")
          }}
          className='mb-2'><FlatIcon className="flaticon-arrow-right rotate-180 text-2xl font-bold" /></div>
      }
      <h1 className='text-primary font-bold xl:text-xl sm:text-xl text-lg md:mb-10 mb-5'>My Startups</h1>
      {
        savedStartUpsData && savedStartUpsData.length > 0 ?
          (
            <div className={`grid  xl:gap-x-8 gap-x-6 xl:gap-y-8 gap-y-6 w-[100%] ${pathName.includes("saved-startups") ? "lg:grid-cols-4 md:grid-cols-3 grid-cols-2" : "lg:grid-cols-3 md:grid-cols-2 grid-cols-2"}`}>
              {savedStartUpsData && savedStartUpsData.length > 0 && savedStartUpsData.map((item: any, idx: number) => {
                return <div key={idx}>
                  <SavedStartUpCard startup={item} />
                </div>
              })}
            </div>
          )
          :
          isLoading ? (
            <div className="">

              <Loading />
            </div>
          ) :
            (
              <div className="md:text-xl text-base text-center w-[100%] h-full flex items-center justify-center text-primary ">
                <h1>No saved startups yet !</h1></div>
            )
      }
    </div>
  )
}

export default SavedStartups