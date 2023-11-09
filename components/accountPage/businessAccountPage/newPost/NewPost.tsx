"use client";
import React, { FC, useState } from "react";
import Image from "next/image";
import photoImg from "../../../../images/image (2).svg";
import docImg from "../../../../images/doc.svg";
import FlatIcon from "@/components/flatIcon/flatIcon";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
// import { log } from "console";

const NewPost = () => {
  const params = useSearchParams();
  const currTab = params.get("tab");
  const pathName = usePathname();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const labelStyle = "md:text-base text-sm text-primary font-semibold ";
  const inputStyle = " rounded-md px-3 py-3 outline-0 bg-transparent";
  
  const onPostHandler=async()=>{
    console.log("cliked");
    const postData={
        createdAt:new Date(),
        createdBy:{
            id:"",
            name:"",
            image: {
                mob: "",
                url: "",
                thumb: ""
            }
        },
        title: title,
            description: description,
            location: location,
            images: [{
                mob: "",
                url: "",
                thumb: ""
            }],
            stats: {
                totalLikes: 0,
                totalComments: 0
            }
    }
    

  }
  return (
    <div
      className={`  ${currTab === "new-post" ? "block" : "block"} ${
        pathName.includes("new-post")
          ? "block w-[100%] "
          : "sm:block hidden md:w-[60%] w-[100%]"
      }`}
    >
      {pathName.includes("new-post") && (
        <div
          onClick={() => {
            router.replace("/manage-posts");
          }}
          className="sm:mt-8 "
        >
          <FlatIcon className="flaticon-arrow-right rotate-180 text-2xl font-bold" />
        </div>
      )}
      <div className="md:text-xl text-lg text-primary font-bold  sm:my-8 my-4">
        <h1>Create A Post</h1>
      </div>
      <div className=" flex flex-col md:gap-8 gap-4">
        <div className="flex md:flex-row flex-col md:gap-10 gap-4 w-full ">
          <div className="md:w-[50%] w-full flex flex-col gap-2 ">
            <label className={`${labelStyle}`}>Post Title</label>
            <div className="flex items-center px-3 rounded-md  bg-[#F8FAFC] title-container">
              <div>
                <FlatIcon className="flaticon-edit text-2xl text-[#969798]" />
              </div>
              <input
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
                type="text"
                className={`${inputStyle}`}
                placeholder="Write a Post Title"
              />
            </div>
          </div>
          <div className="md:w-[50%] w-full flex flex-col gap-2 ">
            <label className={`${labelStyle}`}>Location</label>
            <div className="flex items-center px-3 rounded-md  bg-[#F8FAFC] location-container">
              <div>

                <FlatIcon className="flaticon-placeholder text-xl text-[#969798]" />
              </div>
              <input
              value={location}
              onChange={(e)=>setLocation(e.target.value)}
                type="text"
                className={`${inputStyle}`}
                placeholder="Enter location"
              />
            </div>
          </div>
        </div>
        <div className="w-full   flex flex-col gap-3 ">
          <label htmlFor="" className={`${labelStyle}`}>
            Description
          </label>
          <div className="bg-[#F8FAFC] rounded-md textarea-container">
            <textarea
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
              name=""
              id=""
              className="bg-transparent px-3 py-2 w-full outline-0"
              placeholder="Description"
              rows={4}
            ></textarea>
          </div>
        </div>
        <div className="flex flex-col md:gap-5 gap-3">
          <div className=" md:text-base text-sm text-primary font-semibold ">
            <h2>Photos and Videos</h2>
          </div>
          <div className="font-semibold text-[#9c9c9c] md:text-sm text-xs t">
            <h4>
              Upload content in the form of photos, videos, documents and PDF.
            </h4>
          </div>
          <div className="flex items-center gap-x-14">
            <div>
            <input placeholder='' type='file' 
            // accept="image/*"
             onChange={async (e) => {
                  // console.log(e.target.files[0],"from input");
                //   await uploadTask(e.target.files[0])
                }} id="post-Image" className='w-full hover:cursor-pointer   outline-none px-[10px] py-[7px] hidden rounded-md ' />
                <label htmlFor="post-Image" className="cursor-pointer"> <Image src={photoImg} alt="" /></label>
             
            </div>
            <div>
              <Image src={docImg} alt="" />
            </div>
          </div>
        </div>
        <div className="flex items-center md:gap-x-10 gap-x-4 sm:text-base text-xs">
          <div className="bg-primary w-[50%] text-center text-white px-8 sm:py-3 py-3 rounded-md cursor-pointer">
            <button>Post</button>
          </div>
          <Link
            href={{ pathname: "/account", query: { tab: "manage-posts" } }}
            className="bg-black w-[50%] text-center text-white px-5 sm:py-3 py-3 rounded-md cursor-pointer"
          >
            <div className="">
              <button>Cancel</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
