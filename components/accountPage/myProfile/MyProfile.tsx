import React from 'react'

const MyProfile = () => {
    const labelStyle = "text-sm text-[#868E97] font-medium tracking-wide"
    const inputStyle = "border border-[#C8C8C8] rounded-md px-3 py-3.5 outline-0"
    return (
        <>
            <div className=' h-fit py-2 flex-[0.78] '>
                <div className="w-full flex flex-col gap-7">
                    <div className="flex md:flex-row flex-col gap-5 w-full ">
                        <div className="md:w-[50%] w-full flex flex-col gap-3 ">
                            <label className={`${labelStyle}`}>
                                Business Name*
                            </label>
                            <input className={`${inputStyle}`}
                            />
                        </div>
                        <div className="md:w-[50%] w-full flex flex-col gap-3 ">
                            <label className={`${labelStyle}`}>
                                Category*
                            </label>
                            <input className={`${inputStyle}`}
                            />
                        </div>
                    </div>
                    <div className="flex md:flex-row flex-col gap-5 w-full ">
                        <div className="md:w-[50%] w-full flex flex-col gap-3 ">
                            <label className={`${labelStyle}`}>
                                LinkedIn URL*
                            </label>
                            <input className={`${inputStyle}`}
                            />
                        </div>
                        <div className="md:w-[50%] w-full flex flex-col gap-3 ">
                            <label className={`${labelStyle}`}>
                                Email*
                            </label>
                            <input className={`${inputStyle}`}
                            />
                        </div>
                    </div>
                    <div className="w-full  flex flex-col gap-3 ">
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
                    <div className="flex md:flex-row flex-col gap-5 w-full ">
                        <div className="md:w-[50%] w-full flex flex-col gap-3 ">
                            <label className={`${labelStyle}`}>
                                Current Password
                            </label>
                            <input className={`${inputStyle}`}
                            />
                        </div>
                        <div className="md:w-[50%] w-full flex flex-col gap-3 ">
                            <label className={`${labelStyle}`}>
                                New Password
                            </label>
                            <input className={`${inputStyle}`}
                            />
                        </div>
                    </div>
                    <div
                        className="md:w-[100%] mt-4 w-full rounded-full font-semibold tracking-widest bg-primary text-white text-center  py-4  text-sm font-medium cursor-pointer ">
                        <button>{"Save Changes"}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProfile