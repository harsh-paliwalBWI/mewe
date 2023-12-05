"use client"
import { fetchAllMatchedCategoriesStartups } from '@/services/homeService';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import BussinessCard from '../bussinesscard/BussinessCard';
import Loading from '@/app/loading';

const MatchedCategories = (params: any) => {
  // console.log("params from compo",params);

  const { data: matchedCategoriesStartupsData, isLoading } = useQuery({
    queryKey: ["matchedCategoriesStartupsData"],
    queryFn: () => fetchAllMatchedCategoriesStartups(params),
    // keepPreviousData: true
  });
  // console.log("categoriesData",matchedCategoriesStartupsData); 

  return (
    <div className='px-body'>
      {matchedCategoriesStartupsData && matchedCategoriesStartupsData.length > 0 ?
        (<div className='md:pb-20 pb-10'>
          <h1 className="opacity-80 text-black md:text-4xl sm:text-2xl text-xl font-semibold md:my-10 my-5 ">
            Promoted Businesses
          </h1>
          <div className="grid w-full  xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2   grid-cols-2 gap-y-4  sm:gap-y-6  md:gap-y-10 lg:gap-y-12   gap-x-4  sm:gap-x-6  md:gap-x-10 lg:gap-x-12  ">
            {matchedCategoriesStartupsData && matchedCategoriesStartupsData.length > 0 && matchedCategoriesStartupsData.map((startUp: any, idx: number) => {
              return <div>
                <BussinessCard startup={startUp} />
              </div>
            })}
          </div>
        </div>
        )
        : isLoading ? (
          <div className="px-body">
            <h1 className="opacity-80 text-black md:text-4xl sm:text-3xl text-2xl font-semibold my-10 ">
              Promoted Businesses
            </h1>
            <Loading />
          </div>
        ) : (
          <div className="px-body">
            {/* <h1 className="opacity-80 text-black md:text-4xl sm:text-3xl text-2xl font-semibold my-10 ">
       Promoted Businesses
       </h1> */}
            <div className='flex items-center justify-center h-[70vh]'>
              <h2 className='opacity-80 text-black md:text-3xl sm:text-2xl text-xl font-semibold'>No categories yet !</h2>
            </div>
          </div>
        )
      }
    </div>
  )
}
export default MatchedCategories