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

const Category = () => {
  const { data: categoriesData } = useQuery({
    queryKey: ["categoriesData"],
    queryFn: () => fetchAllCategories(),
  });

  // console.log("categoriesData",categoriesData);
  return (
    <>
      <div className="sm:hidden block">
      <CategoriesSlider />
      </div>
      <div className="sm:block hidden">
        <div className="px-body flex flex-col gap-6 sm:gap-8 md:gap-10 mt-8 sm:mt-16 md:mt-24 lg:mt-32">
          <div className="flex justify-between items-center">
            <h1 className="opacity-80 text-black md:text-4xl sm:text-3xl text-2xl font-semibold ">
              Categories
            </h1>
            <Link href={"/categories"}>
              <p className="opacity-80 text-black md:text-xl sm:text-lg text-base font-medium underline underline-offset-2 cursor-pointer">
                View all
              </p>
            </Link>
          </div>
          <div className="grid w-full  xl:grid-cols-8 lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-5   grid-cols-4 gap-y-6  sm:gap-y-8  md:gap-y-5 lg:gap-y-12   gap-x-6  sm:gap-x-8  md:gap-x-5 lg:gap-x-12   ">
            {categoriesData&&categoriesData.length>0&&categoriesData.slice(0,16).map((singleCategory:any,idx:number)=>{
              return <div key={idx}>
                 <CategoryCard  category={singleCategory}/>
              </div>
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
