"use client";
import React from "react";

// import CategoryCard from "./categoryCard/CategoryCard";
import img from "../../../images/ME_WE.svg";
import bottomImg from "../../../images/ME_WE.svg";
import Image from "next/image";
import CategoryCard from "@/components/categorycard/CategoryCard";
import Link from "next/link";
import CategoriesSlider from "@/components/categoriesSlider/CategoriesSlider";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCategories } from "@/services/categoriesService";
import Loader from "../loader/Loader";
import Loading from "@/app/loading";

const AllCategories = () => {
  const { data: categoriesData } = useQuery({
    queryKey: ["categoriesData"],
    queryFn: () => fetchAllCategories(),
    // keepPreviousData: true
  });

  console.log("categoriesData",categoriesData);
  return (

        <div className="px-body flex flex-col  md:pb-20 pb-10">
          {categoriesData&&categoriesData.length>0?
          <>
          <div className="flex justify-center items-center  sm:my-10 my-5">
            <h1 className="opacity-80 text-black md:text-4xl sm:text-3xl text-2xl font-semibold ">
              Categories
            </h1>
            
          </div>
          <div className="grid w-full  xl:grid-cols-8 lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-5   grid-cols-4 gap-y-6  sm:gap-y-8  md:gap-y-10 lg:gap-y-12   gap-x-6  sm:gap-x-8  md:gap-x-10 lg:gap-x-12   ">
           
          {categoriesData&&categoriesData.length>0&&categoriesData?.map((singleCategory:any,idx:number)=>{
              return <div key={idx}>
                 <CategoryCard  category={singleCategory}/>
              </div>
            })}
           
          </div>
          </>
          :
          <>
           <div className="px-body">
                        <h1 className="opacity-80 text-black md:text-4xl sm:text-3xl text-2xl font-semibold text-center sm:my-10 my-5">
                        Categories

                        </h1>
                        <Loading/>
                    </div>
          </>
}
        </div>
     
  );
};

export default AllCategories;
