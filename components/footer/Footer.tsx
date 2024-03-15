"use client";
import React from "react";
import logo from "../../images/image (1).png";
import Image from "next/image";
import me from "../../images/me.svg";
import we from "../../images/we.svg";
import groupfooter from "../../images/footer design.svg";
import letter from "../../images/letter 1.svg";
import { usePathname } from "next/navigation";

import FlatIcon from "../flatIcon/flatIcon";

import facebookImg from "../../images/facebook.svg";
import instagram from "../../images/instagram.svg";
import linkedin from "../../images/linkedin.svg";
import copyright from "../../images/c.svg";
import Link from "next/link";
import { log } from "console";
const Footer = () => {
  const DUMMY_DATA = [
    {
      heading: "SITEMAP",
      subLinks: [
        { name: "Home", href: "/" },
        { name: "About", href: "about-our-company" },
        { name: "Explore", href: "/explore" },
        { name: "Scheme", href: "schemes" },
        { name: "Financials", href: "financials" },
        { name: "Account", href: "/account?tab=my-profile" },
      ],
    },
    {
      heading: "CATEGORY",
      subLinks: [
        { name: "Education", href: "/category/education" },
        { name: "Health", href: "/category/health" },
        { name: "Food", href: "/category/food" },
        { name: "Travel", href: "/category/travel" },
        { name: "Industry", href: "/category/industry" },
        { name: "Real Estate", href: "/category/real-estate" },
        { name: "Government", href: "/category/government" },
      ],
    },
    {
      heading: "ACCOUNT",
      subLinks: [
        { name: "Posts", href: "/account?tab=manage-posts" },
        { name: "Chats", href: "/account?tab=chat" },
        { name: "Notification", href: "#" },
        { name: "Terms & Conditions", href: "terms-and-conditions" },
        { name: "Privacy Policy", href: "privacy-policy" },
        { name: "FAQS", href: "#" },
      ],
    },
  ];

  const pathName = usePathname();
  // console.log(pathName,"cbv");

  return (
    <div
      className={`bg-[#272726] w-full h-fit ${
        pathName.includes("welcome") ||
        pathName.includes("signup") ||
        pathName.includes("signin") ||
        pathName.includes("verification")
          ? "hidden"
          : "block"
      }  "`}
    >
      <div className="px-body py-2 sm:py-3 md:py-4 mb-1 md:mb-2 gap-2 flex flex-col md:flex-row justify-between ">
        <div className=" flex gap-3 sm:gap-4 md:gap-5 items-center">
          <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16  ">
            <Image
              src={letter}
              alt="letter"
              width={100}
              height={100}
              // layout="responsive"
              className="w-full h-full"
            />
          </div>

          <h3 className=" relative  font-medium  tracking-wide md:text-3xl sm:text-2xl text-xl text-white  ">
            Subscribe our newsletter
          </h3>
        </div>
        <div className="flex  items-center gap-1 rounded-full w-full md:w-[40%] border md:border-2 border-white p-1">
          <input
            className="  outline-0 px-3 sm:px-4 md:px-5 py-2 md:py-3 lg:py-4 w-full h-full text-white bg-[#272726] rounded-full text-sm sm:text-base md:text-lg"
            placeholder="Enter your email"
          />
          <div className=" p-1 sm:p-2 md:p-3 rounded-full   bg-white cursor-pointer">
            <FlatIcon className="flaticon-arrow-right md:text-3xl sm:text-2xl text-xl  text-black " />
          </div>
        </div>
      </div>
      <hr className="h-1 sm:h-2 md:h-3 bg-white"></hr>

      {/* sm:pt-6 md:pt-9 lg:pt-12 */}
      <div className="px-body  flex flex-col gap-2 md:gap-3 md:flex-row justify-between   pt-4  ">
        <div className=" flex flex-col gap-2 sm:gap-4 md:gap-6  w-full md:w-[40%] ">
          <div className=" flex gap-2 sm:gap-3 md:gap-4  items-center ">
            {/* <div className="border-2 border-primary p-[1px] rounded-xl bg-white"> */}
            <div className="  w-[64px] h-[64px]  ">
              <Image
                src={logo}
                alt="logo"
                width={100}
                height={100}
                // layout="responsive"
                className="w-full h-full"
              />
            </div>
            {/* </div> */}
            <div className="md:text-4xl text-xl font-bold text-white ">
              {/* <Image
                src={me}
                alt="logo"
                width={100}
                height={100}
                // layout="responsive"
                className="w-full h-full"
              /> */}
              <h2>MEWE</h2>
            </div>
            {/* <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 ">
              <Image
                src={we}
                alt="logo"
                width={100}
                height={100}
                // layout="responsive"
                className="w-full h-full"
              />
            </div> */}
          </div>

          <div className="text-base ">
            <p className="  text-white md:text-base sm:text-sm text-xs">
              Empowering entrepreneurs through innovative connections with
              investors to drive startup success.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 mt-1 sm:mt-2 md:mt-3 ">
            <a href={`mailto: contact@mewe.co.in`}>
              <div className="flex gap-2 sm:gap-3 md:gap-4 cursor-pointer items-center">
                <div>
                  <FlatIcon className="flaticon-email md:text-4xl sm:text-3xl text-2xl font-bold text-white  " />
                </div>
                <p className=" opacity-80 text-white md:text-base sm:text-sm text-xs ">
                  contact@mewe.co.in
                </p>
              </div>
            </a>

            <a href={`tel:91-7769881806`}>
              <div className="flex gap-2 sm:gap-3 md:gap-4 cursor-pointer items-center">
                <div>
                  <FlatIcon className="flaticon-phone md:text-4xl sm:text-3xl text-2xl font-bold text-white " />
                </div>
                <p className="md:text-base sm:text-sm text-xs opacity-80 text-white ">
                  +91-7769881806
                </p>
              </div>
            </a>
          </div>
        </div>
        {/* md:mb-[15px] sm:mb-[5px] mb-[1px]  */}
        <div className="grid w-full md:w-[53%] xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-2  gap-y-4  ">
          {DUMMY_DATA.map((item: any, idx: number) => {
            return (
              <div
                className=" flex flex-col gap-1 sm:gap-2 md:gap-3  "
                key={idx}
              >
                <h3 className=" font-bold md:text-xl sm:text-lg text-base text-white  ">
                  {item.heading}
                </h3>
                <div className="flex flex-col gap-1 sm:gap-2 md:gap-3 mt-4 cursor-pointer">
                  {item.subLinks.map((item: any, idx: number) => {
                    return (
                      <Link key={idx} href={`${item.href}`}>
                        <p className="md:text-base sm:text-sm text-xs opacity-80 text-white ">
                          {item.name}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className="border-b-[1.5px] border-[#e4e4e5] border-line"></div> */}

      <div className="w-full h-auto   relative bottom-0 z-30">
        <Image
          src={groupfooter}
          alt="groupfooter"
          width={1000}
          height={1000}
          // layout="responsive"
          className="w-full h-full"
        />

        <div
          className="flex  flex-col items-center justify-between gap-1.5 sm:gap-2.5 md:gap-3.5 lg:gap-5   absolute
        top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 md:-translate-y-1/3  w-full"
        >
          <div className=" flex gap-2 sm:gap-5 md:gap-8 items-center ">
            <a
              href={`https://www.instagram.com/mewe.ig?igsh=d2w5cHJ2cDVlbno5`}
              target="_blank"
              rel="noopener noreferrer"
              className="  w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8  cursor-pointer"
            >
              <Image
                src={instagram}
                alt="instagram"
                width={100}
                height={100}
                // layout="responsive"
                className="w-full h-full"
              />
            </a>
            <a
              href={`https://www.linkedin.com/company/mewe-connect/`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8  cursor-pointer"
            >
              <Image
                src={linkedin}
                alt="linkedin"
                width={100}
                height={100}
                layout="responsive"
                className="w-full h-full"
              />
            </a>
            <a
              href={`https://www.facebook.com/profile.php?id=61556929246770&mibextid=LQQJ4d`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 cursor-pointer"
            >
              <Image
                src={facebookImg}
                alt="facebook"
                width={100}
                height={100}
                layout="responsive"
                className="w-full h-full"
              />
            </a>
          </div>

          <div className="flex gap-1 sm:gap-2 md:gap-3 items-center ">
            <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4  ">
              <Image
                src={copyright}
                alt="copyright"
                width={100}
                height={100}
                layout="responsive"
                className="w-full h-full"
              />{" "}
            </div>
            <p className="text-[#e4e4e5] md:text-lg sm:text-sm text-xs font-medium text-center sm:text-start ">
              Me.We, 2024 All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
