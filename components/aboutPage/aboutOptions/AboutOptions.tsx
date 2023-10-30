"use client"
import React,{FC} from 'react'
import logoImg from "../../../images/a5 1.png"
import Image from 'next/image'
import blueTickImg from "../../../images/verify 3.svg"
import buildingImg from "../../../images/glass-architecture 1.svg"
import bookMarkImg from "../../../images/Layer 2.svg"
import FlatIcon from '@/components/flatIcon/flatIcon'
interface Props {
    setSelectedTab:any // Adjust the type as needed
    selectedTab: any
  }

const AboutOptions:FC<Props> = ({setSelectedTab,selectedTab}) => {
  const optionStyle="flex gap-x-4 bg-[#F3F7FA] px-4 text-sm font-semibold py-4   tracking-wider cursor-pointer"
  const optionTabStyle='flex w-full   justify-between text-base font-semibold tracking-wider items-center'

  return (
    <>
    <div className=" md:w-[40%] w-[100%] filter-border  h-full  bg-[#F8FAFC] relative z-10">
        <div className='w-full'><Image src={buildingImg} alt='' height={1000} width={1000} className='w-[100%] object-fill'/></div>
        <div className=' px-8'>
     {/* top section  */}
    <div className='flex items-end gap-2 mt-[-70px] z-30'>
     <div className='flex justify-center '>
     <div className='h-[145px] w-[145px] rounded-full  relative'>
       <Image src={logoImg} alt='' height={1000} width={1000} className='h-[100%] w-[100%] object-fill  rounded-full'/>
       <div className='h-[46px] w-[46px] absolute right-0 top-0'>
       <Image src={blueTickImg} height={1000} width={1000} alt='' className='h-[100%] w-[100%] object-fill  '/>
       </div>
       </div>
    </div>
    <div className='flex justify-between items-start  w-full'>
    <div className='flex flex-col gap-2'>
    <div className=' text-lg font-bold tracking-wider'><h2>CodeFusion</h2></div>
    <div className=' text-xs font-semibold text-[#868E97] tracking-widest'><p>Education Services</p></div>
    </div>
    <div><Image src={bookMarkImg} alt=''/></div>
    </div>
    </div>
    <div className='flex gap-3 my-6'>
        <FlatIcon className="flaticon-location text-xl"/>
        <p className='text-[#707172] text-sm tracking-wider font-semibold'>Delhi, India</p>
    </div>
    <div className='flex text-base font-medium tracking-widest gap-3'>
        <div className='w-[50%] text-center rounded-full bg-primary text-white py-3'><button>Follow</button></div>
        <div className='w-[50%] border border-primary text-center rounded-full py-3 text-primary'><button>Message</button></div>
    </div>
    <div className='flex flex-col gap-5 my-10'>
        <div 
        //   onClick={()=>setSelectedTab(1)} 
        className={`${optionTabStyle}`}>
            <h2 className='text-primary'>About</h2>
            <h2 className='text-[#868E97]'>-</h2>
        </div>
        <div 
        //   onClick={()=>setSelectedTab(2)} 
        className={`${optionTabStyle}`}>
            <h2 className='text-primary'>Photos</h2>
            <h2 className='text-[#868E97]'>564</h2>
        </div>
        <div 
        //   onClick={()=>setSelectedTab(3)} 
        className={`${optionTabStyle}`}>
            <h2 className='text-primary'>Videos</h2>
            <h2 className='text-[#868E97]'>21</h2>
        </div>
        <div
        //   onClick={()=>setSelectedTab(4)} 
         className={`${optionTabStyle}`}>
            <h2 className='text-primary'>Posts</h2>
            <h2 className='text-[#868E97]'>321</h2>
        </div>
    </div>
    </div>
    </div>
   </>
  )
}

export default AboutOptions