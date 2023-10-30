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
          height={1000}
          layout="responsive"
          className="object-fill w-full h-full"
        />
        {/* sm:max-w-[65%] md:max-w-[70%] lg:max-w-[75%] */}
        <div className="max-w-[65%]   absolute w-fit  top-1/3 left-[-35px] sm:left-[-40px] md:left-[-45px] lg:left-[-50px] transform translate-x-1/4 -translate-y-1/3 flex flex-col justify-center gap-1 sm:gap-2 md:gap-3   ">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#054A91] my-0 sm:my-0.5 md:my-1 lg:my-2">
            A Startup Community
          </h2>

          <p className="font-bold text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Connect. Learn. <span className="text-[#054A91]">Grow.</span> 
          </p>

          <div className=" w-[40%] flex mt-0 sm:mt-16 md:mt-32 lg:mt-48  justify-center  items-center rounded sm:rounded-md md:rounded-lg px-2 sm:px-4 md:px-6 lg:px-8 py-0.5 sm:py-1 md:py-2 bg-[#054A91] cursor-pointer">
            <h2 className="text-xs sm:text-sm md:text-base lg:text-lg  text-white ">
              Start Now
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bannerheader;
