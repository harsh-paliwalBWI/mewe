"use client";
import React, { useEffect, useState } from "react";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
const ChatButton = () => {
  const pathName = usePathname();

  const params = useSearchParams();
  const currTab = params.get("tab");

  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const targetPath = windowWidth < 480 ? "/all-chats" : "/account";
  const queryParams = targetPath === "/account" ? { tab: "chat" } : {};

  return (
    <Link href={{ pathname: targetPath, query: queryParams }}>
      <div
        className={`fixed bottom-0 right-3 px-1 sm:px-2 md:px-4 lg:px-6 py-1 sm:py-2 md:py-3 bg-[#054A91] cursor-pointer  rounded-t sm:rounded-t-lg  md:rounded-t-xl w-[15%] flex justify-center gap-1 sm:gap-2 md:gap-3 z-40 shadow-inner  shadow-white border border-[#054A91] ${
          pathName.includes("welcome") ||
          pathName.includes("signup") ||
          pathName.includes("signin") ||
          pathName.includes("all-chats") ||
          pathName.includes("chat-page") ||
          pathName.includes("verification")
            ? "hidden"
            : "block"
        }
        
        ${currTab === "chat" ? "hidden" : "block"}
        
        `}
      >
        <h1 className="md:text-base sm:text-sm text-xs text-white md:tracking-widest">
          MY CHATS
        </h1>
      </div>
    </Link>
  );
};

export default ChatButton;
