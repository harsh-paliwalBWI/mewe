"use client"
import React,{useState,FC} from 'react'
import blueTickImg from "../../../images/verify 3.svg"
import profileImg from "../../../images/Ellipse 33.svg"
import Image  from 'next/image'

interface ProfileOptionsProps {
  setSelectedTab:any // Adjust the type as needed
  selectedTab: any
}

const ProfileOptions:FC<ProfileOptionsProps> = ({setSelectedTab,selectedTab}) => {

  const optionStyle="flex gap-x-4 bg-[#F3F7FA] px-4 text-sm font-semibold py-4   tracking-wider cursor-pointer"
  return (
  <>
   <div className=" md:w-[25%] w-[100%] filter-border  h-full bg-[#F8FAFC] px-5 ">
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
   <div className='flex justify-center text-base font-bold tracking-wider'><h2>Met Connect</h2></div>
   <div className='flex justify-center text-xs font-semibold text-[#868E97] tracking-widest'><p>@metconnects34805</p></div>
   </div>
   <div className=' flex flex-col gap-3 my-8'>
   {/* option  */}
   <div 
   onClick={()=>setSelectedTab(1)} 
   className={`${optionStyle} ${selectedTab===1?"text-primary":"text-black"}`}>
    <div>ic</div>
    <div>My Profile</div>
   </div>
   <div onClick={()=>setSelectedTab(2)}  className={`${optionStyle}  ${selectedTab===2?"text-primary":"text-black"}`}>
    <div>ic</div>
    <div>Create a business account</div>
   </div>
   <div  onClick={()=>setSelectedTab(3)} className={`${optionStyle}  ${selectedTab===3?"text-primary":"text-black"}`}>
    <div>ic</div>
    <div>Manage Posts</div>
   </div>
   <div className={`${optionStyle}`}>
    <div>ic</div>
    <div>Saved Startups</div>
   </div>
   <div onClick={()=>setSelectedTab(6)} className={`${optionStyle}  ${selectedTab===6?"text-primary":"text-black"}`}>
    <div>ic</div>
    <div>My chats</div>
   </div>
   <div className={`${optionStyle}`}>
    <div>ic</div>
    <div>Notifications</div>
   </div>
   <div className={`${optionStyle}`}>
    <div>ic</div>
    <div>Support</div>
   </div>
   <div className={`${optionStyle}`}>
    <div>ic</div>
    <div>Log Out</div>
   </div>
   

   </div>
   </div>
  </>
  )
}

export default ProfileOptions