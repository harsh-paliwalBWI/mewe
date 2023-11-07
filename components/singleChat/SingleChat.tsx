"use client";
import React from "react";
import profileImg from "../../images/Ellipse 31.svg";
import Image from "next/image";
import FlatIcon from "../flatIcon/flatIcon";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const SingleChat = () => {
  const pathName = usePathname();
  const router = useRouter();

  return (
    <div className="">
      {pathName.includes("chat-page") && (
        <div
          onClick={() => {
            router.replace("/all-chats");
          }}
          className=""
        >
          <FlatIcon className="flaticon-arrow-right  sm:mt-5 sm:mb-3 mb-3 mt-3 rotate-180 text-2xl font-bold" />
        </div>
      )}
      <div>
        <h2 className="sm:text-xl text-lg font-bold text-primary mb-5">
          Chat Here{" "}
        </h2>
      </div>
      <div
        className={` border-t  border-t-black border-b border-b-black border-r border-r-black w-[100%] relative  min-h-[100%]  rounded-md sm:px-5 px-3 sm:py-5 py-3 ${
          pathName.includes("chat-page")
            ? "block  w-[100%]  border border-black"
            : "sm:block hidden  w-[100%]"
        }`}
      >
        <div className=" min-h-[80vh] w-full relative ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-[55px] h-[55px] rounded-full ">
                <Image
                  src={profileImg}
                  alt=""
                  height={1000}
                  width={1000}
                  className="h-[100%] w-[100%] rounded-full object-fill"
                />
              </div>

              <div className="sm:text-lg text-base font-semibold ">
                <h2>Formonix</h2>
              </div>
            </div>
            <div className="flex flex-col gap-1  sm:w-[53px] sm:h-[53px] h-[35px] w-[35px] bg-[#F3F7FA] rounded-full items-center justify-center">
              <FlatIcon className="flaticon-options rotate-90 text-black sm:text-3xl text-xl" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full">
            <div className="flex flex-col gap-4">
              <div className="flex items-end gap-4">
                <div className="w-[40px] h-[40px] rounded-full ">
                  <Image
                    src={profileImg}
                    alt=""
                    height={1000}
                    width={1000}
                    className="h-[100%] w-[100%] rounded-full object-fill"
                  />
                </div>
                <div className="relative">
                  <div className="bg-[#F3F7FA] sm:text-sm text-xs font-medium  p-3 rounded-md">
                    <p>
                      Donec sed erat ut magna <br /> suscipit mattis. Aliquam
                      erat <br /> volutpat.
                    </p>{" "}
                  </div>
                  <div className="flex text-xs items-center  absolute bottom-[5px] right-[10px]">
                    <div>
                      <FlatIcon className="flaticon-readed text-primary text-2xl" />
                    </div>
                    <p className="text-xs font-semibold text-primary">2:38</p>
                  </div>
                </div>
              </div>
              <div className="flex items-end gap-4">
                <div className="w-[40px] h-[40px] rounded-full ">
                  <Image
                    src={profileImg}
                    alt=""
                    height={1000}
                    width={1000}
                    className="h-[100%] w-[100%] rounded-full object-fill"
                  />
                </div>
                <div className="relative">
                  <div className="bg-[#F3F7FA] sm:text-sm text-xs font-medium  p-3 rounded-md">
                    <p>
                      <span className="font-semibold">Formonix</span> is
                      typing....
                    </p>{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center w-full gap-3 mt-4  ">
              <div className="bg-[#4d4d4d] flex  items-center sm:w-[95%] w-[80%] px-5 rounded-full py-3 msg-container">
                <input
                  type="text"
                  className="bg-transparent w-[100%] outline-0"
                  placeholder="Type something..."
                />
                <p>
                  <FlatIcon className="flaticon-send text-white sm:text-xl text-base" />
                </p>
              </div>
              <div className="bg-[#4d4d4d] sm:w-[54px] sm:h-[54px] w-[45px] h-[45px] flex items-center  justify-center text-white   rounded-full">
                <button>
                  <FlatIcon className="flaticon-plus text-white md:text-2xl text-sm font-medium" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleChat;
