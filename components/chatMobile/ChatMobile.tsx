"use client"
import React from 'react'
import profileImg from "../../images/Ellipse 31.svg"
import Image from 'next/image'
import FlatIcon from '@/components/flatIcon/flatIcon'
import img2 from "../../images/Ellipse 32.svg"
import img3 from "../../images/Ellipse 77.svg"
import img4 from "../../images/Ellipse 34.svg"
import img5 from "../../images/Ellipse 35.svg"
import img6 from "../../images/Ellipse 36.svg"
import Link from 'next/link'


const ChatMobile = () => {
  return (
    <>
      <div className='sm:h-full h-auto border border-black rounded-md w-[100%] sm:pt-6 pt-4 md:hidden block'>
                    <div className='font-bold sm:text-lg text-sm sm:mb-5 mb-4 px-5 '>My Chats</div>
                    <div>
                        <Link href={"/chat-page"}>
                        <div className=' bg-[#F3F7FA] px-5'>
                            <div className='flex  items-center gap-4 border-b-2 border-b-[#c6c8c9]  py-4 '>
                                <div className='sm:w-[10%] w-[20%] rounded-full border border-primary'><Image src={profileImg} alt='' height={1000} width={1000} className='h-[100%] w-[100%] rounded-full object-fill' /></div>
                                <div className='w-[80%]  w-full flex  flex-col sm:gap-1'>
                                    <div className='flex justify-between'>
                                        <h2 className='sm:text-base text-sm font-bold '> Formonix</h2>
                                        <div className='flex items-center  text-2xl '>
                                            <FlatIcon className="flaticon-readed text-primary" />
                                        <p className='text-xs text-primary font-bold'>02:38</p>
                                        </div>
                                    </div>
                                    
                                    <p className='text-[#999999] sm:text-sm text-xs font-medium  line-clamp-1'>Quis autem vel eum iure reprehenderit ...</p>
                                </div>
                            </div>
                        </div>
                        </Link>
                        <Link href={"/chat-page"}>
                        <div className=' px-5'>
                            <div className='flex gap-4 items-center border-b-2 border-b-[#c6c8c9]  py-4'>
                                <div className='sm:w-[10%] w-[20%]  rounded-full '><Image src={img2} alt='' height={1000} width={1000} className='h-[100%] w-[100%] rounded-full object-fill' /></div>
                                <div className='w-[80%] flex flex-col  gap-1 w-full'>
                                    <div className='flex justify-between'>
                                        <h2 className='sm:text-sm text-xs font-bold '>Crowdstage</h2>
                                        <p className='text-xs text-primary font-bold'>01:34</p>
                                    </div>
                                    <div className='flex justify-between items-center '>
                                    <p className='text-[#999999]  w-[90%]  sm:text-sm text-xs font-medium  line-clamp-1'>Nemo enim ipsam voluptatem quia voluptas sit..</p>
                                    <div className='h-[20px] w-[20px] rounded-full flex items-center justify-center bg-primary text-white text-xs'>3</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </Link>
                        <Link href={"/chat-page"}>
                        <div className=' px-5'>
                            <div className='flex gap-4 items-center border-b-2 border-b-[#c6c8c9]   py-4 '>
                                <div className='sm:w-[10%] w-[20%]  rounded-full '><Image src={img3} alt='' height={1000} width={1000} className='h-[100%] w-[100%] rounded-full object-fill' /></div>
                                <div className='w-[80%] flex flex-col sm:gap-1 w-full'>
                                    <div className='flex justify-between'>
                                        <h2 className='sm:text-sm text-xs font-bold '>MetConnect</h2>
                                        <div className='flex items-center  text-2xl '>
                                            <FlatIcon className="flaticon-readed text-primary" />
                                        <p className='text-xs text-primary font-bold'>02:38</p>
                                        </div>
                                    </div>
                                    <p className='text-[#999999] sm:text-sm text-xs font-medium  line-clamp-1'>Quis autem vel eum iure reprehenderit ...</p>
                                </div>
                            </div>
                        </div>
                        </Link>
                        <Link href={"/chat-page"}>
                        <div className=' px-5'>
                            <div className='flex gap-4 items-center border-b-2 border-b-[#c6c8c9]   py-4'>
                                <div className='sm:w-[10%] w-[20%]  rounded-full '><Image src={img4} alt='' height={1000} width={1000} className='h-[100%] w-[100%] rounded-full object-fill' /></div>
                                <div className='w-[80%] flex flex-col gap-1 w-full'>
                                    <div className='flex justify-between'>
                                        <h2 className='sm:text-sm text-xs font-bold '>Crystal Clear Solutions</h2>
                                        <p className='text-xs text-primary font-bold'>12:56</p>
                                    </div>
                                    <div className='flex justify-between items-center '>
                                    <p className='text-[#999999]  w-[90%]  sm:text-sm text-xs font-medium  line-clamp-1'>Nemo enim ipsam voluptatem quia voluptas sit..</p>
                                    <div className='h-[20px] w-[20px] rounded-full flex items-center justify-center bg-primary text-white text-xs'>2</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </Link>
                        <Link href={"/chat-page"}>
                        <div className=' px-5'>
                            <div className='flex items-center gap-4 items-center border-b-2 border-b-[#c6c8c9]   py-4 '>
                                <div className='sm:w-[10%] w-[20%]  rounded-full '><Image src={img5} alt='' height={1000} width={1000} className='h-[100%] w-[100%] rounded-full object-fill' /></div>
                                <div className='w-[80%] flex flex-col sm:gap-1 w-full'>
                                    <div className='flex justify-between'>
                                        <h2 className='sm:text-sm text-xs font-bold '>CodeFusion</h2>
                                        <div className='flex items-center  text-2xl '>
                                            <FlatIcon className="flaticon-readed text-primary" />
                                        <p className='text-xs text-primary font-bold'>02:38</p>
                                        </div>
                                    </div>
                                    <p className='text-[#999999] sm:text-sm text-xs font-medium  line-clamp-1'>Quis autem vel eum iure reprehenderit ...</p>
                                </div>
                            </div>
                        </div>
                        </Link>
                          <Link href={"/chat-page"}>
                        <div className=' px-5'>
                            <div className='flex gap-4 items-center  py-4 '>
                                <div className='sm:w-[10%] w-[20%]  rounded-full '><Image src={img6} alt='' height={1000} width={1000} className='h-[100%] w-[100%] rounded-full object-fill' /></div>
                                <div className='w-[80%] flex flex-col sm:gap-1 w-full'>
                                    <div className='flex justify-between'>
                                        <h2 className='sm:text-sm text-xs font-bold '>InvestSpend</h2>
                                        <div className='flex items-center  text-2xl '>
                                            <FlatIcon className="flaticon-readed text-primary" />
                                        <p className='text-xs text-primary font-bold'>02:38</p>
                                        </div>
                                    </div>
                                    <p className='text-[#999999] sm:text-sm text-xs font-medium  line-clamp-1'>Quis autem vel eum iure reprehenderit ...</p>
                                </div>
                            </div>
                        </div>
                        </Link>
                    </div>
                </div>
    </>
  )
}

export default ChatMobile