"use client";
import React from "react";

// import CategoryCard from "./categoryCard/CategoryCard";
import img from "../../../images/ME_WE.svg";
import bottomImg from "../../../images/ME_WE.svg";
import Image from "next/image";
import CategoryCard from "@/components/categorycard/CategoryCard";
import Link from "next/link";
import CategoriesSlider from "@/components/categoriesSlider/CategoriesSlider";

const Category = () => {
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
          <div className="grid w-full  xl:grid-cols-7 lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-5   grid-cols-4 gap-y-6  sm:gap-y-8  md:gap-y-10 lg:gap-y-12   gap-x-6  sm:gap-x-8  md:gap-x-10 lg:gap-x-12   ">
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
      </div>
    </>
  );
};

export default Category;
