

"use client"
import React, { useState } from 'react'
import mainImg from "../../images/me we.png"
import Image from 'next/image'
import falgImg from "../../images/Group 34168.svg"
import googleImg from "../../images/google.svg"
import linkedIn from "../../images/Group.svg"
import appleImg from "../../images/Group 34165.svg"
import Link from 'next/link'

const SignInPage = () => {
    return (
        <>
            <div className='flex py-6 justify-center md:h-[100vh] h-auto items-center'>
                <div className='w-[57%] md:block hidden  h-[100%] pl-6 '><Image src={mainImg} alt='' height={1000} width={1000} className=' w-[100%] h-[100%] object-fill' /></div>
                <div className='md:w-[43%] sm:w-[70%] w-[100%]  xl:px-20 md:px-10 px-5  '>
                    <div className=' flex flex-col lg:gap-10 gap-5'>
                    <div className='flex justify-center items-center lg:text-4xl sm:text-2xl text-xl font-bold md:mt-0 mt-10 '><h1>Sign in to <span className='text-primary font-bold'>ME WE</span></h1></div>
                    <div className='text-primary font-semibold flex justify-center items-center xl:text-2xl lg:text-2xl md:text-base sm:text-xl text-base '><h1>Add Your Contact Information</h1></div>
                    </div>
                    <div className='flex justify-center items-center text-center text-[#868E97] font-medium lg:text-base sm:text-sm text-xs mt-4 '><h3>We will be sending a verification code to the provided <br />contact number.</h3></div>
                    <div className='flex w-full  items-center gap-x-3 md:my-10 my-8'>
                        <div className='border border-[#868E97] flex items-center justify-center gap-x-3 xl:w-[20%] w-[30%] sm:py-3.5 py-4'><div className='w-[21px] h-[16px] '>
                            <Image src={falgImg} alt='' height={1000} width={1000} className='h-[100%] w-[100%] object-fill' />
                        </div>
                            <p className='sm:text-sm text-xs text-gray-500 font-semibold'>+91</p>
                        </div>
                        <div className='xl:w-[80%] w-[70%]'><input type="text" name="" id="" className='border border-[#868E97] w-full py-3 outline-0 px-5' /></div>
                    </div>
                    <Link href={'/verification'}>
                    <div className='bg-primary text-white flex justify-center items-center py-3 rounded-lg lg:text-xl text-base sm:text-base text-sm font-medium cursor-pointer'><button className=''>Verify</button></div>
                    </Link>
                    <div className='text-center lg:text-lg sm:text-base text-sm text-[#383838] font-medium  mt-10 mb-8 '><h2>or Sign In with</h2></div>
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

export default SignInPage