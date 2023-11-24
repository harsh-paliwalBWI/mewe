"use client";
import { usePathname } from "next/navigation";
import React from "react";

const Loading = () => {
  const pathname = usePathname();
  return (
    <div className="w-full min-h-[60vh]  flex items-center justify-center ">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
