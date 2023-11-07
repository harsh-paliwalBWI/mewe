"use client"
import React, { FC } from 'react'
import { usePathname } from 'next/navigation';
import FlatIcon from '@/components/flatIcon/flatIcon';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';



const MyProfile = () => {
    const router = useRouter()
    const pathName = usePathname()

    const labelStyle = "sm:text-sm text-sm text-[#868E97] font-medium "
    const inputStyle = "border border-[#C8C8C8] rounded-md px-3 sm:py-3 py-3 outline-0"
    const divStyle = "flex flex-col sm:gap-3 gap-2"
    const mainDivStyle = "grid sm:grid-cols-2 grid-cols-1 sm:gap-5 gap-3  w-full "
    return (
        <>
            <div className={` h-fit py-2  ${pathName.includes("my-profile-page") ? "block  w-[100%] sm:mt-5 md:mt-5 md:mb-24 mb-5" : "sm:block hidden lg:w-[58%] md:w-[68%]  w-full"}`}>
                {
                    pathName.includes("my-profile-page") && <div
                        onClick={() => {
                            console.log("XFBB");

                            router.replace("/account?tab=my-profile")
                        }}
                        className='mb-2'><FlatIcon className="flaticon-arrow-right rotate-180 text-2xl font-bold" /></div>
                }
                {
                    pathName.includes("my-profile-page") && <div className=''><h2 className='text-primary font-bold sm:text-xl text-lg  sm:mb-6 mb-3'>My Profile</h2></div>
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
                        className="md:w-[100%] sm:mt-4 mt-2 w-full rounded-full font-semibold  bg-primary text-white text-center  py-4  text-sm font-medium cursor-pointer ">
                        <button>{"Save Changes"}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProfile