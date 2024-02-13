"use client";
import React, { FC, useRef, useState } from "react";
import Image from "next/image";
import photoImg from "../../../../images/image (2).svg";
import docImg from "../../../../images/doc.svg";
import FlatIcon from "@/components/flatIcon/flatIcon";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import avatarimg from "../../../../images/avatar.png";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchAcceptedFollowings, getStartUpData, getTaggedStartupsData } from "@/services/startupService";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/config/firebase-config";
import { toast } from "react-toastify";
import Loader from "@/components/loader/Loader";
import Modal from "@/components/Modal/modal";
import { CircularProgress } from "@mui/material";
import { getCookie } from "cookies-next";

const labelStyle = "lg:text-base text-sm text-primary font-semibold ";
const inputStyle = " rounded-md px-3 py-3 outline-0 bg-transparent text-sm w-full";

const NewPost = () => {
  const { data: startUpData } = useQuery({
    queryKey: ["startUpData"],
    queryFn: () => getStartUpData(null),
  });
  // console.log(startUpData, "from new post page ");

  const { data: taggedStartupsData } = useQuery({
    queryKey: ["taggedStartupsData"],
    queryFn: () => getTaggedStartupsData(cookies),
  });
  // console.log("taggedStartupsData--------",taggedStartupsData);

  const cookies = { value: getCookie("uid") };
  const params = useSearchParams();
  const currTab = params.get("tab");
  const pathName = usePathname();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [images, setImages] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchedTerm, setSearchedTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [taggedStartups, setTaggedStartups] = useState<any>([])
  const [isSearchResult, setIsSearchResults] = useState(false)
  const [isNoResultVisible, setIsNoResultVisible] = useState(false);

  const renderSearchResults = (searchTerm: any) => {
    // console.log("searchTerm",searchTerm);
    if (searchTerm && taggedStartupsData && taggedStartupsData.length > 0) {
      const res: any = taggedStartupsData.filter((item: any, idx: number) => {
        if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return item;
        }
      });
      setIsSearchResults(true);
      setSearchResults(res);
      setIsNoResultVisible(res.length === 0);
    } else {
      setIsSearchResults(false);
      setSearchResults([]);
      setIsNoResultVisible(false);
    }
  };

  const onTagHandler = async (taggedStartup: any) => {
    let userObj = {
      id: taggedStartup?.id,
      name: taggedStartup?.name,
      slug: taggedStartup.slug?.name ? taggedStartup.slug?.name : ""
    };
    const isDuplicate = taggedStartups.some((startup: any) => startup.id === taggedStartup?.id);
    if (isDuplicate) {
      toast.error("Already tagged!")
      return;
    } else {
      setTaggedStartups((prev: any) => {
        return [userObj, ...prev];
      });
    }
    // console.log("userObj", userObj, taggedStartup);
    setSearchedTerm("");
    setIsSearchResults(false);
  };

  const removeTaggedStartup = (indexToRemove: number) => {
    setTaggedStartups((prev: any) => {
      const updatedTaggedStartups = [...prev];
      updatedTaggedStartups.splice(indexToRemove, 1);
      return updatedTaggedStartups;
    });
    toast.success("Removed.")
  };
  const removeImage = (indexToRemove: number) => {
    setImages((prev: any) => {
      const updatedImages = [...prev];
      updatedImages.splice(indexToRemove, 1);
      return updatedImages;
    });
    toast.success("Image removed.");
  };

  const uploadImage = async (userPic: any) => {
    setIsModalOpen(true);
    if (userPic) {
      let timeStamp = (new Date()).getMilliseconds()
      const storage = getStorage();
      const storageRef = ref(storage, `${userPic.name}___${timeStamp}`);
      await uploadBytes(storageRef, userPic).then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then(async (downloadURL) => {
          let imgObj = {
            mob: downloadURL,
            url: downloadURL,
            thumb: downloadURL,
          };
          setImages((prev: any) => {
            return [imgObj, ...prev]
          })
          toast.success("Image uploaded.")
          setImage(downloadURL)
          setIsModalOpen(false)
        })
      })
    } else {
      toast.error("Failed to upload image !")
      setIsModalOpen(false)
    }
  };

  async function uploadTask(userPic: any) {
    await uploadImage(userPic);
  }

  const onPostHandler = async () => {
    try {
      setLoading(true)
      if (title && location && description && images.length > 0) {
        // console.log("inside first if");
        if (startUpData.id) {
          // console.log(startUpData,"datatttt");
          const postData = {
            createdAt: new Date(),
            createdBy: {
              id: startUpData.id,
              name: startUpData.name,
              image: {
                mob: startUpData?.basic?.coverPic?.mob ? startUpData?.basic?.coverPic?.mob : "",
                url: startUpData?.basic?.coverPic?.url ? startUpData?.basic?.coverPic?.url : "",
                thumb: startUpData?.basic?.coverPic?.thumb ? startUpData?.basic?.coverPic?.thumb : ""
              }
            },
            category: {
              id: startUpData?.basic?.category?.id ? startUpData?.basic?.category?.id : "",
              name: startUpData?.basic?.category?.name ? startUpData?.basic?.category?.name : "",
            },
            title: title,
            description: description,
            location: location,
            images: images,
            taggedStartups: taggedStartups,
            stats: {
              totalLikes: 0,
              totalComments: 0,
            },
          };
          // console.log(postData, "data saved");
          await addDoc(collection(db, "posts"), postData);
          setLoading(false)
          toast.success("Posted")
          setTitle("")
          setLocation("")
          setDescription("")
          setImages([])
          setTaggedStartups([])
        } else {
          setLoading(false);
          toast.error(`Some error occured !`);
        }
      } else {
        setLoading(false);
        if (!title || !description || !location) {
          toast.error("Please fill all the fields !");
        } else if (images.length < 1) {
          toast.error("Please upload image(s) !");
        }
        // toast.error("Please fill all the fields")
      }
    } catch (error) {
      // console.log(error);
      setLoading(false)
      toast.error(`${error}`);
    }
  };

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
        <div className="grid sm:grid-cols-2 grid-cols-1 md:gap-10 gap-4 w-full ">
          {/* <div className="flex md:flex-row flex-col md:gap-10 gap-4 w-full "> */}
          <div className=" flex flex-col gap-2 ">
            <label className={`${labelStyle}`}>Post Title</label>
            <div className="flex items-center px-3 rounded-md  bg-[#F8FAFC] title-container">
              <div>
                <FlatIcon className="flaticon-edit text-2xl text-[#969798]" />
              </div>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className={`${inputStyle}`}
                placeholder="Write a Post Title "
              />
            </div>
          </div>
          <div className=" flex flex-col gap-2 ">
            <label className={`${labelStyle}`}>Location</label>
            <div className="flex items-center px-3 rounded-md  bg-[#F8FAFC] location-container">
              <div>
                <FlatIcon className="flaticon-placeholder text-xl text-[#969798]" />
              </div>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
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
          <div className="bg-[#F8FAFC] w-full rounded-md textarea-container ">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name=""
              id=""
              className="bg-transparent px-3 py-2 w-full outline-0"
              placeholder="Description"
              rows={4}
            ></textarea>
          </div>
        </div>
        <div className="flex flex-col md:gap-2 gap-3  ">
          <div className=" lg:text-base text-sm text-primary font-semibold ">
            <h2>Tag Startups
            </h2>
          </div>
          <div className="font-semibold text-[#9c9c9c] md:text-sm text-xs t">
          </div>
          <div className="relative flex justify-between items-center gap-4 w-full rounded-md bg-[#F8FAFC] px-3 title-container">
            <div className="flex items-center gap-2 w-full">
            <div>
              <FlatIcon className="flaticon-user text-[#9c9c9c] text-2xl"/>
            </div>
            <input
              value={searchedTerm}
              onChange={(e) => {
                setSearchedTerm(e.target.value)
                renderSearchResults(e.target.value)
              }}
              type="text" name="" id="" placeholder="Search here..."
              className="py-3 rounded-md outline-0 w-[100%] bg-[#F8FAFC] text-sm " />
              </div>
            {searchedTerm &&
              <div onClick={() => setSearchedTerm("")} className="flex items-center justify-center cursor-pointer">
                <FlatIcon className="flaticon-close text-[red] text-base" />
              </div>
            }
            {searchedTerm && isSearchResult && searchResults && searchResults.length > 0 &&
              <div className="max-h-[300px] overflow-y-scroll shadow-xl flex flex-col gap-2   absolute left-0 top-[50px] px-3 py-3 rounded-md z-10 bg-[#F8FAFC] md:w-[50%] w-[100%]">
                {
                  searchResults && searchResults.length > 0 && searchResults.map((item: any, idx: any) => {
                    return <div key={idx}
                      onClick={async () => onTagHandler(item)}
                      className="text-sm bg-white w-full py-1.5  px-3 cursor-pointer">
                      {item.name}
                    </div>
                  })
                }
              </div>
            }
            {searchedTerm && isNoResultVisible && (
              <div className=" absolute left-0 top-[50px] px-3 py-3 rounded-md z-10 bg-[#F8FAFC] shadow-xl md:w-[50%] w-[100%] text-sm  ">
                No results found with &#8223;{searchedTerm}&#8221;
              </div>
            )}
          </div>
          {taggedStartups && taggedStartups.length > 0 &&
            <div className="flex items-center gap-4 mt-2">
              {
                taggedStartups && taggedStartups.length > 0 && taggedStartups.map((item: any, idx: number) => (
                  <div key={idx} className="text-black text-sm relative bg-[#F8FAFC] p-2 rounded-md shadow-md">
                    <div className=" bg-white px-3 py-1 rounded-md">
                    {item.name}
                    {/* {idx < taggedStartups.length - 1 && ','} */}
                    <div className="absolute right-1 top-1 cursor-pointer" onClick={() => removeTaggedStartup(idx)}>
                      <FlatIcon className="flaticon-close text-[red] text-xs" />
                    </div>
                    </div>
                  </div>
                ))
              }
            </div>
          }

        </div>
        <div className="flex flex-col md:gap-2 gap-3 ">
          <div className=" lg:text-base text-sm text-primary font-semibold ">
            <h2>
              Photos
              {/* and Videos */}
            </h2>
          </div>
          <div className="font-semibold text-[#9c9c9c] md:text-sm text-xs t">
            <h4>
              Upload content in the form of photos.
              {/* , videos, documents and PDF. */}
            </h4>
          </div>
        </div>

        {images && images.length < 5 && (
          <div className="flex items-center gap-x-14 md:mt-0 mt-4">
            <div>
              <input
                placeholder=""
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  if (!e.target.files) return;
                  await uploadTask(e.target.files[0]);
                }}
                id="post-Image"
                className="w-full hover:cursor-pointer   outline-none px-[10px] py-[7px] hidden rounded-md "
              />
              <label
                htmlFor="post-Image"
                className="cursor-pointer text-white bg-primary px-4 py-2.5 rounded-md sm:text-sm text-xs"
              >
                Choose image
              </label>
            </div>
          </div>
        )}
        

        <Modal isOpen={isModalOpen} setOpen={setIsModalOpen}>
          <div className="flex flex-col gap-2 justify-center items-center">
            <CircularProgress className="!text-white"></CircularProgress>
            <p className="text-white font-medium text-lg">
              Uploading image...
            </p>
          </div>
        </Modal>
        {images && images.length > 0 &&
          <div className="flex gap-6 mt-6">
            {images.length > 0 &&
              images.map((item: any, idx: number) => (
                <div className="h-20 w-20  relative" key={idx}>
                  <Image
                    src={item.url}
                    alt=""
                    width={1000}
                    height={1000}
                    className="w-[100%] h-[100%] object-fill "
                  />
                  <div
                    className="absolute right-0 -top-2 cursor-pointer"
                    onClick={() => removeImage(idx)}
                  >
                    <FlatIcon className="flaticon-close text-[red] text-sm" />
                  </div>
                </div>
              ))}
          </div>
        }
        <div className="flex items-center md:gap-x-10 gap-x-4 lg:text-base sm:text-sm text-xs md:mt-0 mt-4">
          <div
            onClick={async () => {
              await onPostHandler();
            }}
            className="bg-primary w-[50%] text-center text-white px-8 sm:py-3 py-3 rounded-md cursor-pointer relative"
          >
            <button style={{ height: "100%", position: "relative" }}>
              {loading && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Loader />
                </div>
              )}
              {!loading && "Post"}
            </button>
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
