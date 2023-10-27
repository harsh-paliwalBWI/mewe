// import React from 'react'

// const WelcomePage = () => {
//   return (
//     <div>WelcomePage</div>
//   )
// }

// export default WelcomePage



"use client"
import React, { useState } from 'react'
import mainImg from "../../images/me we.png"
import Image from 'next/image'
import falgImg from "../../images/Group 34168.svg"
import googleImg from "../../images/google.svg"
import linkedIn from "../../images/Group.svg"
import appleImg from "../../images/Group 34165.svg"

const WelcomePage = () => {
    return (
        <>
            <div className='flex py-6 justify-center items-center '>
                <div className='w-[57%] md:block hidden  h-[970px] pl-6 '><Image src={mainImg} alt='' height={1000} width={1000} className=' w-[100%] h-[100%] object-fill' /></div>
                <div className='md:w-[43%] sm:w-[70%] w-[100%]  xl:px-20 md:px-10 px-5 md:mt-0 mt-16'>
                    <div className='flex justify-center items-center xl:text-3xl md:text-2xl text-xl font-bold  tracking-widest'><h1> Welcome <span className='font-semibold'>to</span> <span className='text-primary font-bold'>ME WE</span></h1></div>
                   <div className='flex justify-center items-center text-center text-gray-500 font-semibold xl:text-base text-xs mt-6 tracking-widest md:mb-32 mb-16'><h4>Full | Mischievous dramedy featuring accordion,<br /> tuba & pizzicato violin</h4></div>
                  <div className='flex flex-col gap-5'>
                   <div className=' border border-primary text-primary flex justify-center items-center py-3 rounded-full xl:text-base text-xs font-semibold w-[85%] mx-auto cursor-pointer'><button className='tracking-widest'>Log In</button></div>
                    <div className='bg-primary text-white flex justify-center items-center py-3 rounded-full xl:text-base text-xs font-semibold w-[85%] mx-auto cursor-pointer '><button className='tracking-widest'>Sign Up</button></div>
                    </div>
                    <div className='text-center md:text-base text-sm text-[#383838] font-semibold tracking-widest mt-16 mb-8'><h2>or Sign In with</h2></div>
                    <div className='flex items-center justify-center gap-x-6'>
                        <div className='sm:h-[55px] sm:w-[55px] h-[45px] w-[45px] cursor-pointer' ><Image src={googleImg} alt='' height={1000} width={1000} className='h-full w-full object-fill'/></div>
                        <div className='sm:h-[55px] sm:w-[55px] h-[45px] w-[45px] cursor-pointer'><Image src={appleImg} alt='' className='h-full w-full object-fill'/></div>
                        <div className='sm:h-[55px] sm:w-[55px] h-[45px] w-[45px] cursor-pointer'><Image src={linkedIn} alt='' className='h-full w-full object-fill'/></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WelcomePage