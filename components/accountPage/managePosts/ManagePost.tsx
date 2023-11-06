"use client"
import React, { use, useState } from 'react'
import NewPost from '../businessAccountPage/newPost/NewPost'
import img from "../../../images/hotel.svg"
import Image from 'next/image'
import logoImg from "../../../images/a5 2.svg"
// import 'antd/dist/antd.css';
import '@ant-design/cssinjs'
import FlatIcon from '@/components/flatIcon/flatIcon'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

import { Carousel } from 'antd';
// import "antd/dist/antd.css"

const ManagePost = () => {
  const [isNewPost, setIsNewPost] = useState(false)
  const pathName = usePathname()
  const router = useRouter()


  return (
    <>
      <div className={` h-fit   ${pathName.includes("manage-posts") ? "block w-[100%]  sm:mt-5 md:mt-10 md:mb-24 mb-5" : "sm:block hidden md:w-[60%] w-[100%]"}`}>
        {
          pathName.includes("manage-posts") && <div
            onClick={() => {
              console.log("XFBB");

              router.replace("/account?tab=my-profile")
            }}
            className='mb-2'><FlatIcon className="flaticon-arrow-right rotate-180 text-2xl font-bold" /></div>
        }
        <div className='flex items-center justify-between my-5'>
          <div className='text-primary font-bold sm:text-lg text-lg '><h2>My Posts</h2></div>
          <Link href={{ pathname: '/account', query: { tab: 'new-post' } }} className={`${pathName.includes("manage-posts") ? "hidden" : "block"}`}>
            <div
              className='bg-primary font-medium  md:text-base sm:text-base text-sm text-white cursor-pointer sm:px-10 px-5 sm:py-3.5 py-2 rounded-md'>
              <button>+ New Post</button></div>
          </Link>
          <Link href={"/new-post"} className={`${pathName.includes("manage-posts") ? "block" : "hidden"}`}>
            <div
              className='bg-primary font-medium  md:text-base sm:text-base text-sm text-white cursor-pointer sm:px-10 px-5 sm:py-3.5 py-2 rounded-md'>
              <button>+ New Post</button></div>
          </Link>
        </div>
        <div className=' bg-[#F8FAFC] sm:px-8 px-4 sm:py-0 sm:pt-6 sm:pb-10 py-5'>
          <div className='flex justify-between '>
            <div className='flex items-center sm:gap-5 gap-3  mb-4'>
              <div className='w-[65px] h-[65px]'><Image src={logoImg} alt='' height={1000} width={1000} className='h-[100%] w-[100%] object-fill ' /></div>
              <div className=''>
                <div className='flex items-center sm:gap-3 gap-2'>
                  <div className='text-primary font-bold sm:text-base text-xs'>Code Fusion</div>
                  <div className='h-[5px] w-[5px] rounded-full bg-primary'> </div>
                  <div className='text-[#636464] sm:text-sm text-xs font-medium '>5mins ago</div>
                </div>
                <div className='text-[#636464] sm:text-sm text-xs font-medium '>@codefusion243</div>
              </div>
            </div>
            <div className='flex items-center gap-1'>
              <FlatIcon className="flaticon-options text-primary text-2xl" />
            </div>
          </div>
          <div className=' sm:h-[300px] h-[200px] w-[100%] relative '>
            <Carousel autoplay className=' h-full rounded-lg'>
              <div className='w-[100%]  sm:h-[300px] h-[200px] rounded-lg relative'>
                <Image src={img} alt='' className='w-[100%] h-[100%] object-cover rounded-lg' />
                <div className='bg-primary absolute bottom-0 left-0 w-[100%] border border-[green] py-2.5 px-5 flex justify-between items-center  rounded-br-lg rounded-bl-lg'>
                  <div className='flex items-center gap-4'>
                    <div><FlatIcon className="flaticon-heart text-white text-xl" /></div>
                    <div><FlatIcon className="flaticon-chat text-white text-xl" /></div>
                  </div>
                  <div><FlatIcon className="flaticon-send text-white text-xl" /></div>
                </div>
              </div>
              <div className='w-[100%] sm:h-[300px] h-[200px] rounded-lg relative'>
                <Image src={img} alt='' className='w-[100%] h-[100%] object-cover rounded-lg' />
                <div className='bg-primary absolute bottom-0 left-0 w-[100%] border border-[green] py-2.5 px-5 flex justify-between items-center  rounded-br-lg rounded-bl-lg'>
                  <div className='flex items-center gap-4'>
                    <div><FlatIcon className="flaticon-heart text-white text-xl" /></div>
                    <div><FlatIcon className="flaticon-chat text-white text-xl" /></div>
                  </div>
                  <div><FlatIcon className="flaticon-send text-white text-xl" /></div>
                </div>
              </div>
              <div className='w-[100%] sm:h-[300px] h-[200px] rounded-lg relative'>
                <Image src={img} alt='' className='w-[100%] h-[100%] object-cover rounded-lg' />
                <div className='bg-primary absolute bottom-0 left-0 w-[100%] border border-[green] py-2.5 px-5 flex justify-between items-center  rounded-br-lg rounded-bl-lg'>
                  <div className='flex items-center gap-4'>
                    <div><FlatIcon className="flaticon-heart text-white text-xl" /></div>
                    <div><FlatIcon className="flaticon-chat text-white text-xl" /></div>
                  </div>
                  <div><FlatIcon className="flaticon-send text-white text-xl" /></div>
                </div>
              </div>
              <div className='w-[100%] sm:h-[300px] h-[200px] rounded-lg relative'>
                <Image src={img} alt='' className='w-[100%] h-[100%] object-cover rounded-lg' />
                <div className='bg-primary absolute bottom-0 left-0 w-[100%] border border-[green] py-2.5 px-5 flex justify-between items-center  rounded-br-lg rounded-bl-lg'>
                  <div className='flex items-center gap-4'>
                    <div><FlatIcon className="flaticon-heart text-white text-xl" /></div>
                    <div><FlatIcon className="flaticon-chat text-white text-xl" /></div>
                  </div>
                  <div><FlatIcon className="flaticon-send text-white text-xl" /></div>
                </div>
              </div>
            </Carousel>
          </div>
          <div>
            <div className='flex flex-col gap-7 sm:mt-10 mt-5'>
              <div className='flex flex-col gap-1'>
                <h2 className=' text-base font-bold '>Deliver Conference</h2>
                <p className='text-xs text-[#9fa0a2] font-medium  font-medium'>Eth2Vec: Learning contract-wide code representations for vulnerability detection on Ethereum smart cEth2Vec: Learning
                  contract-wide code representations for vulnerability detection on Ethereum smart c</p>
              </div>
              <div className='w-full post-cont '>
                <input type="text" placeholder='Write something..' className='w-[100%] border border-gray-500 px-5 py-3 rounded-full outline-0' />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* } */}
    </>
  )
}

export default ManagePost