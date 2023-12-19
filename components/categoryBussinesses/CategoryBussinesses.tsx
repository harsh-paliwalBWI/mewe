"use client";
import React, { useEffect, useState } from "react";

// import CategoryCard from "./categoryCard/CategoryCard";
import img from "../../../images/ME_WE.svg";
import bottomImg from "../../../images/ME_WE.svg";
import Image from "next/image";
import CategoryCard from "@/components/categorycard/CategoryCard";

import Link from "next/link";
import { fetchCategoryStartUps } from "@/services/homeService";
import { log } from "console";
import { getCookie } from "cookies-next";
import { getStartUpData } from "@/services/startupService";
import BussinessCard2 from "../bussinesscard/BussinessCard2";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const CategoryBussinesses = (selectedCategory: any) => {
  // console.log(selectedCategory.selectedCategory.selectedCategory, "JJJJJJJ")
  console.log(selectedCategory.selectedCategory.selectedCategory,"-3-3-3-3-3-3-3-")
  const queryClient = useQueryClient()

  const categoryname=selectedCategory?.selectedCategory?.selectedCategory?.name
  const cookies = { value: getCookie("uid") };

  const { data: categoryStartUpsData } = useQuery({
    queryKey: ["categoryStartUpsData", categoryname],
    queryFn: () => fetchCategoryStartUps(categoryname),
  });

  const { data: startUpData } = useQuery({
    queryKey: ["startUpData"],
    queryFn: () => getStartUpData(cookies),
  });

  // console.log(startUpData?.id,"----------");
  useEffect(() => {

    queryClient.invalidateQueries({ queryKey: ["categoryStartUpsData", categoryname] });
    // queryClient.refetchQueries({ queryKey: ["categoryStartUpsData", categoryname] });
  
  }, [,queryClient, categoryname]);

  return (
    <>
      {categoryStartUpsData && categoryStartUpsData.length > 0 && (
        <div className="px-body flex flex-col">
          <div className="flex justify-between items-center">
            <h1 className=" text-black md:text-4xl sm:text-2xl text-lg font-semibold ">
             {categoryname} Businesses
            </h1>
          </div>
          <div className=" sm:mt-5 mt-2 md:mb-20 sm:mb-10 mb-5 flex flex-col gap-3 sm:gap-4 md:gap-5 ">
            {categoryStartUpsData &&
              categoryStartUpsData.length > 0 &&
              categoryStartUpsData
                .filter((startUp: any) => startUp?.docId !== startUpData?.id)
                .map((startUp: any, idx: number) => {
                  return (
                    <div key={idx}>
                      <BussinessCard2 startup={startUp} />
                    </div>
                  );
                })}
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryBussinesses;
