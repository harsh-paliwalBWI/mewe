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

const ChatsPage = () => {
    return (
        <div className='w-[70%]  h-full '>
            <div className='flex justify-between items-center bg-white  px-4 py-3 chat-container'>
                <div className='text-2xl font-bold' >Chats</div>
                <div className='flex items-center justify-end gap-x-10  w-fit '>
                    <div className='bg-[#e5eaf1]  flex items-center gap-x-4 h-fit rounded-full px-5 border w-[50%] search-container'><div> <FlatIcon className="flaticon-search md:text-lg text-[#5c636a] font-semibold" /></div><input type="text" className='bg-transparent py-1.5 ' placeholder='Search' /></div>
                    <div className='bg-primary text-lg text-white cursor-pointer px-10 py-3 rounded-sm'>+ New Chat</div>
                </div>
            </div>
            <div className='flex sm:flex-row flex-col w-full h-full  mt-10 gap-1'>
                <div className='sm:h-full h-auto border border-black rounded-md sm:w-[40%] w-[100%] py-6'>
                    <div className='font-bold text-xl mb-5 px-5 '>My Chats</div>
                    <div>
                        <Link href={"/chat-page"}>
                        <div className=' bg-[#F3F7FA] px-5'>
                            <div className='flex gap-4 border-b-2 border-b-[#c6c8c9]  py-4 '>
                                <div className='w-[20%] rounded-full border border-primary'><Image src={profileImg} alt='' height={1000} width={1000} className='h-[100%] w-[100%] rounded-full object-fill' /></div>
                                <div className='w-[80%]  w-full flex flex-col gap-1'>
                                    <div className='flex justify-between'>
                                        <h2 className='text-base font-bold '> Formonix</h2>
                                        <div className='flex items-center  text-2xl '>
                                            <FlatIcon className="flaticon-readed text-primary" />
                                        <p className='text-xs text-primary font-bold'>02:38</p>
                                        </div>
                                    </div>
                                    
                                    <p className='text-[#999999] text-sm font-medium  line-clamp-1'>Quis autem vel eum iure reprehenderit ...</p>
                                </div>
                            </div>
                        </div>
                        </Link>
                        <div className=' px-5'>
                            <div className='flex gap-4 border-b-2 border-b-[#c6c8c9]  py-4 '>
                                <div className='w-[20%] rounded-full '><Image src={img2} alt='' height={1000} width={1000} className='h-[100%] w-[100%] rounded-full object-fill' /></div>
                                <div className='w-[80%] flex flex-col gap-1  w-full'>
                                    <div className='flex justify-between'>
                                        <h2 className='text-sm font-bold '>Crowdstage</h2>
                                        <p className='text-xs text-primary font-bold'>01:34</p>
                                    </div>
                                    <div className='flex justify-between items-center '>
                                    <p className='text-[#999999]  w-[90%]  text-sm font-medium  line-clamp-1'>Nemo enim ipsam voluptatem quia voluptas sit..</p>
                                    <div className='h-[20px] w-[20px] rounded-full flex items-center justify-center bg-primary text-white text-xs'>3</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=' px-5'>
                            <div className='flex gap-4 border-b-2 border-b-[#c6c8c9]  py-4 '>
                                <div className='w-[20%] rounded-full '><Image src={img3} alt='' height={1000} width={1000} className='h-[100%] w-[100%] rounded-full object-fill' /></div>
                                <div className='w-[80%] flex flex-col gap-1 w-full'>
                                    <div className='flex justify-between'>
                                        <h2 className='text-sm font-bold '>MetConnect</h2>
                                        <div className='flex items-center  text-2xl '>
                                            <FlatIcon className="flaticon-readed text-primary" />
                                        <p className='text-xs text-primary font-bold'>02:38</p>
                                        </div>
                                    </div>
                                    <p className='text-[#999999] text-sm font-medium  line-clamp-1'>Quis autem vel eum iure reprehenderit ...</p>
                                </div>
                            </div>
                        </div>
                        <div className=' px-5'>
                            <div className='flex gap-4 border-b-2 border-b-[#c6c8c9]  py-4 '>
                                <div className='w-[20%] rounded-full '><Image src={img4} alt='' height={1000} width={1000} className='h-[100%] w-[100%] rounded-full object-fill' /></div>
                                <div className='w-[80%] flex flex-col gap-1 w-full'>
                                    <div className='flex justify-between'>
                                        <h2 className='text-sm font-bold '>Crystal Clear Solutions</h2>
                                        <p className='text-xs text-primary font-bold'>12:56</p>
                                    </div>
                                    <div className='flex justify-between items-center '>
                                    <p className='text-[#999999]  w-[90%]  text-sm font-medium  line-clamp-1'>Nemo enim ipsam voluptatem quia voluptas sit..</p>
                                    <div className='h-[20px] w-[20px] rounded-full flex items-center justify-center bg-primary text-white text-xs'>2</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=' px-5'>
                            <div className='flex gap-4 border-b-2 border-b-[#c6c8c9]  py-4 '>
                                <div className='w-[20%] rounded-full '><Image src={img5} alt='' height={1000} width={1000} className='h-[100%] w-[100%] rounded-full object-fill' /></div>
                                <div className='w-[80%] flex flex-col gap-1 w-full'>
                                    <div className='flex justify-between'>
                                        <h2 className='text-sm font-bold '>CodeFusion</h2>
                                        <div className='flex items-center  text-2xl '>
                                            <FlatIcon className="flaticon-readed text-primary" />
                                        <p className='text-xs text-primary font-bold'>02:38</p>
                                        </div>
                                    </div>
                                    <p className='text-[#999999] text-sm font-medium  line-clamp-1'>Quis autem vel eum iure reprehenderit ...</p>
                                </div>
                            </div>
                        </div>
                        <div className=' px-5'>
                            <div className='flex gap-4  py-4 '>
                                <div className='w-[20%] rounded-full '><Image src={img6} alt='' height={1000} width={1000} className='h-[100%] w-[100%] rounded-full object-fill' /></div>
                                <div className='w-[80%] flex flex-col gap-1 w-full'>
                                    <div className='flex justify-between'>
                                        <h2 className='text-sm font-bold '>InvestSpend</h2>
                                        <div className='flex items-center  text-2xl '>
                                            <FlatIcon className="flaticon-readed text-primary" />
                                        <p className='text-xs text-primary font-bold'>02:38</p>
                                        </div>
                                    </div>
                                    <p className='text-[#999999] text-sm font-medium  line-clamp-1'>Quis autem vel eum iure reprehenderit ...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className=' border-t border-t-black border-b border-b-black border-r border-r-black sm:w-[60%] w-[100%] relative flex-1 min-h-[100%]  rounded-md px-5 py-5'>
                    <div className=' h-full w-full relative'>
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
                            <div className='flex items-center w-full gap-3 mt-4 '>
                                <div className='bg-[#4d4d4d] flex w-[88%] px-5 rounded-full py-3 msg-container'><input type="text" className='bg-transparent w-[100%]' placeholder='Type something...' /><p><FlatIcon className="flaticon-send text-white text-xl"/></p></div>
                                <div className='bg-[#4d4d4d] w-[54px] h-[54px] flex items-center  justify-center text-white   rounded-full'><button><FlatIcon className="flaticon-plus text-white text-2xl font-medium"/></button></div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default ChatsPage