"use client"
import React from "react";
import Image from "next/image";
import Bannerheader from "./homesections/banner";
import InviteBanner from "./homesections/invitebanner";
import Category from "./homesections/categories";
import Bussiness from "./homesections/bussiness";
import Newsletter from "./homesections/newsletters";
import Posts from "./homesections/posts";
import Webniar from "./homesections/webniar";

const HomeComponent = () => {
  return (
    <div className="w-full h-full ">
      <Bannerheader />
      <Category />
      <Webniar/>
      <Bussiness />
      <Posts />
      <Newsletter />
      <InviteBanner />
    </div>
  );
};

export default HomeComponent;
