import React from 'react'
import Image from 'next/image'
import photoImg from "../../../../images/image (2).svg"
import docImg from "../../../../images/doc.svg"

const NewPost = () => {
    const labelStyle = "md:text-base text-sm text-primary font-bold tracking-wide"
    const inputStyle = " rounded-md px-3 py-3.5 outline-0 bg-transparent"
  return (
    <div className='flex-[0.68] '>
        <div className='md:text-2xl text-xl text-primary font-bold tracking-wider sm:my-8 my-4'><h1>Create A Post</h1></div>
        <div className=' flex flex-col md:gap-8 gap-4'>
        <div className="flex md:flex-row flex-col md:gap-10 gap-4 w-full ">
                        <div className="md:w-[50%] w-full flex flex-col gap-3 ">
                            <label className={`${labelStyle}`}>
                            Post Title
                            </label>
                            <div className='flex items-center px-3 rounded-md  bg-[#F8FAFC]'>
                            <div>icon</div>
                            <input className={`${inputStyle}`} placeholder='Write a Post Title'
                            />
                            </div>
                        </div>
                        <div className="md:w-[50%] w-full flex flex-col gap-3 ">
                            <label className={`${labelStyle}`}>
                            Location
                            </label>
                            <div className='flex items-center px-3 rounded-md  bg-[#F8FAFC]'>
                            <div>icon</div>
                            <input className={`${inputStyle}`} placeholder='Enter location'
                            />
                            </div>
                        </div>
                    </div>
                    <div className="w-full   flex flex-col gap-3 ">
                        <label htmlFor="" className={`${labelStyle}`}>
                        Description
                        </label>
                        <div className='bg-[#F8FAFC] rounded-md '>
                        <textarea
                            name=""
                            id=""
                            className='bg-transparent px-3 py-2 w-full outline-0'
                            // className={` ${inputStyle} ${labelStyle}`}
                            placeholder='Description'
                            rows={2}
                        ></textarea>
                        </div>
                    </div>
                    <div className='flex flex-col md:gap-5 gap-3'>
                        <div className='md:text-lg text-base text-primary font-bold tracking-widest'><h2>Photos and Videos</h2></div>
                        <div className='font-semibold text-[#9c9c9c] md:text-sm text-xs tracking-widest'><h4>Upload content in the form of photos, videos, documents and PDF.</h4></div>
                        <div className='flex items-center gap-x-14'>
                            <div >
                                <Image src={photoImg} alt='' />
                                </div>
                            <div ><Image src={docImg} alt='' /></div>
                        </div>
                        </div>
                        </div>
    </div>
  )
}

export default NewPost