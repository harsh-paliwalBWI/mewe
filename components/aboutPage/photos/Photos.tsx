"use client";
import React, { FC } from "react";
import img1 from "../../../images/html-system-websites-concept.svg";
import img2 from "../../../images/html-css-collage-concept-with-person.svg";
import img3 from "../../../images/person-front-computer-working-html 1.svg";
import img4 from "../../../images/representation-user-experience-interface-design-computer.svg";
import img5 from "../../../images/businessman-hold-graph-arrow-positive-growth-icon-pointing-creative-business-chart-with-upward-arrows-financial-business-growth-concept-low-polygonal-increased-sales-increased-value 1.svg";
import img6 from "../../../images/businessman-showing-changes-report 1.svg";
import img7 from "../../../images/programming-background-collage 1.svg";
import img8 from "../../../images/turned-gray-laptop-computer 1.svg";
import img9 from "../../../images/html-css-collage-concept-with-person (1) 1.svg";
import Image from "next/image";
import FlatIcon from "@/components/flatIcon/flatIcon";
import { useQuery } from "@tanstack/react-query";
import { fetchStartupImages } from "@/services/postService";

const DummyData = [
  { imgSrc: img1 },
  { imgSrc: img2 },
  { imgSrc: img3 },
  { imgSrc: img4 },
  { imgSrc: img5 },
  { imgSrc: img6 },
  { imgSrc: img7 },
  { imgSrc: img8 },
  { imgSrc: img9 },
];

interface Props {
  aboutInfo: any;
}

const Photos: FC<Props> = ({ aboutInfo }) => {
  //   console.log(aboutInfo, "yyyy");

  const { data: startupimages } = useQuery({
    queryKey: ["startupimages", aboutInfo?.id],
    queryFn: () => fetchStartupImages(aboutInfo?.id),
  });

  //   console.log(startupimages, "xzxzxzx");

  return (
    <>
      {startupimages && startupimages?.length <= 0 ? (
        <div className="text-base text-center md:h-[58vh] h-[30vh] bg-[#F8FAFC] flex items-center justify-center text-primary ">
          <h1>No Images Available !</h1>
        </div>
      ) : (
        <div className=" w-full bg-[#F8FAFC] xl:px-8 px-4 xl:pt-14 py-7">
          <div className="grid md:grid-cols-3 sm:grid-cols-2  grid-cols-1 w-full gap-x-3 gap-y-6">
            {startupimages?.map((item: any, idx: number) => {
              return (
                <div key={idx} className="w-60 h-40 rounded-[5px] ">
                  <Image
                    src={item}
                    alt=""
                    height={1000}
                    width={1000}
                    className="object-contain h-full w-full"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              );
            })}
          </div>
          {/* <div className="flex justify-center xl:py-14 pt-7">
        <div className="text-center flex justify-center bg-primary w-fit text-white px-10 py-3 rounded-md cursor-pointer">
          <button className="flex items-center gap-3">
            <FlatIcon className="flaticon-reload" />
            <h3 className="xl:text-base text-xs  font-medium">Load More</h3>
          </button>
        </div>
      </div> */}
        </div>
      )}
    </>
  );
};

export default Photos;
