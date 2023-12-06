


"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../images/image (1).png";
import { usePathname } from "next/navigation";
import { TfiMenuAlt } from "react-icons/tfi"
import FlatIcon from "../flatIcon/flatIcon";
import { useQuery } from "@tanstack/react-query";
import { getStartUpData } from "@/services/startupService";
import { getCookie } from "cookies-next";
import { toast } from "react-toastify";


const Navmobile = () => {
  const cookies = { value: getCookie("uid") };
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const pathname = usePathname();
  const { data: startUpData } = useQuery({
    queryKey: ["startUpData"],
    queryFn: () => getStartUpData(cookies),
  });

  return (
    <div className={`text-center px-body   ${(pathname.includes("welcome") || pathname.includes("signup") || pathname.includes("signin") || pathname.includes("verification")) ? "hidden" : "sm:hidden block"} `}>
      <div className="flex items-center justify-between py-[10px]">
        <div
          onClick={(prev) => {
            setIsMobile(true);
            document.body.classList.add("no-scroll");
          }}
        >
          <TfiMenuAlt className="h-[20px] w-auto" />
        </div>
        <Link
          href={"/"}>
          {/* <div className="border border-primary p-[1px] rounded-lg"> */}
          <div className=" w-[46px] h-[46px]  ">
            <Image src={logo} alt="" className="w-full h-full object-contain " />
          </div>
          {/* </div> */}
        </Link>
      </div>
      {isMobile && (
        <div className="h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 z-50">
          <div
            className={` bg-[white]  sm:w-[60%] w-[100%] absolute top-0 left-0 h-screen z-50 rounded-tr-3xl rounded-br-3xl `}
          >
            <div
              onClick={() => {
                setIsMobile(false);
                document.body.classList.remove("no-scroll");
              }}
              className="absolute top-[20px] right-[20px]"
            >
              <FlatIcon className="text-gray-600 cursor-pointer flaticon-close text-base text-primary   " />
            </div>
            <div className="flex  flex-col items-start gap-2 font-medium px-[30px] ">
              <Link href={"/"} className=" w-[60px]  mt-[30px] mb-[10px] ml-[-5px]  cursor-pointer"
                onClick={() => {
                  setIsMobile(false);
                  document.body.classList.remove("no-scroll");
                }}>
                {/* <div className="border border-primary p-[1px] rounded-lg"> */}
                <div className=" w-[56px] h-[56px]  ">
                  <Image src={logo} alt="" className="w-full h-full object-contain " />
                </div>
                {/* </div> */}
              </Link>
              <Link
                href={"/"}
                className={`${pathname === "/" && "text-primary"}  py-[5px] cursor-pointer `}
                onClick={() => {
                  setIsMobile(false);
                  document.body.classList.remove("no-scroll");
                }}
              >
                Home
              </Link>
              <Link
                href={"/about-our-company"}
                className={`${pathname.includes("about-our-company") && "text-primary"
                  } flex items-center justify-center gap-2  py-[5px]  cursor-pointer `}
                onClick={() => {
                  setIsMobile(false);
                  document.body.classList.remove("no-scroll");
                }}
              >
                <div className="py-[5px]  cursor-pointer">About</div>
              </Link>
              <Link
                href={"/"}
                className={`${pathname === "/" && "text-primary"
                  } flex items-center justify-center gap-2  py-[5px]  cursor-pointer `}
                onClick={() => {
                  setIsMobile(false);
                  document.body.classList.remove("no-scroll");
                }}
              >
                <div className="py-[5px]  cursor-pointer">Explore</div>
              </Link>
              <Link
                href={"/schemes"}
                className={`${pathname.includes("schemes") && "text-primary"
                  } flex items-center justify-center gap-2  py-[5px]  cursor-pointer `}
                onClick={() => {
                  setIsMobile(false);
                  document.body.classList.remove("no-scroll");
                }}
              >
                <div className="py-[5px]  cursor-pointer">Schemes</div>
              </Link>
              <Link
                href={"/financials"}
                className={`${pathname.includes("financials") && "text-primary"
                  } flex items-center justify-center gap-2  py-[5px]  cursor-pointer `}
                onClick={() => {
                  setIsMobile(false);
                  document.body.classList.remove("no-scroll");
                }}
              >
                <div>Financials</div>
              </Link>
              {startUpData ?
                <Link
                  href={{ pathname: '/account', query: { tab: 'my-profile' }, }}
                  className={`${pathname.includes("account") && "text-primary"
                    } flex items-center justify-center gap-2  py-[5px]  cursor-pointer `}
                  onClick={() => {
                    setIsMobile(false);
                    document.body.classList.remove("no-scroll");
                  }}
                >
                  <div>Account</div>
                  {/* <div></div> */}
                </Link>
                :
                <div
                  className={`${pathname.includes("account") && "text-primary"
                    } flex items-center justify-center gap-2  py-[5px]  cursor-pointer `}
                  onClick={() => {
                    toast.error("Please sign in .")
                    setIsMobile(false);
                    document.body.classList.remove("no-scroll");
                  }}
                >
                  <div>Account</div>
                  {/* <div></div> */}
                </div>
              }
              <Link
                href={"/welcome"}
                className={`${pathname.includes("welcome") && "text-primary"
                  } flex items-center justify-center gap-2  py-[5px]  cursor-pointer `}
                onClick={() => {
                  setIsMobile(false);
                  document.body.classList.remove("no-scroll");
                }}
              >
                <div>Log in/Sign up</div>
                <div></div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Navmobile;
