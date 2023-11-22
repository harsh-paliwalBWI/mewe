"use client";
import React, { useState, Fragment, useEffect } from "react";
// import PieChart from '../pieChart/PieChart'
import { select, arc, pie } from "d3";
import PieChartDisplay from "../pieChart/PieChartDisplay";
import DoubleBarChartDisplay from "@/components/doublebarchart/DoubleBarCartDisplay";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  fetchBusinessAccountDetails,
  getStartUpData,
  isBusinessAccountExistOrNot,
} from "@/services/startupService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

const About = () => {
  const cookies = { value: getCookie("uid") };
  const [isClient, setIsClient] = useState(false);

  // const { data: existOrNot } = useQuery({
  //   queryKey: ["businessAccountExistOrNot"],
  //   queryFn: () => isBusinessAccountExistOrNot(cookies),
  // });
  // console.log(existOrNot, "on not");

  // const { data: startUpData } = useQuery({
  //   queryKey: ["startUpData"],
  //   queryFn: () => getStartUpData(cookies),
  // });

  // console.log("startUpData", startUpData);
  const { data: businessAccountData } = useQuery({
    queryKey: ["businessAccountData"],
    queryFn: () => fetchBusinessAccountDetails(cookies),
  });
  // console.log(businessAccountData, "account data");

  const databar = [
    { label: "Jan-Mar", value1: 40, value2: 50 },
    { label: "Apr-Jun", value1: 30, value2: 40 },
    { label: "Jul-Sep", value1: 60, value2: 40 },
    { label: "Oct-Dec", value1: 60, value2: 70 },
  ];

  // const width = 500;
  // const height = 250;
  const margin = { top: 0, right: 0, bottom: 30, left: 20 };

  const datapie = [
    { value: 14 },
    { value: 18 },
    { value: 27 },
    { value: 30 },
    { value: 35 },
  ];
  const DummyData = [
    { name: "Name", value: businessAccountData?.name ? businessAccountData?.name : "-" },
    { name: "Founder", value: businessAccountData?.founderName ? businessAccountData?.founderName : "-" },
    { name: "Category", value: businessAccountData?.category?.name ? businessAccountData?.category?.name : "-" },
    { name: "Year of Formation", value: businessAccountData?.yearOfFormation ? businessAccountData?.yearOfFormation : "-" },
    { name: "Current Valuation", value: businessAccountData?.currentValuation ? businessAccountData?.currentValuation : "-" },
  ];
  
  const DummyData2 = [
    { name: "Current Financial Income", value: businessAccountData?.currentFinancialIncome ? businessAccountData?.currentFinancialIncome : "-" },
    { name: "Previous Investment", value: businessAccountData?.previousInvestment ? businessAccountData?.previousInvestment : "-" },
    { name: "Investor Name", value: businessAccountData?.inverstorName ? businessAccountData?.inverstorName : "-" },
    { name: "Type of Investment", value: businessAccountData?.typeOfInvestement ? businessAccountData?.typeOfInvestement : "-" },
    { name: "Amount", value: businessAccountData?.amount ? businessAccountData?.amount : "-" }
  ];

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      <div className="w-[100%]  bg-[#F8FAFC] p-2 sm:p-5 md:p-8 flex flex-col gap-8 justify-center">
        <div className="flex flex-col gap-2">
          {DummyData.map((item: any, idx: number) => {
            return (
              <div
                key={idx}
                className="flex items-center justify-between w-full text-sm font-medium tracking-wider"
              >
                <div>
                  <h2 className="text-[#949597] ">{item.name}</h2>
                </div>
                <div>
                  <h2 className="font-semibold">{item.value}</h2>
                </div>
              </div>
            );
          })}
        </div>

        <div className=" flex flex-row  justify-between gap-1 sm:gap-5 md:gap-3 ">
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 ">
            <h2 className="text-[#949597] text-xs sm:text-sm md:text-base">
              Profit
            </h2>
            <div className="grid grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-0.5 sm:gap-y-1 md:gap-y-2">
              <div className="flex gap-0.5 sm:gap-1.5 md:gap-3 items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-[#054a91]"></div>
                <h2 className="text-black text-xs sm:text-sm md:text-base font-semibold">
                  P1
                </h2>
              </div>
              <div className="flex gap-0.5 sm:gap-1.5 md:gap-3 items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-[#548bc3]"></div>
                <h2 className="text-black text-xs sm:text-sm md:text-base font-semibold">
                  P2
                </h2>
              </div>
              <div className="flex gap-0.5 sm:gap-1.5 md:gap-3 items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-[#3c7bbc]"></div>
                <h2 className="text-black text-xs sm:text-sm md:text-base font-semibold">
                  P3
                </h2>
              </div>
              <div className="flex gap-0.5 sm:gap-1.5 md:gap-3 items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-[#678eb6]"></div>
                <h2 className="text-black text-xs sm:text-sm md:text-base font-semibold">
                  P4
                </h2>
              </div>
              <div className="flex gap-0.5 sm:gap-1.5 md:gap-3 items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-[#83aad2]"></div>
                <h2 className="text-black text-xs sm:text-sm md:text-base font-semibold">
                  P5
                </h2>
              </div>
            </div>
          </div>
          <div className="w-[40%] h-fit">
            <PieChartDisplay data={datapie} />
          </div>
        </div>

        <div className=" flex flex-col lg:flex-row justify-between gap-2 sm:gap-2.5 md:gap-3 mt-2 sm:mt-5 md:mt-8">
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
            <h2 className="text-[#949597] text-xs sm:text-sm md:text-base">
              Last Financial Year Revenue
            </h2>
            <div className="flex md:flex-col gap-2  md:gap-2.5">
              <div className="flex gap-0.5 sm:gap-1.5 md:gap-3 items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-[#054a91]"></div>
                <h2 className="text-black text-xs sm:text-sm md:text-base font-semibold">
                  2020-2021
                </h2>
              </div>

              <div className="flex gap-0.5 sm:gap-1.5 md:gap-3 items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-[#83aad2]"></div>
                <h2 className="text-black text-xs sm:text-sm md:text-base font-semibold">
                  2021-2022
                </h2>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-[70%]   md:w-[80%] lg:w-[54%]">
            <DoubleBarChartDisplay data={databar} margin={margin} />
          </div>
        </div>

        {/* width={width} height={height} */}

        <div className="flex flex-col gap-2">
          {DummyData2.map((item: any, idx: number) => {
            return (
              <div
                key={idx}
                className="flex items-center justify-between w-full text-sm font-medium tracking-wider"
              >
                <div>
                  <h2 className="text-[#949597] ">{item.name}</h2>
                </div>
                <div>
                  <h2 className="font-semibold">{item.value}</h2>
                </div>
              </div>
            );
          })}
        </div>
        {/* <PieChart data={data} width={400} height={400} /> */}
      </div>
    </>
  );
};

export default About;
