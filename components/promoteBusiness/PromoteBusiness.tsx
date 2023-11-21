"use client"
import React, { useState } from 'react'
import checkImg from "../../images/Vector 37.svg"
import blackCheck from "../../images/Vector 38.svg"
import Image from 'next/image'
import premiumImg from "../../images/premium 2.svg"
import premiumImg1 from "../../images/premium 1.svg"
import premiumImg2 from "../../images/premium 2 (2).svg"
import premiumImg4 from "../../images/blue grp.svg"
import FlatIcon from '../flatIcon/flatIcon'
import PromotedBusinessSlider from '../promotedBusinessSlider/PromotedBusinessSlider'
const PromoteBusiness = () => {
    const [isSwitched,setIsSwitched]=useState(false)
    const data=[{text:"Neque porro quisquam est"},
    {text:"Excepteur sint occaecat cupidatat"},
    {text:"Voluptate velit esse quam nihil molestiae"},
    {text:"Qui dolorem ipsum quia dolor sit amet"},
    {text:"Ut enim ad minima veniam, quis nostrum"}]
  return (
    <>

    
    <>

    <div className='px-body  '> 
        <div className='flex justify-center items-center gap-2 sm:mt-8 mt-4 '><div><Image src={premiumImg1} alt=''/></div><h3 className='md:text-lg text-base font-semibold '>PREMIUM</h3></div>
        <div className='md:text-4xl text-xl font-semibold text-center sm:mt-3 mt-2 '><h1>Promote Your Business</h1></div>
        <div className='text-center text-[#7f7f7f] font-medium md:text-lg text-sm my-5 '><p>Excepteur sint occaecat cupidatat non proident, sunt in 
         culpa qui official <br />deserunt mollit anim id es</p></div>
         {/* <div className='flex justify-center items-center gap-3'>
            <div className={` font-medium text-sm tracking-wider ${isSwitched&&"text-primary"}`}><p>Monthly</p></div>
            <div onClick={()=>setIsSwitched((prev)=>!prev)} className={`sm:w-[58px] w-[48px] flex items-center px-1  sm:h-[29px] h-[19px] ${isSwitched?"justify-start":"justify-end"}  bg-primary rounded-full cursor-pointer`}>
            <div className='sm:w-[22px] w-[11px] sm:h-[22px] h-[11px] rounded-full bg-white'></div></div>
            <div className='text-[#a1a099] font-medium text-sm tracking-wider'><p>Yearly</p></div>
            </div> */}
            <div className='flex justify-center items-center gap-3 '>
    <div className={`  w-[100px] flex justify-end  ${isSwitched ? 'text-primary text-base font-bold' : 'text-[#a1a099] text-sm font-medium'}`}>
        <p>Monthly</p>
    </div>
    <div onClick={() => setIsSwitched((prev) => !prev)} className={`sm:w-[58px] w-[48px] flex items-center px-1 sm:h-[29px] h-[19px] ${isSwitched ? 'justify-start' : 'justify-end'} bg-primary rounded-full cursor-pointer`}>
        <div className='sm:w-[22px] w-[11px] sm:h-[22px] h-[11px] rounded-full bg-white'></div>
    </div>
    <div className={` w-[100px] flex justify-start   ${isSwitched ? 'text-[#a1a099] text-sm font-medium' : 'text-primary text-base font-bold'}`}>
        <p>Yearly</p>
    </div>
</div>

    <div className=' rounded-tl-xl rounded-tr-xl  md:mt-20 mt-7 md:mb-36 mb-5 sm:mt-10 sm:mb-10'>
    <PromotedBusinessSlider/>
        <>
        <div className=' hidden md:flex sm:flex-row flex-col lg:flex-nowrap sm:flex-wrap  flex-nowrap lg:justify-start sm:justify-center justify-start   items-center gap-x-8 gap-y-4 '>
        <div className='lg:w-[32%] sm:w-[42%] w-[90%]  rounded-tl-xl rounded-tr-xl'>
            <div className='w-full h-[18px] bg-[#A6D6BF] rounded-tl-xl rounded-tr-xl'></div>
            <div className='bg-[#fffdf3] py-5 px-5'>
            <div className='flex items-center justify-between'>
                <div><Image src={premiumImg2} alt=''/></div>
                <div><FlatIcon className="flaticon-help text-[#a1a099] text-2xl"/></div>
            </div>
            <h1 className='font-bold xl:text-lg text-sm my-3'>BASIC</h1>
            <div className='text-[#a1a099] xl:text-lg text-base  '><h2>Duis aute irure dolor in reprehenderit in <br />voluptate velit esse cillum dolore.</h2></div>
           <div className='flex flex-col gap-2 my-5'>
            {data.map((item:any,idx:number)=>{
                return  <div key={idx} className='flex items-center gap-2'>
                <div className='h-[20px] w-[20px] rounded-full flex items-center justify-center bg-[#A6D6BF]'><Image src={blackCheck} alt=''/></div>
                <p className='text-[#a1a099]  xl:text-base text-sm'>{item.text}</p>
            </div>
            })}
            </div>
            <div className='flex items-end'>
                <h2 className='xl:text-xl font-bold text-lg'>Rs. 999/</h2>
                <p className='text-[#a1a099] text-xs font-semibold'>year</p>
            </div>
           <div className='text-center bg-[#A6D6BF] py-3  mt-5 font-bold xl:text-base text-sm'><button>Get Started!</button></div>
           </div>
        </div>
        <div className='lg:w-[36%] sm:w-[46%] w-[90%] rounded-tl-xl rounded-tr-xl'>
            <div className='w-full h-[18px] bg-[#4B647E] rounded-tl-xl rounded-tr-xl'></div>
            <div className='bg-[#fffdf3] py-5 px-5'>
            <div className='flex items-center justify-between'>
                <div><Image src={premiumImg} alt=''/></div>
                <div><FlatIcon className="flaticon-help text-[#a1a099] text-3xl"/></div>
            </div>
            <h1 className='font-bold xl:text-xl text-base my-3'>STANDARD</h1>
            <div className='text-[#a1a099] xl:text-lg text-base '><h2>Duis aute irure dolor in  reprehenderit in <br /> voluptate velit esse cillum dolore.</h2></div>
           <div className='flex flex-col gap-4 my-6'>
            {data.map((item:any,idx:number)=>{
                return  <div key={idx} className='flex items-center gap-2'>
                <div className='h-[22px] w-[22px] rounded-full flex items-center justify-center bg-[#4B647E]'><Image src={checkImg} alt=''/></div>
                <p className='text-[#a1a099]  xl:text-base text-sm'>{item.text}</p>
            </div>
            })}
            </div>
            <div className='flex items-end'>
                <h2 className='xl:text-2xl text-xl font-bold'>Rs. 1,999/</h2>
                <p className='text-[#a1a099] text-xs font-semibold'>year</p>
            </div>
           <div className='text-center bg-[#4B647E] py-4 text-white font-bold xl:text-base text-sm mt-5'><button>Get Started!</button></div>
           </div>
        </div>
        <div className='lg:w-[32%] sm:w-[42%] w-[90%] rounded-tl-xl rounded-tr-xl'>
            <div className='w-full h-[18px] bg-[#9BC1F9] rounded-tl-xl rounded-tr-xl'></div>
            <div className='bg-[#fffdf3] py-5 px-5'>
            <div className='flex items-center justify-between'>
                <div><Image src={premiumImg4} alt=''/></div>
                <div><FlatIcon className="flaticon-help text-[#a1a099] text-2xl"/></div>
            </div>
            <h1 className='font-bold xl:text-lg text-sm my-3'>PREMIUM</h1>
            <div className='text-[#a1a099] xl:text-lg text-base  '><h2>Duis aute irure dolor in reprehenderit in <br />  voluptate velit esse cillum dolore.</h2></div>
           <div className='flex flex-col gap-2 my-5'>
            {data.map((item:any,idx:number)=>{
                return  <div key={idx} className='flex items-center gap-2'>
                <div className='h-[20px] w-[20px] rounded-full flex items-center justify-center bg-[#9BC1F9]'><Image src={blackCheck} alt=''/></div>
                <p className='text-[#a1a099]  xl:text-base text-sm'>{item.text}</p>
            </div>
            })}
            </div>
            <div className='flex items-end'>
                <h2 className='xl:text-xl font-bold text-lg'>Rs. 2,999/</h2>
                <p className='text-[#a1a099] text-xs font-semibold'>year</p>
            </div>
           <div className='text-center bg-[#9BC1F9] py-3  mt-5 font-bold xl:text-base text-sm'><button>Get Started!</button></div>
           </div>
        </div>
        </div>
        </>
    </div>
    </div>
    </>
    </>
  )
}

export default PromoteBusiness