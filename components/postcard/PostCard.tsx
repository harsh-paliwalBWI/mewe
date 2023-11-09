"use client";
import React from "react";

// import CategoryCard from "./categoryCard/CategoryCard";
import profile from "../../images/a5 2.svg";
import img1 from "../../images/abstract-virtual-fingerprint-illustration-modern-coworking-room-background-personal-biometric-data-concept-multiexposure 1.svg";
import img2 from "../../images/modern-luxury-hotel-office-reception-lounge-with-meeting-room 1.svg";

import Image from "next/image";
import FlatIcon from "../flatIcon/flatIcon";
import { Carousel } from "antd";

// export function calculateTimeDifference(createdAt:any) {
//   const now = new Date();
//   const timeDifference = now - createdAt;

//   // Calculate days, hours, minutes, and seconds
//   const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//   const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
//   // Construct the result string
//   let result = '';
//   if (days > 0) {
//     result += `${days} Days `;
//   }
//   if (hours > 0) {
//     result += `${hours} Hours `;
//   }
//   result += 'ago';

//   return result;
// }



const PostCard = (singlePost: any) => {


  
  
  let singlePostdata = singlePost.singlePost;
  console.log(singlePostdata,"ffff")
  return (
    <div className="flex flex-col justify-center gap-1 sm:gap-2 md:gap-3  bg-[#f7f9fb] p-4 sm:p-6 md:p-8 ">
      <div className=" flex items-center justify-between ">
        <div className=" flex items-center  gap-2 sm:gap-3 md:gap-4 ">
          <div className="w-8 h-8 sm:w-12 sm:h-12  md:w-16 md:h-16  rounded-full  overflow-hidden">
            <Image
              src={profile
                //  singlePostdata?.createdBy?.image?.url &&
                // singlePostdata?.createdBy?.image?.url?.includes("bwi-mewe.appspot")
                //   ? profile
                //   : singlePostdata?.createdBy?.image?.url
                }
              alt=""
              width={1000}
              height={1000}
              className="h-full w-full object-cover "
            />
          </div>
          <div className="flex flex-col gap-0.5 md:gap-1 ">
            <div className="flex  gap-1 sm:gap-2 md:gap-3 items-center ">
              <h2 className="text-[#205d9d] text-sm sm:text-base md:text-lg font-medium ">
                Code Fusion
                {/* {singlePostdata?.createdBy?.name} */}
              </h2>
              <span className="h-0.5 w-0.5 sm:h-1 sm:w-1 md:h-1.5 md:w-1.5 bg-[#205d9d] aspect-square rounded-full text-center"></span>
              <p className="  text-[#626565] md:text-base sm:text-sm text-xs font-medium  h-fit ">
                5mins ago
                {/* {calculateTimeDifference(singlePostdata?.createdAt)} */}
              </p>
            </div>

            <p className=" text-[#626565] md:text-base sm:text-sm text-xs font-medium">
              {/* @codefusion243 */}{singlePostdata?.createdBy?.name}
            </p>
          </div>
        </div>
        <FlatIcon className="flaticon-options md:text-3xl sm:text-2xl text-xl text-[#054A91]  " />
      </div>

      <div className="relative rounded sm:rounded-lg md:rounded-xl">
        <Carousel dotPosition="bottom"
         className="dot-white" autoplay>

{/* {singlePostdata?.images?.map((singleImg: any, idx: number) => {
          return (
            
            <div className="h-auto w-full  rounded sm:rounded-lg md:rounded-xl  overflow-hidden ">
            
            <Image
              src={img2
                // singleImg?.url &&
                // singleImg.url?.includes("bwi-mewe.appspot")
                //   ? img2
                //   :singleImg?.url}
                //   width={1000}
                //   height={1000
              }
              alt=""
              className="h-full w-full object-contain "
            />
          </div>
          );
        })} */}
          



          <div className="h-auto w-full  rounded sm:rounded-lg md:rounded-xl overflow-hidden ">
            <Image
              src={img2}
              alt=""
              className="h-full w-full object-contain "
            />
          </div>
          <div className="h-auto w-full rounded sm:rounded-lg md:rounded-xl overflow-hidden ">
            <Image
              src={img2}
              alt=""
              className="h-full w-full object-contain "
            />
          </div>
        </Carousel>

        <div className=" flex justify-between bg-[#054a91] py-1 sm:py-2 md:py-3 px-3 sm:px-4 md:px-5  absolute bottom-0 transform translate-y-1/2 w-full  rounded-b sm:rounded-b-lg md:rounded-b-xl">
          <div className=" flex gap-2 sm:gap-3 md:gap-4">
            <FlatIcon className="flaticon-heart md:text-2xl sm:text-xl text-lg font-bold text-white " />
            <FlatIcon className="flaticon-chat md:text-2xl sm:text-xl text-lg font-bold text-white " />
          </div>

          <FlatIcon className="flaticon-send md:text-2xl sm:text-xl text-lg font-bold text-white " />
        </div>
      </div>

      <div className="flex-col gap-1 sm:gap-2 md:gap-3 mt-6 sm:mt-8 md:mt-10 mb-2 sm:mb-3 md:mb-4 ">
        <h2 className="font-semibold  text-gray-800 md:text-xl sm:text-lg text-base ">
          Deliver Conference
          {/* {singlePostdata?.title} */}
        </h2>
        <div className=" text-gray-400 md:text-xs sm:text-[10px] text-[8px] font-normal ">
          Eth2Vec: Learning contract-wide code representations for vulnerability
          detection on Ethereum smart cEth2Vec: Learning contract-wide code
          representations for vulnerability detection on Ethereum smart c
          {/* {singlePostdata?.description} */}
        </div>
      </div>

      <input
        className=" border-2 border-gray-300  w-full px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 text-gray-300 
        text-[10px] sm:text-xs md:text-sm font-normal bg-white rounded-full "
        placeholder="Write something.."
      />
    </div>
  );
};

export default PostCard;
