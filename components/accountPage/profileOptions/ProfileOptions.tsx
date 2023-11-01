"use client"
import React,{useState,FC} from 'react'
import blueTickImg from "../../../images/verify 3.svg"
import profileImg from "../../../images/Ellipse 33.svg"
import Image  from 'next/image'
import FlatIcon from '@/components/flatIcon/flatIcon'

interface ProfileOptionsProps {
  setSelectedTab:any // Adjust the type as needed
  selectedTab: any
}

const ProfileOptions:FC<ProfileOptionsProps> = ({setSelectedTab,selectedTab}) => {

  const optionStyle="flex lg:gap-x-4 gap-x-2 bg-[#F3F7FA] lg:px-4 px-2 lg:text-sm text-xs font-semibold py-4  cursor-pointer"
  return (
  <>
   <div className=" xl:w-[25%] md:w-[30%] w-[100%] filter-border  h-full bg-[#F8FAFC] lg:px-5 px-2  ">
    {/* top section  */}
   <div className='flex flex-col gap-2 mt-6'>
    <div className='flex justify-center '>
    <div className='h-[100px] w-[100px] rounded-full  relative'>
      <Image src={profileImg} alt='' height={1000} width={1000} className='h-[100%] w-[100%] object-fill  rounded-full'/>
      <div className='h-[30px] w-[30px] absolute right-0 top-0'>
      <Image src={blueTickImg} height={1000} width={1000} alt='' className='h-[100%] w-[100%] object-fill  '/>
      </div>
      </div>
   </div>
   <div className='flex justify-center text-base font-bold '><h2>Met Connect</h2></div>
   <div className='flex justify-center text-sm font-semibold text-[#868E97] '><p>@metconnects34805</p></div>
   </div>
   <div className=' flex flex-col gap-3 my-8'>
   {/* option  */}
   <div 
   onClick={()=>setSelectedTab(1)} 
   className={`${optionStyle} ${selectedTab===1?"text-primary":"text-black"}`}>
    <div><FlatIcon className="flaticon-user text-2xl"/></div>
    <div>My Profile</div>
   </div>
   <div onClick={()=>setSelectedTab(2)}  className={`${optionStyle}  ${selectedTab===2?"text-primary":"text-black"}`}>
    <div><FlatIcon className="flaticon-office text-2xl"/></div>
    <div>Create a business account</div>
   </div>
   <div  onClick={()=>setSelectedTab(3)} className={`${optionStyle}  ${selectedTab===3?"text-primary":"text-black"}`}>
    <div><FlatIcon className="flaticon-post text-2xl"/></div>
    <div>Manage Posts</div>
   </div>
   <div className={`${optionStyle}`}>
    <div><FlatIcon className="flaticon-bookmark text-2xl"/></div>
    <div>Saved Startups</div>
   </div>
   <div onClick={()=>setSelectedTab(6)} className={`${optionStyle}  ${selectedTab===6?"text-primary":"text-black"}`}>
    <div><FlatIcon className="flaticon-chat text-2xl"/></div>
    <div>My chats</div>
   </div>
   <div className={`${optionStyle}`}>
    <div><FlatIcon className="flaticon-notificaiton text-2xl"/></div>
    <div>Notifications</div>
   </div>
   <div className={`${optionStyle}`}>
    <div><FlatIcon className="flaticon-support text-2xl"/></div>
    <div>Support</div>
   </div>
   <div className={`${optionStyle}`}>
    <div><FlatIcon className="flaticon-exit text-2xl"/></div>
    <div>Log Out</div>
   </div>
   

   </div>
   </div>
  </>
  )
}

export default ProfileOptions