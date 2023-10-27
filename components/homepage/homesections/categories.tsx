"use client";
import React from "react";

// import CategoryCard from "./categoryCard/CategoryCard";
import img from "../../../images/ME_WE.svg";
import bottomImg from "../../../images/ME_WE.svg";
import Image from "next/image";
import CategoryCard from "@/components/categorycard/CategoryCard";

const Category = () => {
  return (
    <div className="px-body flex flex-col gap-10 mt-10">
      <div className="flex justify-between ">
        <h1 className="opacity-80 text-black text-4xl font-semibold ">
          Categories
        </h1>
        <p className="opacity-80 text-black text-xl font-medium underline underline-offset-2">
          View all
        </p>
      </div>
      <div className="grid w-full  xl:grid-cols-6 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4   grid-cols-3 gap-y-6  sm:gap-y-8  md:gap-y-10 lg:gap-y-12   gap-x-6  sm:gap-x-8  md:gap-x-10 lg:gap-x-12   border-2 border-red-800">
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

export default Category;
