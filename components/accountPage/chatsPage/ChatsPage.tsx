"use client"
import React from 'react'
import profileImg from "../../../images/Ellipse 31.svg"
import Image from 'next/image'
import FlatIcon from '@/components/flatIcon/flatIcon'
import img2 from "../../../images/Ellipse 32.svg"
import img3 from "../../../images/Ellipse 77.svg"
import img4 from "../../../images/Ellipse 34.svg"
import img5 from "../../../images/Ellipse 35.svg"
import img6 from "../../../images/Ellipse 36.svg"
// import Link from 'antd/es/typography/Link'
import Link from 'next/link'
import SingleChat from '@/components/singleChat/SingleChat'
import ChatMobile from '@/components/chatMobile/ChatMobile'

const ChatsPage = () => {
    return (
        <div className='md:w-[70%] w-[100%] h-full md:mb-18 sm:block hidden'>
            <div className='w-[100%] flex justify-between items-center sm:gap-5 bg-white  px-4 py-3 chat-container  rounded-md '>
                <div className='md:text-xl text-base font-bold px-2 ' >Chats</div>
                <div className='flex items-center justify-end lg:gap-x-10 gap-4 sm:w-full w-[50%] '>
                    <div className='  hidden bg-[#e5eaf1]  sm:flex items-center gap-x-2 h-fit rounded-full px-5 border md:w-[32%] w-[50%] search-container'><div> <FlatIcon className="flaticon-search md:text-xl text-[#5c636a] font-bold" /></div><input type="text" className='bg-transparent py-1.5 outline-0 ' placeholder='Search' /></div>
                    <div className='bg-primary md:text-base sm:text-sm text-xs text-white cursor-pointer lg:px-10 md:px-6  px-3 md:py-3 py-2 rounded-md'>+ New Chat</div>
                </div>
            </div>
            <div className='flex sm:flex-row flex-col w-full h-full  sm:mt-6 mt-3 gap-1'>
                <ChatMobile/>
                {/* left section start  */}
                <div className='md:block hidden sm:h-full h-auto border border-black rounded-md md:w-[40%] w-[100%] sm:pt-6 pt-4'>
                    <div className='font-bold sm:text-lg text-base sm:mb-5 mb-4 px-5 '>My Chats</div>
                    <div>
                        {/* <Link href={"/chat-page"}> */}
                        <div className=' bg-[#F3F7FA] px-5'>
                            <div className='flex gap-4 items-center border-b-2 border-b-[#c6c8c9]  py-4 '>
                                <div className='w-[20%] rounded-full '><Image src={profileImg} alt='' height={1000} width={1000} className='h-[100%] w-[100%] rounded-full object-fill' /></div>
                                <div className='  w-full flex flex-col sm:gap-1'>
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
                        {/* </Link> */}
                        {/* <Link href={"/chat-page"}> */}
                        <div className=' px-5'>
                            <div className='flex gap-4 items-center border-b-2 border-b-[#c6c8c9]  py-4'>
                                <div className='w-[20%] rounded-full '><Image src={img2} alt='' height={1000} width={1000} className='h-[100%] w-[100%] rounded-full object-fill' /></div>
                                <div className=' flex flex-col  gap-1 w-full'>
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
                        {/* </Link> */}
                        {/* <Link href={"/chat-page"}> */}
                            
                        <div className=' px-5'>
                            <div className='flex gap-4 items-center border-b-2 border-b-[#c6c8c9]   py-4 '>
                                <div className='w-[20%] rounded-full '><Image src={img3} alt='' height={1000} width={1000} className='h-[100%] w-[100%] rounded-full object-fill' /></div>
                                <div className='flex flex-col sm:gap-1 w-full'>
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
                        {/* </Link> */}
                        {/* <Link href={"/chat-page"}> */}
                            
                        <div className=' px-5'>
                            <div className='flex gap-4 items-center border-b-2 border-b-[#c6c8c9]   py-4'>
                                <div className='w-[20%] rounded-full '><Image src={img4} alt='' height={1000} width={1000} className='h-[100%] w-[100%] rounded-full object-fill' /></div>
                                <div className=' flex flex-col gap-1 w-full'>
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
                        {/* </Link> */}
                        {/* <Link href={"/chat-page"}> */}
                            
                        <div className=' px-5'>
                            <div className='flex items-center gap-4 items-center border-b-2 border-b-[#c6c8c9]   py-4 '>
                                <div className='w-[20%] rounded-full '><Image src={img5} alt='' height={1000} width={1000} className='h-[100%] w-[100%] rounded-full object-fill' /></div>
                                <div className='flex flex-col sm:gap-1 w-full'>
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
                        {/* </Link> */}
                        {/* <Link href={"/chat-page"}> */}
                        <div className=' px-5'>
                            <div className='flex gap-4 items-center  py-4 '>
                                <div className='w-[20%] rounded-full '><Image src={img6} alt='' height={1000} width={1000} className='h-[100%] w-[100%] rounded-full object-fill' /></div>
                                <div className=' flex flex-col sm:gap-1 w-full'>
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
                        {/* </Link> */}
                    </div>
                </div>
                {/* left section end  */}

                {/* <div className='sm:w-[60%] w-[100%]'>
                <SingleChat/>
                </div> */}
                {/* right section start  */}
                <div className='md:block hidden border-t border-t-black border-b border-b-black border-r border-r-black sm:w-[60%] w-[100%] relative flex-1 min-h-[100%]  rounded-md px-5 py-5'>
                    <div className=' h-full w-full relative'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-4'>
                                <div className='w-[55px] h-[55px] rounded-full '><Image src={profileImg} alt='' height={1000} width={1000} className='h-[100%] w-[100%] rounded-full object-fill' /></div>

                                <div className='text-base font-semibold '><h2>Formonix</h2></div>
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
                            <div className='flex items-center w-full gap-3 mt-4 '>
                                <div className='bg-[#4d4d4d] flex w-[88%] px-5 rounded-full py-3 msg-container'><input type="text" className='bg-transparent w-[100%] outline-0' placeholder='Type something...' /><p><FlatIcon className="flaticon-send text-white text-xl"/></p></div>
                                <div className='bg-[#4d4d4d] w-[54px] h-[54px] flex items-center  justify-center text-white   rounded-full'><button><FlatIcon className="flaticon-plus text-white text-2xl font-medium"/></button></div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* right section end  */}
            </div>
        </div>
    )
}

export default ChatsPage