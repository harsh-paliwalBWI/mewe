"use client"
import React from 'react'
// import PieChart from '../pieChart/PieChart'
import { select, arc, pie } from "d3";
import PieChartDisplay from "../pieChart/PieChartDisplay";
import DoubleBarChartDisplay from "@/components/doublebarchart/DoubleBarCartDisplay";

const About = () => {

  const databar = [
    { label: 'Jan- Mar', value1: 40, value2: 50 },
    { label: 'Apr- Jun', value1: 30, value2: 40 },
    { label: 'Jul- Sep', value1: 60, value2: 40 },
    { label: 'Oct- Dec', value1: 60, value2: 70 },
  ];

  const width = 400;
  const height = 250;
  const margin = { top: 0, right:0 , bottom: 30, left: 20 };


  const datapie = [
    { value: 14 },
    { value: 18 },
    { value: 27 },
    { value: 30 },
    { value: 35 },
  ];
  const DummyData = [
    { name: "Name", heading: "Code Fusion" },
    { name: "Founder", heading: "Wade Warren" },
    { name: "Category", heading: "Education" },
    { name: "Year of Formation", heading: "1967" },
    { name: "Current Valuation", heading: "$928.41" },
  ];

  const DummyData2 = [
    { name: "Current Financial Income", heading: "$565.7" },
    { name: "Previous Investment", heading: "$28.41" },
    { name: "Investor Name", heading: "Jane Cooper" },
    { name: "Type of Investment", heading: "FD" },
    { name: "Amount", heading: "$464.9" },
  ];
  return (
    <>
      <div className="w-[100%] border border-primary bg-[#F8FAFC] p-2 sm:p-5 md:p-8 flex flex-col gap-8 justify-center">
        <div className="flex flex-col gap-2">
          {DummyData.map((item: any, idx: number) => {
            return (
              <div className="flex items-center justify-between w-full text-sm font-medium tracking-wider">
                <div>
                  <h2 className="text-[#949597] ">{item.name}</h2>
                </div>
                <div>
                  <h2 className="font-semibold">{item.heading}</h2>
                </div>
              </div>
            );
          })}
        </div>

        <div className=" flex justify-between gap-1 sm:gap-2 md:gap-3 ">
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
            <h2 className="text-[#949597] text-xs sm:text-sm md:text-base">Profit</h2>
            <div className="grid grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-0.5 sm:gap-y-1 md:gap-y-2">
              <div className="flex gap-0.5 sm:gap-1.5 md:gap-3 items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-[#054a91]"></div>
                <h2 className="text-black text-xs sm:text-sm md:text-base font-semibold">P1</h2>
              </div>
              <div className="flex gap-0.5 sm:gap-1.5 md:gap-3 items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-[#548bc3]"></div>
                <h2 className="text-black text-xs sm:text-sm md:text-base font-semibold">P2</h2>
              </div>
              <div className="flex gap-0.5 sm:gap-1.5 md:gap-3 items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-[#3c7bbc]"></div>
                <h2 className="text-black text-xs sm:text-sm md:text-base font-semibold">P3</h2>
              </div>
              <div className="flex gap-0.5 sm:gap-1.5 md:gap-3 items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-[#678eb6]"></div>
                <h2 className="text-black text-xs sm:text-sm md:text-base font-semibold">P4</h2>
              </div>
              <div className="flex gap-0.5 sm:gap-1.5 md:gap-3 items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-[#83aad2]"></div>
                <h2 className="text-black text-xs sm:text-sm md:text-base font-semibold">P5</h2>
              </div>
            </div>
          </div>
          <div className="w-fit">
            <PieChartDisplay data={datapie} />
          </div>
        </div>


        <div className=" flex justify-between gap-1 sm:gap-2 md:gap-3 mt-8">
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
            <h2 className="text-[#949597] text-xs sm:text-sm md:text-base">Last Financial Year Revenue</h2>
            <div className="flex flex-col gap-0.5 sm:gap-1.5 md:gap-2.5">
              <div className="flex gap-0.5 sm:gap-1.5 md:gap-3 items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-[#054a91]"></div>
                <h2 className="text-black text-xs sm:text-sm md:text-base font-semibold">2020-2021</h2>
              </div>
             
              <div className="flex gap-0.5 sm:gap-1.5 md:gap-3 items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-[#83aad2]"></div>
                <h2 className="text-black text-xs sm:text-sm md:text-base font-semibold">2021-2022</h2>
              </div>
            </div>
          </div>
          <div className="w-fit">
            <DoubleBarChartDisplay data={databar} width={width} height={height} margin={margin} />
          </div>
        </div>

       

        <div className="flex flex-col gap-2">
          {DummyData2.map((item: any, idx: number) => {
            return (
              <div className="flex items-center justify-between w-full text-sm font-medium tracking-wider">
                <div>
                  <h2 className="text-[#949597] ">{item.name}</h2>
                </div>
                <div>
                  <h2 className="font-semibold">{item.heading}</h2>
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
