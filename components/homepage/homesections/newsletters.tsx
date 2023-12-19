"use client";
import React from "react";

import img from "../../../images/ME_WE.svg";
import bottomImg from "../../../images/ME_WE.svg";
import Image from "next/image";
import CategoryCard from "@/components/categorycard/CategoryCard";
import NewsletterCard from "@/components/newslettercard/NewsletterCard";
import { useQuery } from "@tanstack/react-query";
import { fetchAllNewsletters } from "@/services/homeService";

const Newsletter = () => {
  const { data: newsletterData } = useQuery({
    queryKey: ["newsletterData"],
    queryFn: () => fetchAllNewsletters(),
    // keepPreviousData: true
  });

  return (
    <>
      {newsletterData && newsletterData.length > 0 && (
        <div className="px-body flex flex-col gap-6 sm:gap-8 md:gap-10 mt-8 sm:mt-16 md:mt-24 lg:mt-32 pt-5 sm:pt-0">
          <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
            <h1 className="opacity-80 text-black md:text-2xl sm:text-xl text-lg font-medium">
              Daily Digest
            </h1>
            <p className=" opacity-80 text-black md:text-4xl sm:text-3xl text-2xl font-semibold">
              Newsletter
            </p>
          </div>
          <div className="grid w-full  xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1   grid-cols-1 gap-y-2  sm:gap-y-4  md:gap-y-6 lg:gap-y-8   gap-x-2  sm:gap-x-4  md:gap-x-6 lg:gap-x-8  ">
            {/* <NewsletterCard />
            <NewsletterCard /> */}
            {newsletterData &&
              newsletterData.length > 0 &&
              newsletterData
                ?.slice(0, 2)
                .map((newsletter: any, idx: number) => {
                  return (
                    <div key={idx}>
                      <NewsletterCard singleNewsletter={newsletter} />
                    </div>
                  );
                })}
          </div>
        </div>
      )}
    </>
  );
};

export default Newsletter;
