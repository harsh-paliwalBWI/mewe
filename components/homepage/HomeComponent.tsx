"use client";
import React from "react";
import Image from "next/image";
import Bannerheader from "./homesections/banner";
import InviteBanner from "./homesections/invitebanner";
import Category from "./homesections/categories";
import Bussiness from "./homesections/bussiness";
import Newsletter from "./homesections/newsletters";
import Posts from "./homesections/posts";
import Webniar from "./homesections/webniar";
import FlatIcon from "../flatIcon/flatIcon";
import Link from "next/link";

const HomeComponent = () => {
  return (
    <>
      <div className="w-full h-full ">
        <Bannerheader />
        <Category />
        <Webniar />
        <Bussiness />
        <Posts />
        <Newsletter />
        <InviteBanner />
      </div>
      <Link href={{ pathname: "/account", query: { tab: "chat" } }}>
        <div className="fixed bottom-0 right-3 px-1 sm:px-2 md:px-4 lg:px-6 py-1 sm:py-2 md:py-3 bg-[#054A91] cursor-pointer  text-white rounded-t-xl w-[15%] flex justify-center gap-1 sm:gap-2 md:gap-3 z-40">
          <h1 className="md:text-base sm:text-sm text-xs">CHAT</h1>
          <FlatIcon className="flaticon-down-right-2 text-white text-xs sm:text-sm md:text-base font-bold drop-shadow-2xl" />
        </div>
      </Link>
    </>
  );
};

export default HomeComponent;
