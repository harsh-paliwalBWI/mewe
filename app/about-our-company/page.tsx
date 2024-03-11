import MainAbout from "@/components/aboutPage/MainAbout";
import Image from "next/image";
import React from "react";
import about1 from "../../images/about 1.jpg";
import about2 from "../../images/about 2.jpg";
import about3 from "../../images/abou 3.jpg";

const DUMMY_DATA = {
  abouttext1: `At MeWe, we believe in the power of innovation and the transformative potential of connecting 
  entrepreneurs with capitalists. Our platform serves as the bridge where groundbreaking ideas meet the 
  necessary capital to thrive. Just as the name suggests, MeWe is where "Me" - the visionary entrepreneur - 
  meets "We" - the supportive capitalist community.`,
  abouttext2: `Our mission at MeWe is clear: to facilitate a dynamic exchange between entrepreneurs and capitalists, 
    fostering innovation and driving the growth of promising startups. We understand the challenges 
    entrepreneurs face in securing funding for their ventures and the complexities investors encounter in 
    identifying promising opportunities. MeWe exists to simplify this process and make meaningful connections 
    that fuel success. `,
  abouttext3k1: `MeWe provides a user-friendly platform where entrepreneurs can showcase their ideas, projects, and 
    startups, outlining their vision and funding requirements. Through detailed profiles and project descriptions, 
    entrepreneurs communicate their passion and potential to interested investors. `,
  abouttext3k2: `For capitalists and investors, MeWe offers a curated selection of innovative projects and startups across 
    various industries. With intuitive search and filter options, investors can explore opportunities aligned with 
    their interests, investment criteria, and risk appetite. MeWe facilitates direct communication between 
    entrepreneurs and capitalists, enabling meaningful discussions, due diligence, and investment decisions.`,
  abouttext4: `At MeWe, we're committed to empowering dreams and driving success stories. Whether you're an ambitious 
    entrepreneur seeking capital to bring your vision to life or a savvy investor searching for the next big 
    opportunity, MeWe provides the platform and support you need to achieve your goals. `,
  abouttext5: `Join us at MeWe and be part of a vibrant community dedicated to innovation, entrepreneurship, and 
    investment. Whether you're looking to fund a groundbreaking idea or invest in the future, MeWe is your 
    gateway to transformative opportunities and meaningful connections. Together, let's turn dreams into reality 
    and shape the future of innovation.`,
  abouttext6: `Ready to embark on your journey with MeWe? Sign up today to explore innovative projects, connect with 
    visionary entrepreneurs, and discover exciting investment opportunities. Follow us on social media and join 
    the conversation. At MeWe, the future is yours to create.`,
};

const AboutourCompany = async () => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center ">
        <div className="md:w-[48%] ">
          <div className=" relative  w-full h-[16rem] sm:h-[24rem] md:h-[30rem] bg-white bg-opacity-40">
            <Image
              src={about1}
              alt=""
              className="w-full h-full object-cover "
              width={1000}
              height={1000}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 md:w-[52%] bg-primary">
          <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 mx-8 sm:mx-12 md:mx-16 my-8 sm:my-12  md:my-auto">
            <h2 className="font-bold text-[#f6f8fb] text-2xl sm:text-3xl md:text-4xl ">
              About
            </h2>
            <p
              className=" text-white text-xs sm:text-sm md:text-base font-medium w-full md:w-[90%] "
              dangerouslySetInnerHTML={{ __html: DUMMY_DATA?.abouttext1 }}
            ></p>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-center gap-0  sm:gap-4 md:gap-7 lg:gap-10">
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 md:w-[52%]">
          <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 mx-8 sm:mx-12 md:mx-16 my-8 sm:my-12  md:my-auto ">
            <h2 className="font-semibold  text-2xl sm:text-3xl md:text-4xl ">
              Our Mission: Facilitating Innovation and Investment
            </h2>
            <p
              className=" text-black text-xs sm:text-sm md:text-base font-medium w-full md:w-[90%]"
              dangerouslySetInnerHTML={{ __html: DUMMY_DATA?.abouttext2 }}
            ></p>
          </div>
        </div>
        <div className="md:w-[48%] ">
          <div className=" relative  w-full h-[16rem] sm:h-[24rem] md:h-[30rem] bg-white bg-opacity-40">
            <Image
              src={about2}
              alt=""
              className="w-full h-full object-cover "
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-0  sm:gap-4 md:gap-7 lg:gap-10 bg-[#262626]">
        <div className="md:w-[48%] ">
          <div className=" relative   h-[13rem] sm:h-[20rem] md:h-[27rem] mx-6 sm:mx-8 md:mx-10 my-4 sm:my-7 md:my-10 rounded-full overflow-hidden border-2 border-white">
            <Image
              src={about3}
              alt=""
              className="w-full h-full object-cover "
              width={1000}
              height={1000}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 md:w-[52%] ">
          <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 mx-8 sm:mx-12 md:mx-16 my-8 sm:my-12  md:my-auto">
            <h2 className="font-bold text-[#f6f8fb] text-2xl sm:text-3xl md:text-4xl ">
              How MeWe Works: Connecting Visionaries with Capital
            </h2>
            <p
              className=" text-white text-xs sm:text-sm md:text-base font-medium w-full md:w-[90%]  mb-4"
              dangerouslySetInnerHTML={{ __html: DUMMY_DATA?.abouttext3k1 }}
            ></p>
            <p
              className=" text-white text-xs sm:text-sm md:text-base font-medium w-full md:w-[90%] "
              dangerouslySetInnerHTML={{ __html: DUMMY_DATA?.abouttext3k2 }}
            ></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutourCompany;
