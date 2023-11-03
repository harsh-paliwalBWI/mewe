"use client"
import React, { FC } from 'react'
import { usePathname } from 'next/navigation';



const MyProfile = () => {
    const pathName=usePathname()

    const labelStyle = "sm:text-base text-sm text-[#868E97] font-medium "
    const inputStyle = "border border-[#C8C8C8] rounded-md px-3 sm:py-3.5 py-3 outline-0"
    const divStyle = "flex flex-col sm:gap-3 gap-2"
    const mainDivStyle = "grid sm:grid-cols-2 grid-cols-1 sm:gap-5 gap-3  w-full "
    return (
        <>
            <div className={` h-fit py-2  ${pathName.includes("my-profile-page")?"block  w-[100%] sm:mt-5 md:mt-10 md:mb-24 mb-5":"sm:block hidden lg:w-[58%] md:w-[68%]  w-full"}`}>
                {
                    pathName.includes("my-profile-page")&&<div className=''><h2 className='text-primary font-bold md:text-2xl text-xl  mb-6'>My Profile</h2></div>
                }
                <div className="w-full flex flex-col sm:gap-7 gap-4">
                    <div className={`${mainDivStyle}`}>
                        <div className={`${divStyle}`}>
                            <label className={`${labelStyle}`}>
                                Business Name*
                            </label>
                            <input className={`${inputStyle}`}
                            />
                        </div>
                        <div className={`${divStyle}`}>
                            <label className={`${labelStyle}`}>
                                Category*
                            </label>
                            <input className={`${inputStyle}`}
                            />
                        </div>
                    </div>
                    <div className={`${mainDivStyle}`}>
                        <div className={`${divStyle}`}>
                            <label className={`${labelStyle}`}>
                                LinkedIn URL*
                            </label>
                            <input className={`${inputStyle}`}
                            />
                        </div>
                        <div className={`${divStyle}`}>
                            <label className={`${labelStyle}`}>
                                Email*
                            </label>
                            <input className={`${inputStyle}`}
                            />
                        </div>
                    </div>
                    <div className={`w-full profile-desc ${divStyle}`}>
                        <label htmlFor="" className={`${labelStyle}`}>
                            Description
                        </label>
                        <textarea
                            name=""
                            id=""
                            className={` ${inputStyle} ${labelStyle}`}
                            rows={5}
                        ></textarea>
                    </div>
                    <div className={`${mainDivStyle}`}>
                        <div className={`${divStyle}`}>
                            <label className={`${labelStyle}`}>
                                Current Password
                            </label>
                            <input className={`${inputStyle}`}
                            />
                        </div>
                        <div className={`${divStyle}`}>
                            <label className={`${labelStyle}`}>
                                New Password
                            </label>
                            <input className={`${inputStyle}`}
                            />
                        </div>
                    </div>
                    <div
                        className="md:w-[100%] sm:mt-4 mt-2 w-full rounded-full font-semibold tracking-widest bg-primary text-white text-center  py-4  text-sm font-medium cursor-pointer ">
                        <button>{"Save Changes"}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProfile