"use client"
import React, { useState } from 'react'
import mainImg from "../../images/me we.png"
import Image from 'next/image'
import checkImg from "../../images/Vector 57.svg"
import googleImg from "../../images/google.svg"
import linkedIn from "../../images/Group.svg"
import appleImg from "../../images/Group 34165.svg"
import Link from 'next/link'

const SignUpPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div className='flex py-6 justify-center '>
        <div className='w-[57%] md:block hidden  h-[970px] pl-6 '><Image src={mainImg} alt='' height={1000} width={1000} className=' w-[100%] h-[100%] object-fill' /></div>
        <div className='md:w-[43%] sm:w-[70%] w-[100%]  xl:px-20 md:px-10 px-5'>
          <div className='flex justify-center items-center xl:text-3xl md:text-2xl text-xl font-bold sm:my-32 my-16 '><h1>Sign up to <span className='text-primary font-bold'>ME WE</span></h1></div>
          <div className='flex flex-col gap-14'>
            <div className="border border-[#868E97] relative ">
              <label className="block  text-sm  absolute top-[-10px] left-[10px] text-[#868E97] px-1  bg-white font-medium " htmlFor="input">Name</label>
              <input className="rounded-lg px-3 py-4 w-full outline-0" type="text" id="input" />
            </div>
            <div className="border border-[#868E97] relative ">
              <label className="block text-sm text-[#868E97]   absolute top-[-10px] left-[10px] px-1 font-medium bg-white " htmlFor="input">Email or Phone Number</label>
              <input className="rounded-lg px-3 py-4 w-full outline-0" type="text" id="input" />
            </div>
          </div>
          <div className="flex mt-[20px]  flex-grow sm:flex-row flex-col sm:gap-0 gap-5  justify-between   mb-[35px] md:items-center font-bold sm:text-sm text-sm">
            <div className="flex start gap-2">
              <div
                className={`w-5 h-5 border-2 rounded-sm cursor-pointer flex justify-center items-center ${isChecked
                  ? "bg-primary border-primary"
                  : "bg-white border-gray-400"
                  }`}
                onClick={() => toggleCheckbox()}
              >
                {isChecked && (
                  <Image
                    src={checkImg}
                    alt=""
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  />
                )}
              </div>
              <div className="sm:text-sm text-xs w-fit text-gray-600  font-semibold">By signing in, You agree to our <span className=" text-primary font-semibold">Terms and Conditions</span> and <span className=" text-primary font-semibold">Privacy Policy.</span></div>
            </div>
          </div>
          <Link href={"/signin"}>
          <div className='bg-primary text-white flex justify-center items-center py-4 rounded-lg xl:text-base text-xs font-semibold cursor-pointer'><button className=''>Sign Up</button></div>
          </Link>
          <div className='text-center md:text-base text-sm text-[#383838] font-semibold  mt-10 mb-8'><h2>or Sign In with</h2></div>
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

export default SignUpPage