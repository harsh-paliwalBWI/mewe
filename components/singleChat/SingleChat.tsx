import React from 'react'
import profileImg from "../../images/Ellipse 31.svg"
import Image from 'next/image'
import FlatIcon from '../flatIcon/flatIcon'
const SingleChat = () => {
  return (
    <div className='px-body'>
           <div className=' border border-black  w-[100%] relative flex-1  rounded-md px-5 py-5 mt-5 mb-20'>
                    <div className='min-h-[80vh] h-auto w-full relative'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-4'>
                                <div className='w-[55px] h-[55px] rounded-full '><Image src={profileImg} alt='' height={1000} width={1000} className='h-[100%] w-[100%] rounded-full object-fill' /></div>

                                <div className='text-lg font-semibold '><h2>Formonix</h2></div>
                            </div>
                            <div className='flex flex-col gap-1  w-[53px] h-[53px] bg-[#F3F7FA] rounded-full items-center justify-center'>
                                <FlatIcon className="flaticon-options rotate-90 text-black text-3xl"/>
                            </div>
                        </div>
                        <div className='absolute bottom-0 left-0 w-full'>
                            <div className='flex flex-col gap-4'>
                            <div className='flex items-end gap-4'>
                                <div className='w-[40px] h-[40px] rounded-full '><Image src={profileImg} alt='' height={1000} width={1000} className='h-[100%] w-[100%] rounded-full object-fill' /></div>
                                <div className='relative'>
                                    <div className='bg-[#F3F7FA] text-sm font-medium  p-3 rounded-md'><p>Donec sed erat ut magna <br /> suscipit mattis. Aliquam erat <br /> volutpat.</p> </div>
                                    <div className='flex text-xs items-center  absolute bottom-[5px] right-[10px]'><div><FlatIcon className="flaticon-readed text-primary text-2xl" /></div><p className='text-xs font-semibold text-primary'>2:38</p></div>

                                </div>
                            </div>
                            <div className='flex items-end gap-4'>
                                <div className='w-[40px] h-[40px] rounded-full '><Image src={profileImg} alt='' height={1000} width={1000} className='h-[100%] w-[100%] rounded-full object-fill' /></div>
                                <div className='relative'>
                                    <div className='bg-[#F3F7FA] text-sm font-medium  p-3 rounded-md'><p><span className='font-semibold'>Formonix</span> is typing....</p> </div>

                                </div>
                            </div>
                            </div>
                            <div className='flex items-center w-full gap-3 mt-4  '>
                                <div className='bg-[#4d4d4d] flex w-[95%] px-5 rounded-full py-3 msg-container'><input type="text" className='bg-transparent w-[100%] outline-0' placeholder='Type something...' /><p><FlatIcon className="flaticon-send text-white text-xl"/></p></div>
                                <div className='bg-[#4d4d4d] w-[54px] h-[54px] flex items-center  justify-center text-white   rounded-full'><button><FlatIcon className="flaticon-plus text-white text-2xl font-medium"/></button></div>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
  )
}

export default SingleChat