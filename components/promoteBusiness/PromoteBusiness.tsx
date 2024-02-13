"use client";
import { db } from "@/config/firebase-config";
import { fetchAllPlans } from "@/services/financialsPlans";
import { getStartUpData } from "@/services/startupService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import checkImg from "../../images/Vector 37.svg";
import blackCheck from "../../images/Vector 38.svg";
import premiumImg4 from "../../images/blue grp.svg";
import premiumImg1 from "../../images/premium 1.svg";
import premiumImg2 from "../../images/premium 2 (2).svg";
import premiumImg from "../../images/premium 2.svg";
import FlatIcon from "../flatIcon/flatIcon";
import PromotedBusinessSlider from "../promotedBusinessSlider/PromotedBusinessSlider";
const PromoteBusiness = () => {
  const [isSwitched, setIsSwitched] = useState(false);
  const [hoveredPackage, setHoveredPackage] = useState("");
  const [loading, setLoading] = useState(false);
  const data = [
    { text: "Neque porro quisquam est" },
    { text: "Excepteur sint occaecat cupidatat" },
    { text: "Voluptate velit esse quam nihil molestiae" },
    { text: "Qui dolorem ipsum quia dolor sit amet" },
    { text: "Ut enim ad minima veniam, quis nostrum" },
  ];

  const cookies = { value: getCookie("uid") };
  const queryClient = useQueryClient();

  const { data: plansData } = useQuery({
    queryKey: ["plansData"],
    queryFn: () => fetchAllPlans(),
  });

  // console.log(cookies, "zzzzzzz")
  const { data: startUpData } = useQuery({
    queryKey: ["startUpData"],
    queryFn: () => getStartUpData(cookies),
  });

  const firstPlan = plansData ? plansData[0] : null;
  const secondPlan = plansData ? plansData[1] : null;
  const thirdPlan = plansData ? plansData[2] : null;

  const handleSwitchChange = () => {
    setIsSwitched((prev) => !prev);
  };


  const onPlanChangesHandler = async (selectedPlan: any) => {
    if (startUpData) {
      setLoading(true);
      try {
        const startUpDocRef = doc(db, `startups/${startUpData.id}`);

        const today = new Date();
        let expireAt = null;
        if (isSwitched === true) {
          expireAt = new Date(today.setMonth(today.getMonth() + 1)); // One month later
        } else if (isSwitched === false) {
          expireAt = new Date(today.setFullYear(today.getFullYear() + 1)); // One year later
        }

        const PlansDetailsObj = {
          payment: {
            plan: {
              expireAt: expireAt,
              id: selectedPlan?.id,
              type: selectedPlan?.type,
            },
          },
        };

        await setDoc(startUpDocRef, PlansDetailsObj, { merge: true });
        await queryClient.invalidateQueries({ queryKey: ["startUpData"] });
        await queryClient.refetchQueries({ queryKey: ["startUpData"] });
        toast.success(`Thank You for Purchasing ${selectedPlan?.name}`);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("An error occurred purchasing the plan.");
        // console.log(error, "ccccccccc");
      }
    } else {
      toast.error("Please login to Purchase");
    }
  };

  return (
    <>
      <>
        <div className="px-body  ">
          <div className="flex justify-center items-center gap-2 sm:mt-8 mt-4 ">
            <div>
              <Image src={premiumImg1} alt="" />
            </div>
            <h3 className="md:text-lg text-base font-semibold ">PREMIUM</h3>
          </div>
          <div className="md:text-4xl text-xl font-semibold text-center sm:mt-3 mt-2 ">
            <h1>Promote Your Business</h1>
          </div>
          <div className="text-center text-[#7f7f7f] font-medium md:text-lg text-sm my-5 ">
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              official <br />
              deserunt mollit anim id es
            </p>
          </div>
          {/* <div className='flex justify-center items-center gap-3'>
            <div className={` font-medium text-sm tracking-wider ${isSwitched&&"text-primary"}`}><p>Monthly</p></div>
            <div onClick={()=>setIsSwitched((prev)=>!prev)} className={`sm:w-[58px] w-[48px] flex items-center px-1  sm:h-[29px] h-[19px] ${isSwitched?"justify-start":"justify-end"}  bg-primary rounded-full cursor-pointer`}>
            <div className='sm:w-[22px] w-[11px] sm:h-[22px] h-[11px] rounded-full bg-white'></div></div>
            <div className='text-[#a1a099] font-medium text-sm tracking-wider'><p>Yearly</p></div>
            </div> */}
          <div className="flex justify-center items-center gap-1 sm:gap-2 md:gap-3 ">
            <div
              className={`  w-[100px] flex justify-end  ${
                isSwitched
                  ? "text-primary text-base font-bold"
                  : "text-[#a1a099] text-sm font-medium"
              }`}
            >
              <p>Monthly</p>
            </div>
            <div
              onClick={handleSwitchChange}
              className={`md:w-[58px] sm:w-[48px] w-[38px] flex items-center px-1 sm:h-[29px] h-[19px] ${
                isSwitched ? "justify-start" : "justify-end"
              } bg-primary rounded-full cursor-pointer`}
            >
              <div className="sm:w-[22px] w-[11px] sm:h-[22px] h-[11px] rounded-full bg-white"></div>
            </div>
            <div
              className={` w-[100px] flex justify-start   ${
                isSwitched
                  ? "text-[#a1a099] text-sm font-medium"
                  : "text-primary text-base font-bold"
              }`}
            >
              <p>Yearly</p>
            </div>
          </div>

          <div className=" rounded-tl-xl rounded-tr-xl  md:mt-20 mt-7 md:mb-36 mb-5 sm:mt-10 sm:mb-10">
            <PromotedBusinessSlider isSwitched={isSwitched} />
            <>
              <div className=" hidden md:flex sm:flex-row flex-col lg:flex-nowrap sm:flex-wrap  flex-nowrap lg:justify-start sm:justify-center justify-start   items-center gap-x-8 gap-y-4 ">
                <div
                  className={`lg:w-[33%] sm:w-[42%] w-[90%] rounded-tl-xl rounded-tr-xl hoverEffect`}
                  onMouseEnter={() => setHoveredPackage("basic")}
                  onMouseLeave={() => setHoveredPackage("")}
                >
                  <div className="w-full h-[18px] bg-[#A6D6BF] rounded-tl-xl rounded-tr-xl"></div>
                  <div className="bg-[#fffdf3] py-5 px-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <Image src={premiumImg2} alt="" />
                      </div>
                      <div>
                        <FlatIcon className="flaticon-help text-[#a1a099] text-2xl" />
                      </div>
                    </div>
                    <h1 className="font-bold xl:text-lg text-sm my-3">
                      {firstPlan?.name}
                    </h1>
                    <div className="text-[#a1a099] xl:text-lg text-base  ">
                      <h2>
                        {/* Duis aute irure dolor in reprehenderit in <br />
                        voluptate velit esse cillum dolore. */}
                        {firstPlan?.description}
                      </h2>
                    </div>
                    <div className="flex flex-col gap-2 my-5">
                      {data.map((item: any, idx: number) => {
                        return (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="h-[20px] w-[20px] rounded-full flex items-center justify-center bg-[#A6D6BF]">
                              <Image src={blackCheck} alt="" />
                            </div>
                            <p className="text-[#a1a099]  xl:text-base text-sm">
                              {item.text}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-end">
                      <div
                        className={`xl:text-xl font-bold text-lg ${
                          isSwitched ? "hidden" : "block"
                        }`}
                      >
                        Rs. {firstPlan?.prices?.yearly}/
                      </div>

                      <div
                        className={`xl:text-xl font-bold text-lg ${
                          isSwitched ? "block" : "hidden"
                        }`}
                      >
                        Rs. {firstPlan?.prices?.monthly}/
                      </div>

                      <p className="text-[#a1a099] text-xs font-semibold">
                        {isSwitched ? "month" : "year"}
                      </p>
                    </div>
                    <div  onClick={()=>onPlanChangesHandler(firstPlan)} className="cursor-pointer text-center bg-[#A6D6BF] py-3  mt-5 font-bold xl:text-base text-sm">
                      <button >Get Started!</button>
                    </div>
                  </div>
                </div>

                <div
                  className={`lg:w-[33%] sm:w-[46%] w-[90%] rounded-tl-xl rounded-tr-xl hoverEffect`}
                  onMouseEnter={() => setHoveredPackage("standard")}
                  onMouseLeave={() => setHoveredPackage("")}
                >
                  <div className="w-full h-[18px] bg-[#4B647E] rounded-tl-xl rounded-tr-xl"></div>
                  <div className="bg-[#fffdf3] py-5 px-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <Image src={premiumImg} alt="" />
                      </div>
                      <div>
                        <FlatIcon className="flaticon-help text-[#a1a099] text-2xl" />
                      </div>
                    </div>
                    <h1 className="font-bold xl:text-lg text-sm my-3">
                      {/* STANDARD */}
                      {secondPlan?.name}
                    </h1>
                    <div className="text-[#a1a099] xl:text-lg text-base ">
                      <h2>
                        {/* Duis aute irure dolor in reprehenderit in <br />
                        voluptate velit esse cillum dolore. */}
                        {secondPlan?.description}
                      </h2>
                    </div>
                    <div className="flex flex-col gap-2 my-5">
                      {data.map((item: any, idx: number) => {
                        return (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="h-[20px] w-[20px] rounded-full flex items-center justify-center bg-[#4B647E]">
                              <Image src={checkImg} alt="" />
                            </div>
                            <p className="text-[#a1a099]  xl:text-base text-sm">
                              {item.text}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-end">
                    <div
                        className={`xl:text-xl font-bold text-lg ${
                          isSwitched ? "hidden" : "block"
                        }`}
                      >
                        Rs. {secondPlan?.prices?.yearly}/
                      </div>

                      <div
                        className={`xl:text-xl font-bold text-lg ${
                          isSwitched ? "block" : "hidden"
                        }`}
                      >
                        Rs. {secondPlan?.prices?.monthly}/
                      </div>

                      <p className="text-[#a1a099] text-xs font-semibold">
                        {isSwitched ? "month" : "year"}
                      </p>
                    </div>
                    <div  onClick={()=>onPlanChangesHandler(secondPlan)} className="cursor-pointer text-center bg-[#4B647E] py-3 text-white font-bold xl:text-base text-sm mt-5">
                      <button>Get Started!</button>
                    </div>
                  </div>
                </div>

                <div
                  className={`lg:w-[33%] sm:w-[42%] w-[90%] rounded-tl-xl rounded-tr-xl hoverEffect`}
                  onMouseEnter={() => setHoveredPackage("premium")}
                  onMouseLeave={() => setHoveredPackage("")}
                >
                  <div className="w-full h-[18px] bg-[#9BC1F9] rounded-tl-xl rounded-tr-xl"></div>
                  <div className="bg-[#fffdf3] py-5 px-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <Image src={premiumImg4} alt="" />
                      </div>
                      <div>
                        <FlatIcon className="flaticon-help text-[#a1a099] text-2xl" />
                      </div>
                    </div>
                    <h1 className="font-bold xl:text-lg text-sm my-3">
                      {/* PREMIUM */}
                      {thirdPlan?.name}
                    </h1>
                    <div className="text-[#a1a099] xl:text-lg text-base  ">
                      <h2>
                        {/* Duis aute irure dolor in reprehenderit in <br />{" "}
                        voluptate velit esse cillum dolore. */}
                        {thirdPlan?.description}
                      </h2>
                    </div>
                    <div className="flex flex-col gap-2 my-5">
                      {data.map((item: any, idx: number) => {
                        return (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="h-[20px] w-[20px] rounded-full flex items-center justify-center bg-[#9BC1F9]">
                              <Image src={blackCheck} alt="" />
                            </div>
                            <p className="text-[#a1a099]  xl:text-base text-sm">
                              {item.text}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-end">
                    <div
                        className={`xl:text-xl font-bold text-lg ${
                          isSwitched ? "hidden" : "block"
                        }`}
                      >
                        Rs. {thirdPlan?.prices?.yearly}/
                      </div>

                      <div
                        className={`xl:text-xl font-bold text-lg ${
                          isSwitched ? "block" : "hidden"
                        }`}
                      >
                        Rs. {thirdPlan?.prices?.monthly}/
                      </div>

                      <p className="text-[#a1a099] text-xs font-semibold">
                        {isSwitched ? "month" : "year"}
                      </p>
                    </div>
                    <div  onClick={()=>onPlanChangesHandler(thirdPlan)} className="cursor-pointer text-center bg-[#9BC1F9] py-3  mt-5 font-bold xl:text-base text-sm">
                      <button>Get Started!</button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
      </>
    </>
  );
};

export default PromoteBusiness;
