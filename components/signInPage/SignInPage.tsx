

"use client"
import React,{useState} from 'react'
import mainImg from "../../images/me we.png"
import Image from 'next/image'
import checkImg from "../../images/Vector 57.svg"
import falgImg from "../../images/Group 34168.svg"

const SignInPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
   <>
   <div className='flex py-6 justify-center '>
    <div className='w-[55%] md:block hidden  h-[770px] pl-6 '><Image src={mainImg} alt='' height={1000} width={1000} className=' w-[100%] h-[100%] object-fill'/></div>
    <div className='md:w-[45%] sm:w-[70%] w-[100%]  2xl:px-20 md:px-10 px-5'>
        <div className='flex justify-center items-center 2xl:text-3xl md:text-2xl text-xl font-bold md:mt-[120px] mb-[60px]'><h1>Sign in to <span className='text-primary font-bold'>ME WE</span></h1></div>
        <div className='text-primary font-bold flex justify-center items-center text-2xl'><h1>Add Your Contact Information</h1></div>
        <div className='flex justify-center items-center text-center text-[#868E97] font-semibold text-sm mt-4'><h3>We will be sending a verification code to the provided <br />contact number.</h3></div>
      <div className='flex w-full  items-center gap-x-3'>
        <div className='border border-[#868E97] flex items-center justify-center gap-x-2 w-[20%] py-3'><div className='w-[21px] h-[16px] '>
            <Image src={falgImg} alt='' height={1000} width={1000} className='h-[100%] w-[100%] object-fill'/>
            </div>
            <p className='text-sm text-gray-500 font-semibold'>+91</p>
            </div>
        <div className='w-[80%]'><input type="text" name="" id="" className='border border-[#868E97] w-full py-3'/></div>
      </div>
        {/* <div className='flex flex-col gap-14'>
        <div className="
         border border-[#868E97] relative ">
  <label className="block  text-sm  absolute top-[-10px] eft-[10px] text-[#868E97] px-1  bg-white font-medium" htmlFor="input">Name</label>
  <input className="rounded-lg px-3 py-4 w-full outline-0" type="text" id="input" />
</div>

<div className="
 border border-[#868E97] relative ">
  <label className="block text-sm text-[#868E97]   absolute top-[-10px] left-[10px] px-1 font-medium bg-white" htmlFor="input">Email or Phone Number</label>
  <input className="rounded-lg px-3 py-4 w-full outline-0" type="text" id="input" />
</div>
</div> */}

<div className='bg-primary text-white flex justify-center items-center py-5 rounded-md md:text-sm text-xs font-semibold '><button className='tracking-widest'>Verify</button></div>
    </div>
   </div>
   </>
  )
}

export default SignInPage