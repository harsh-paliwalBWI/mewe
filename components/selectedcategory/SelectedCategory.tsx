"use client";
import React, { useEffect, useState } from "react";
import Searchsidecomponent from "../searchsidecomponent/Searchsidecomponent";
import CategoryPost from "../categoryPost/CategoryPost";
import CategoryBussinesses from "../categoryBussinesses/CategoryBussinesses";

const SelectedCategory = (selectedCategory: any) => {
  // const { data: webinars } = useQuery({
  //   queryKey: ["webniars"],
  //   queryFn: () => fetchWebniars(),
  // });

  //   const { data: webinarsData } = useQuery({
  //     queryKey: ["webinarsData"],
  //     queryFn: () => fetchAllWebinars(),
  //     // keepPreviousData: true
  //   });
  // console.log(webinars,"PPPP")
  const [currentCategory, setCurrentCategory] = useState(selectedCategory);

  // useEffect to update currentCategory when selectedCategory changes
  useEffect(() => {
    setCurrentCategory(selectedCategory);
  }, [selectedCategory]);
  console.log(selectedCategory.selectedCategory,"-2-2-2-2-2-2-2-")

  return (
    <div className=" flex md:flex-row flex-col-reverse gap-6 sm:gap-8 md:gap-10 my-4 sm:my-8 md:my-16 justify-between ">
      <div className="md:w-[62%] ">
        <CategoryPost selectedCategory={currentCategory}/>
      </div>
      <div className="md:w-[33%]">
        <CategoryBussinesses selectedCategory={currentCategory}/>
      </div>
    </div>
  );
};

export default SelectedCategory;
