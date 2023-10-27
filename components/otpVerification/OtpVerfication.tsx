
"use client"
import React, { useState } from 'react'
import mainImg from "../../images/me we.png"
import Image from 'next/image'
import falgImg from "../../images/Group 34168.svg"
import googleImg from "../../images/google.svg"
import linkedIn from "../../images/Group.svg"
import appleImg from "../../images/Group 34165.svg"
import Link from 'next/link'

const OtpVerfication = () => {
    return (
        <>
            <div className='flex py-6 justify-center '>
                <div className='w-[57%] md:block hidden  h-[970px] pl-6 '><Image src={mainImg} alt='' height={1000} width={1000} className=' w-[100%] h-[100%] object-fill' /></div>
                <div className='md:w-[43%] sm:w-[70%] w-[100%]  xl:px-20 md:px-10 px-5'>
                    <div className='flex justify-center items-center xl:text-3xl md:text-2xl text-xl font-bold md:mt-[120px] mt-[60px] sm:mb-[90px] mb-[45px] tracking-widest'><h1>Sign in to <span className='text-primary font-bold'>ME WE</span></h1></div>
                    <div className='text-primary font-bold flex justify-center items-center xl:text-2xl lg tracking-widest'><h1>Enter the verification code</h1></div>
                    <div className='flex justify-center items-center text-center text-[#868E97] font-semibold xl:text-sm text-xs mt-4 tracking-widest mb-14'><h3>We will be sending a verification code to the provided <br />contact number.</h3></div>
                  <div className='w-[95%] mx-auto '>
                   <div className='flex justify-center items-center xl:gap-x-4 md:gap-x-2 sm:gap-x-4 gap-x-2 w-full '>
                   {
                    [1,2,3,4,5,6].map((item:any,idx:number)=>{
                        return <div key={idx} className='w-1/6 '>
                            <input type="text" className='xl:py-4 md-py-3  py-2 border border-[#868E97] w-full outline-0 text-center' />
                        </div>
                    })
                   }

                   </div>
                   <div className='mt-6 text-[#868E97] sm:text-sm text-xs font-semibold mb-12'><h4>Resend code (20 sec)</h4></div>

                   </div>
                   <Link href={"/"}>
                    <div className='bg-primary text-white flex justify-center items-center py-3 rounded-lg xl:text-lg text-xs font-semibold cursor-pointer '><button className='tracking-widest'>Verify</button></div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default OtpVerfication