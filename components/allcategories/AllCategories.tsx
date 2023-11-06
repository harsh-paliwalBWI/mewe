"use client";
import React from "react";

// import CategoryCard from "./categoryCard/CategoryCard";
import img from "../../../images/ME_WE.svg";
import bottomImg from "../../../images/ME_WE.svg";
import Image from "next/image";
import CategoryCard from "@/components/categorycard/CategoryCard";
import Link from "next/link";
import CategoriesSlider from "@/components/categoriesSlider/CategoriesSlider";

const AllCategories = () => {
  return (

        <div className="px-body flex flex-col gap-6 sm:gap-8 md:gap-10 my-4 sm:my-8 md:my-16">
          <div className="flex justify-center items-center">
            <h1 className="opacity-80 text-black md:text-4xl sm:text-3xl text-2xl font-semibold ">
              Categories
            </h1>
            
          </div>
          <div className="grid w-full  xl:grid-cols-8 lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-5   grid-cols-4 gap-y-6  sm:gap-y-8  md:gap-y-10 lg:gap-y-12   gap-x-6  sm:gap-x-8  md:gap-x-10 lg:gap-x-12   ">
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
          </div>
        </div>
     
  );
};

export default AllCategories;
