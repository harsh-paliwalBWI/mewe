import React from "react";
import Image from "next/image";
import bannerbg from "../../../images/bannerimage.svg";

const Bannerheader = () => {
  return (
    <div>
      <div className="h-auto w-full relative">
        <Image
          src={bannerbg}
          alt="image"
          width={1000}
          height={100}
          layout="responsive"
          className="object-fill w-full h-full"
        />

        <div className="absolute w-fit  top-1/3 left-[-10px] transform translate-x-1/4 -translate-y-1/3 flex flex-col justify-center  md:gap-3    border-2 border-black">
          <h2 className="text-lg md:text-2xl font-bold text-[#054A91] my-2">
            A Startup Community
          </h2>

          <p className="font-bold text-black text-5xl">Connect. Learn. Grow.</p>


          <div className=" w-[40%] flex mt-48  justify-center  items-center md:gap-3 rounded-lg  px-8  py-2 bg-[#054A91]">
          <h2 className="text-base md:text-lg  text-white ">
          Start Now
          </h2>

        </div>
        </div>

        

      </div>
    </div>
  );
};

export default Bannerheader;
