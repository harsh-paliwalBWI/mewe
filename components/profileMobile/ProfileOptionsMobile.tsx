

"use client"
import React,{useState,FC, useEffect} from 'react'
import blueTickImg from "../../images/verify 3.svg"
import profileImg from "../../images/Ellipse 33.svg"
import Image  from 'next/image'
import FlatIcon from '@/components/flatIcon/flatIcon'
import Link from 'next/link'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getStartUpData } from '@/services/startupService'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "@/config/firebase-config";
import Modal from "@/components/Modal/modal";
import { CircularProgress } from "@mui/material";
import { getCookie } from "cookies-next";



const ProfileOptionsMobile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const cookies = { value: getCookie("uid") };
  const [client, setClient] = useState(false)


  const { data: startUpData } = useQuery({
    queryKey: ["startUpData"],
    queryFn: () => getStartUpData(cookies),
  });
  // console.log("startUpData",startUpData);
  // console.log("hiii");


  const uploadImageFromMobile = async (userPic: any) => {
  //  console.log(userPic);
  const startUpId = await startUpData?.id;
    setIsModalOpen(true)
try{
    if (userPic&&startUpId) {
      setLoading(true);
      let timeStamp = new Date().getMilliseconds();
      const storage = getStorage();
      const storageRef = ref(storage, `${userPic.name}___${timeStamp}`);
      await uploadBytes(storageRef, userPic).then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then(async (downloadURL) => {
          await setDoc(
            doc(db, "startups", startUpId),
            {
              basic: {
                coverPic: {
                  mob: downloadURL,
                  url: downloadURL,
                  thumb: downloadURL
                }
              }
            },
            { merge: true }
          );
          await queryClient.invalidateQueries({ queryKey: ["startUpData"] });
          await queryClient.refetchQueries({ queryKey: ["startUpData"] });
          toast.success("Profile pic updated successfully.");
        });
      });
      setIsModalOpen(false)
    } else {
      toast.error("Something went wrong !");
      setIsModalOpen(false)
    }
  }catch(error){
    toast.error("Something went wrong !");
      setIsModalOpen(false)
  }
  };


  async function uploadTask(userPic: any) {
    await uploadImageFromMobile(userPic);
  }
  useEffect(() => {
          setClient(true)
}, []);

  const optionStyle="flex lg:gap-x-4 gap-x-2 bg-[#F3F7FA] lg:px-4 px-2 lg:text-sm text-xs font-semibold py-4  cursor-pointer"
  return (
  <>
   <div className=" sm:hidden block xl:w-[25%] md:w-[30%] w-[100%] filter-border  h-full bg-[#F8FAFC] lg:px-5 px-2  ">
<div className="flex flex-col gap-2 mt-6">
<div className="flex justify-center relative">
          <div className="flex justify-center relative z-10 ">
          <Link href={"/about"}>
            <div className="h-[100px] w-[100px] rounded-full  ">
              <Image
                src={startUpData?.basic?.coverPic?.url}
                alt=""
                height={1000}
                width={1000}
                className="h-[100%] w-[100%] object-fill  rounded-full"
              />
              <div className="h-[30px] w-[30px] absolute right-0 top-0">
                <Image
                  src={blueTickImg}
                  height={1000}
                  width={1000}
                  alt=""
                  className="h-[100%] w-[100%] object-fill  "
                />
              </div>
              </div>
              </Link>
              <div className="absolute bottom-1 right-1  rounded-full z-30 ">
                <input placeholder='' type='file' accept="image/*" onChange={async (e) => {
                  if (!e.target.files) return;
                  // console.log(e.target.files[0]);
                  // imageUpload()
                  await uploadTask(e.target.files[0])
                }}
                  id="profile-ImageMobile" className='w-full hover:cursor-pointer   outline-none  hidden rounded-md  ' />
                <label htmlFor='profile-ImageMobile' className='hover:cursor-pointer h-[20px] w-[20px] rounded-full  bg-white flex justify-center items-center '>
                  <FlatIcon className="text-primary flaticon-edit text-lg" /></label>
              </div>
            
          
          </div>
          <Modal isOpen={isModalOpen} setOpen={setIsModalOpen}>
              <div className="flex flex-col gap-2 justify-center items-center">
                <CircularProgress className="!text-white"></CircularProgress>
                <p className="text-white font-medium text-lg">
                  Updating profile picture..
                </p>
              </div>
            </Modal>
          </div>
          {/* <Link href={"/about"}> */}
            <div className="flex  justify-center lg:text-base text-sm font-bold ">
              <h2>
                {client&&startUpData?.name} 
             
              </h2>
            </div>
          {/* </Link>  */}
          <div className="flex w-[100%]  h-auto  lg:px-5 px-2 justify-center lg:text-sm text-xs font-semibold text-[#868E97] ">
            <p className="">
              {client&&startUpData?.email}
            </p>
          </div>
        </div>

   <div className=' flex flex-col gap-3 my-8'>
   {/* option  */}
   <Link href={"/my-profile-page"}>
   <div 
   className={`${optionStyle} `}>
    <div><FlatIcon className="flaticon-user text-2xl"/></div>
    <div>My Profile</div>
   </div>
   </Link>
   <Link href={"/business-account"}>
   <div 
    className={`${optionStyle} `}>
    <div><FlatIcon className="flaticon-office text-2xl"/></div>
    <div>Create a business account</div>
   </div>
   </Link>
   <Link href={"/manage-posts"}>
   <div  
    className={`${optionStyle}  `}>
    <div><FlatIcon className="flaticon-post text-2xl"/></div>
    <div>Manage Posts</div>
   </div>
   </Link>
   <div className={`${optionStyle}`}>
    <div><FlatIcon className="flaticon-bookmark text-2xl"/></div>
    <div>Saved Startups</div>
   </div>
   <Link href={"/all-chats"}>
   <div 

    className={`${optionStyle} `}>
    <div><FlatIcon className="flaticon-chat text-2xl"/></div>
    <div>My chats</div>
   </div>
   </Link>
   <div className={`${optionStyle}`}>
    <div><FlatIcon className="flaticon-notificaiton text-2xl"/></div>
    <div>Notifications</div>
   </div>
   <div className={`${optionStyle}`}>
    <div><FlatIcon className="flaticon-support text-2xl"/></div>
    <div>Support</div>
   </div>
   <Link  href={"/"}>
   <div className={`${optionStyle}`}>
    <div><FlatIcon className="flaticon-exit text-2xl"/></div>
    <div>Log Out</div>
   </div>
   </Link>

   </div>
   </div>
  </>
  )
}

// ${selectedTab===1?"text-primary":"text-black"}
export default ProfileOptionsMobile