"use client"
import React,{useState} from 'react'
import mainImg from "../../images/me we.png"
import Image from 'next/image'
import checkImg from "../../images/Vector 57.svg"

const SignUpPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
   <>
   <div className='flex py-6 justify-center '>
    <div className='w-[55%] md:block hidden  h-[770px] pl-6 '><Image src={mainImg} alt='' height={1000} width={1000} className=' w-[100%] h-[100%] object-fill'/></div>
    <div className='md:w-[45%] sm:w-[70%] w-[100%]  2xl:px-20 md:px-10 px-5'>
        <div className='flex justify-center items-center 2xl:text-3xl md:text-2xl text-xl font-bold md:my-[120px] my-[120px]'><h1>Sign up to <span className='text-primary font-bold'>ME WE</span></h1></div>
        <div className='flex flex-col gap-14'>
        <div className="
         border border-[#868E97] relative ">
  <label className="block  text-sm  absolute top-[-10px] left-[10px] text-[#868E97] px-1  bg-white font-medium" htmlFor="input">Name</label>
  <input className="rounded-lg px-3 py-4 w-full outline-0" type="text" id="input" />
</div>
<div className="
 border border-[#868E97] relative ">
  <label className="block text-sm text-[#868E97]   absolute top-[-10px] left-[10px] px-1 font-medium bg-white" htmlFor="input">Email or Phone Number</label>
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
                <div className="sm:text-sm text-xs w-fit text-[#212121]">By signing in, You agree to our <span className=" text-primary">Terms and Conditions</span> and <span className=" text-primary">Privacy Policy.</span></div>
              </div>
            </div>
<div className='bg-primary text-white flex justify-center items-center py-5 rounded-md md:text-sm text-xs font-semibold '><button className='tracking-widest'>Sign Up</button></div>
    </div>
   </div>
   </>
  )
}

export default SignUpPage