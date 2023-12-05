"use client";
import { fetchAllStartUps } from "@/services/homeService";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import BussinessCard from "../bussinesscard/BussinessCard";
import Loading from "../../app/loading";
import { getCookie } from "cookies-next";
import { getStartUpData } from "@/services/startupService";

const AllBusinessPage = () => {
  const [isClient, setIsClient] = useState(false);
  const cookies = { value: getCookie("uid") };

  const { data: allStartUpsData, isLoading } = useQuery({
    queryKey: ["allStartUpsData"],
    queryFn: () => fetchAllStartUps(),
  });
  const { data: startUpData } = useQuery({
    queryKey: ["startUpData"],
    queryFn: () => getStartUpData(cookies),
  });
  // console.log(allStartUpsData,"---------");

  useEffect(() => {
    setIsClient(true);
  }, [allStartUpsData]);
  return (
    <div className="px-body">
      {allStartUpsData && allStartUpsData.length > 0 && isClient ? (
        <>
          <div>
            {" "}
            <h1 className="opacity-80 text-black md:text-4xl sm:text-3xl text-2xl font-semibold sm:mt-10 mt-5">
              Promoted Businesses
            </h1>
          </div>
          <div className=" sm:mt-10 mt-5 md:mb-20 sm:mb-10 mb-5  grid w-full  xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2   grid-cols-2 gap-y-4  sm:gap-y-8  md:gap-y-10 lg:gap-y-12   gap-x-4  sm:gap-x-8  md:gap-x-10 lg:gap-x-12  ">
            {allStartUpsData &&
              allStartUpsData.length > 0 &&
              allStartUpsData
              .filter((startUp: any) => startUp?.docId !== startUpData?.id)
              .map((startUp: any, idx: number) => {
                return (
                  <div key={idx}>
                    <BussinessCard startup={startUp} />
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <div className="px-body">
          <h1 className="opacity-80 text-black md:text-4xl sm:text-3xl text-2xl font-semibold sm:mt-10 mt-5">
            Promoted Businesses
          </h1>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default AllBusinessPage;
