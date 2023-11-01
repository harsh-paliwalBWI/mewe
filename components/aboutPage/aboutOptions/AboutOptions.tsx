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
  const optionStyle="flex gap-x-4 bg-[#F3F7FA] px-4 text-sm font-semibold py-4    cursor-pointer"
  const optionTabStyle='flex w-full   justify-between xl:text-lg  text-sm font-semibold  items-center'

  return (
    <>
    <div className=" w-[100%] filter-border  h-fit  bg-[#F8FAFC] relative z-10">
        <div className='w-full h-[100px] '><Image src={buildingImg} alt='' height={1000} width={1000} className='w-[100%] h-[100%] object-cover'/></div>
        <div className=' xl:px-8 px-4'>
     {/* top section  */}
    <div className='flex items-end gap-2 xl:mt-[-70px] md:mt-[-50px] sm:mt-[-70px] mt-[-30px] z-30'>
     <div className='flex justify-center '>
     <div className='xl:h-[145px] md:h-[100px] xl:w-[145px] md:w-[100px] sm:w-[145px] sm:h-[145px] w-[100px] h-[100px]  rounded-full  relative'>
       <Image src={logoImg} alt='' height={1000} width={1000} className='h-[100%] w-[100%] object-fill  rounded-full'/>
       <div className='h-[46px] w-[46px] absolute right-0 top-0'>
       <Image src={blueTickImg} height={1000} width={1000} alt='' className='h-[100%] w-[100%] object-fill  '/>
       </div>
       </div>
    </div>
    <div className='flex justify-between items-start  w-full'>
    <div className='flex flex-col gap-1'>
    <div className=' xl:text-xl text-base font-semibold '><h2>CodeFusion</h2></div>
    <div className=' text-base font-medium text-[#868E97] '><p>Education Services</p></div>
    </div>
    <div>
        {/* <Image src={bookMarkImg} alt=''/> */}
        <FlatIcon className="flaticon-bookmark text-black xl:text-3xl text-xl font-bold"/>
    </div>
    </div>
    </div>
    <div className='flex items-center gap-1 my-6'>
        <FlatIcon className="flaticon-map xl:text-2xl text-lg"/>
        <p className='text-[#707172] xl:text-base text-xs  font-semibold'>Delhi, India</p>
    </div>
    <div className='flex xl:text-base text-sm font-medium tracking-widest gap-3'>
        <div className='w-[50%] text-center rounded-full bg-primary text-white xl:py-3 py-2 flex justify-center  '><button className='flex items-center justify-center gap-1'>
            <FlatIcon className="flaticon-add-user xl:text-2xl text-xl"/><span>Follow</span></button></div>
        <div className='w-[50%] border border-primary text-center rounded-full xl:py-3 py-2 text-primary'><button>Message</button></div>
    </div>
    <div className='flex flex-col gap-5 xl:py-10 py-5'>
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