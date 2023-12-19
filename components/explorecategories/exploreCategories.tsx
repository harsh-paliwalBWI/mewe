"use client";
import React, { useEffect, useState } from "react";

// import CategoryCard from "./categoryCard/CategoryCard";
import img from "../../../images/ME_WE.svg";
import bottomImg from "../../../images/ME_WE.svg";
import Image from "next/image";
import CategoryCard from "@/components/categorycard/CategoryCard";
import Link from "next/link";
import { Carousel } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCategories } from "@/services/categoriesService";
import SelectedCategory from "../selectedcategory/SelectedCategory";
import CategoryCard2 from "../categorycard/CategoryCard2";

const responsiveSettings = [
  {
    breakpoint: 576, // Extra small screens (less than 576px)
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide: 0,
    },
  },
  {
    breakpoint: 768, // Small screens (576px and above)
    settings: {
      slidesToShow: 6,
      slidesToScroll: 6,
      initialSlide: 0,
    },
  },
  {
    breakpoint: 992, // Medium screens (768px and above)
    settings: {
      slidesToShow: 8,
      slidesToScroll: 8,
      initialSlide: 0,
    },
  },
  {
    breakpoint: 1200, // Large screens (992px and above)
    settings: {
      slidesToShow: 8,
      slidesToScroll: 8,
      initialSlide: 0,
      centerPadding: "800px",
    },
  },
  {
    breakpoint: 1600, // Extra large screens (1200px and above)
    settings: {
      slidesToShow: 8,
      slidesToScroll: 8,
      initialSlide: 0,
      centerPadding: "600px",
    },
  },
  {
    breakpoint: 2000, 
    settings: {
      slidesToShow: 8,
      slidesToScroll: 8,
      initialSlide: 0,
      centerPadding: "600px",
    },
  },
  {
    breakpoint: 2400, 
    settings: {
      slidesToShow: 8,
      slidesToScroll: 8,
      initialSlide: 0,
      centerPadding: "600px",
    },
  },
];

const ExploreCategories = () => {


  const { data: categoriesData } = useQuery({
    queryKey: ["categoriesData"],
    queryFn: () => fetchAllCategories(),
  });

  const [selectedCategory, setSelectedCategory] = useState(
    categoriesData && categoriesData.length > 0 ? categoriesData[0] : null
  );

console.log(selectedCategory,"-1-1-1-1-1-1-1-")
  const handleCategorySelect = (singleCategory: any) => {
    setSelectedCategory(singleCategory);
  };

  useEffect(() => {
    setSelectedCategory(selectedCategory);
  }, [selectedCategory]);

  // console.log("categoriesData",categoriesData);
  return (
    <div className="px-body flex flex-col gap-6 sm:gap-8 md:gap-10 mt-4 sm:mt-8 md:mt-16 ">
      <div className="flex justify-between items-center">
        <h1 className="opacity-80 text-black md:text-4xl sm:text-3xl text-2xl font-semibold ">
          Categories
        </h1>
      </div>
      <Carousel
        responsive={responsiveSettings}
        dotPosition="bottom"
        className="dot-black"
      >
        {categoriesData &&
          categoriesData.length > 0 &&
          categoriesData
            .slice(0, 16)
            .map((singleCategory: any, idx: number) => {
              return (
                <div
                  key={idx}
                  className="px-3 sm:px-4 md:px-5"
                  onClick={() => handleCategorySelect(singleCategory)}
                >
                  <CategoryCard2
                    category={singleCategory}
                    selectedCategory={selectedCategory}
                  />
                </div>
              );
            })}
      </Carousel>
      <SelectedCategory selectedCategory={selectedCategory} />
    </div>
  );
};

export default ExploreCategories;
