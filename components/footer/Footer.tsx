"use client";
import React from "react";
import logo from "../../images/ME_WE.svg";
import Image from "next/image";
import me from "../../images/me.svg";
import we from "../../images/we.svg";
import groupfooter from "../../images/Group footer.svg";
import letter from "../../images/letter 1.svg";

import FlatIcon from "../flatIcon/flatIcon";



import facebookImg from "../../images/facebook.svg";
import instagram from "../../images/instagram.svg";
import linkedin from "../../images/linkedin.svg";
import copyright from "../../images/c.svg";
import Link from "next/link";
const Footer = () => {

  const DUMMY_DATA = [
    {
        heading: "SITEMAP",
        subLinks: [
            { name: "Home", href: "home" },
            { name: "About", href: "about" },
            { name: "Explore", href: "explore" },
            { name: "Scheme", href: "scheme" },
            { name: "Financials", href: "financials" },
            { name: "Account", href: "account" },
        ],
    },
    {
        heading: "CATEGORY",
        subLinks: [
            { name: "Education", href: "education" },
            { name: "Health", href: "health" },
            { name: "Food", href: "food" },
            { name: "Travel", href: "travel" },
            { name: "Industry", href: "industry" },
            { name: "Real Estate", href: "real-estate" },
            { name: "Government", href: "government" },
        ],
    },
    {
        heading: "ACCOUNT",
        subLinks: [
            { name: "Posts", href: "posts" },
            { name: "Chats", href: "chats" },
            { name: "Notification", href: "notification" },
            { name: "Terms & Conditions", href: "terms-and-conditions" },
            { name: "Privacy Policy", href: "privacy-policy" },
            { name: "FAQS", href: "faqs" },
        ],
    },
];




  return (
    <div className="bg-[#272726] w-full h-fit  border-2 border-black bottom-0 ">
 <div className="px-body py-12  flex flex-col md:flex-row justify-between ">
 <div className=" flex gap-5 items-center border-2 border-white">
        <div className="w-16 h-16  ">
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

 </div>
<hr className="h-3 bg-white"></hr>

      <div className="px-body  flex flex-col md:flex-row justify-between border-2 border-black pt-16">
        <div className=" flex flex-col gap-6  w-full md:w-[40%]  border-2 border-white ">
        <div className=" flex gap-4 items-center border-2 border-white">
        <div className="w-20 h-20  ">
              <Image
                src={logo}
                alt="logo"
                width={100}
                height={100}
                // layout="responsive"
                className="w-full h-full"
              />
            </div>
            <div className="w-15 h-15  ">
              <Image
                src={me}
                alt="logo"
                width={100}
                height={100}
                layout="responsive"
                className="w-full h-full"
              />
            </div>
            <div className="w-15 h-15  ">
              <Image
                src={we}
                alt="logo"
                width={100}
                height={100}
                layout="responsive"
                className="w-full h-full"
              />
            </div>
        </div>
        
          <div className="text-base border-2 border-white">
             <p className=" opacity-80 text-white ">Full | Driving house with dirty bassline, huge beats, soulful male vocal. Driving house with dirty bassline, huge beats, soulful male vocal, vocal FX & heavy synths</p>
            </div>

          <div className="flex flex-col gap-4 mt-3  border-2 border-white">
            <div className="flex gap-4 cursor-pointer items-center">
              <div>
                <FlatIcon className="flaticon-contact-1 text-4xl font-bold text-white  " />
              </div>
              <p className="text-base opacity-80 text-white  ">
              me.we23@gmail.com
              
              </p>
            </div>
            <div className="flex gap-4 cursor-pointer items-center">
              <div>
                <FlatIcon className="flaticon-contact text-4xl font-bold text-white " />
              </div>
              <p className="text-base opacity-80 text-white ">
              011-34-3922835
              </p>
            </div>

            
            
          </div>
        </div>

        <div className="grid w-full md:w-[53%] xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  gap-y-4 sm:mb-[60px] mb-[40px]  border-2 border-red-800">
          {DUMMY_DATA.map((item: any, idx: number) => {
            return (
              <div className=" flex flex-col gap-3  " key={idx}>
                <h3 className=" relative font-bold md:text-xl text-base text-white  ">
                  {item.heading}
                 
                </h3>
                <div className="flex flex-col gap-4 mt-4 cursor-pointer">
                  {item.subLinks.map((item: any, idx: number) => {
                    return (
                      <Link key={idx} href={`${item.href}`}>
                        <p className="text-base opacity-80 text-white ">
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
      

      <div className="w-full h-auto relative bottom-0">
              <Image
                src={groupfooter}
                alt="logo"
                width={100}
                height={100}
                layout="responsive"
                className="w-full h-full"
              />
            </div>

           
        <div className="flex  flex-col items-center sm:justify-between gap-x-4 gap-y-4   py-3 px-body relative
        top-0 left-1/2 -translate-x-1/2 -translate-y-[140px] border-2 border-black">
        <div className=" flex gap-4 items-center ">
        <div className="w-8 h-8  ">
              <Image
                src={instagram}
                alt="instagram"
                width={100}
                height={100}
                // layout="responsive"
                className="w-full h-full"
              />
            </div>
            <div className="w-8 h-8  ">
              <Image
                src={linkedin}
                alt="linkedin"
                width={100}
                height={100}
                layout="responsive"
                className="w-full h-full"
              />
            </div>
            <div className="w-8 h-8  ">
              <Image
                src={facebookImg}
                alt="facebook"
                width={100}
                height={100}
                layout="responsive"
                className="w-full h-full"
              />
            </div>
        </div>


        <div className="flex gap-3 items-center">
        <div className="w-4 h-4  ">
          <Image
                src={copyright}
                alt="copyright"
                width={100}
                height={100}
                layout="responsive"
                className="w-full h-full"
              /> </div>
        <p className="text-[#e4e4e5] md:text-lg text-base font-medium text-center sm:text-start ">
       
              Me.We, 2023 All rights reserved.
        </p></div>
       
      </div>

    </div>
  );
};

export default Footer;
