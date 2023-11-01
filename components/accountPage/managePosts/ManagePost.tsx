"use client"
import React, { useState } from 'react'
import NewPost from '../businessAccountPage/newPost/NewPost'
import img from "../../../images/hotel.svg"
import Image from 'next/image'
import logoImg from "../../../images/a5 2.svg"
// import 'antd/dist/antd.css';
import '@ant-design/cssinjs'
import FlatIcon from '@/components/flatIcon/flatIcon'

import { Carousel } from 'antd';
// import "antd/dist/antd.css"

const ManagePost = () => {
    const [isNewPost,setIsNewPost]=useState(false)
    // const contentStyle: React.CSSProperties = {
    //     height: '160px',
    //     color: '#000',
    //     lineHeight: '160px',
    //     textAlign: 'center',
    //     background: '#364d79',
    //   };
  return (
    <>
   {isNewPost?<NewPost/>:
    <div className=' md:w-[60%] w-[100%]  h-fit'>
        
        <div className='flex items-center justify-between my-5'>
            <div className='text-primary font-bold sm:text-xl text-lg '><h2>My Posts</h2></div>
            <div onClick={()=>setIsNewPost(true)} className='bg-primary font-semibold  md:text-lg sm:text-base text-sm text-white cursor-pointer sm:px-10 px-5 sm:py-3.5 py-2 rounded-md'>
                <button>+ New Post</button></div>
        </div>
        <div className=' bg-[#F8FAFC] sm:px-8 px-4 sm:py-10 py-5'>
          <div className='flex justify-between '>
            <div className='flex items-center sm:gap-5 gap-3  mb-4'>
            <div className='w-[65px] h-[65px]'><Image src={logoImg} alt='' height={1000} width={1000} className='h-[100%] w-[100%] object-fill '/></div>
            <div className=''>
              <div className='flex items-center sm:gap-3 gap-2'>
                <div className='text-primary font-bold sm:text-lg text-xs'>Code Fusion</div>
                <div className='h-[5px] w-[5px] rounded-full bg-primary'> </div>
              <div className='text-[#636464] sm:text-sm text-xs font-medium '>5mins ago</div>
              </div>
              <div className='text-[#636464] sm:text-sm text-xs font-medium '>@codefusion243</div>
            </div>
            </div>
            <div className='flex items-center gap-1'>
              {/* <div className='h-[4px] w-[4px] bg-primary rounded-full'></div>
              <div className='h-[4px] w-[4px] bg-primary rounded-full'></div>
              <div className='h-[4px] w-[4px] bg-primary rounded-full'></div> */}
              <FlatIcon className="flaticon-options text-primary text-2xl"/>
            </div>
          </div>
        <div className=' sm:h-[300px] h-[200px] w-[100%] relative '>
        <Carousel autoplay dots={true} dotPosition='bottom' className=' h-full rounded-lg'>
    
        <div className='w-[100%]  sm:h-[300px] h-[200px] rounded-lg relative'>
        <Image src={img} alt='' className='w-[100%] h-[100%] object-cover rounded-lg'/>
        <div className='bg-primary absolute bottom-0 left-0 w-[100%] border border-[green] py-2.5 px-5 flex justify-between items-center  rounded-br-lg rounded-bl-lg'>
    <div className='flex items-center gap-4'>
      <div><FlatIcon className="flaticon-heart text-white text-xl"/></div>
      <div><FlatIcon className="flaticon-chat text-white text-xl"/></div>
    </div>
    <div><FlatIcon className="flaticon-send text-white text-xl"/></div>
    </div>
        </div>
      {/* <h3 className='text-xl text-primary h-[300px] w-fit'>1</h3> */}
  
  
    <div className='w-[100%] sm:h-[300px] h-[200px] rounded-lg relative'>
        <Image src={img} alt='' className='w-[100%] h-[100%] object-cover rounded-lg'/>
        <div className='bg-primary absolute bottom-0 left-0 w-[100%] border border-[green] py-2.5 px-5 flex justify-between items-center  rounded-br-lg rounded-bl-lg'>
    <div className='flex items-center gap-4'>
      <div><FlatIcon className="flaticon-heart text-white text-xl"/></div>
      <div><FlatIcon className="flaticon-chat text-white text-xl"/></div>
    </div>
    <div><FlatIcon className="flaticon-send text-white text-xl"/></div>
    </div>

        </div>
      <div className='w-[100%] sm:h-[300px] h-[200px] rounded-lg relative'>
        <Image src={img} alt='' className='w-[100%] h-[100%] object-cover rounded-lg'/>
        <div className='bg-primary absolute bottom-0 left-0 w-[100%] border border-[green] py-2.5 px-5 flex justify-between items-center  rounded-br-lg rounded-bl-lg'>
    <div className='flex items-center gap-4'>
      <div><FlatIcon className="flaticon-heart text-white text-xl"/></div>
      <div><FlatIcon className="flaticon-chat text-white text-xl"/></div>
    </div>
    <div><FlatIcon className="flaticon-send text-white text-xl"/></div>
    </div>

        </div> 
    <div className='w-[100%] sm:h-[300px] h-[200px] rounded-lg relative'>
        <Image src={img} alt='' className='w-[100%] h-[100%] object-cover rounded-lg'/>
        <div className='bg-primary absolute bottom-0 left-0 w-[100%] border border-[green] py-2.5 px-5 flex justify-between items-center  rounded-br-lg rounded-bl-lg'>
    <div className='flex items-center gap-4'>
      <div><FlatIcon className="flaticon-heart text-white text-xl"/></div>
      <div><FlatIcon className="flaticon-chat text-white text-xl"/></div>
    </div>
    <div><FlatIcon className="flaticon-send text-white text-xl"/></div>
    </div>

        </div>
  </Carousel>
        </div>
        <div>
          <div className='flex flex-col gap-7 sm:mt-10 mt-5'>
            <div className='flex flex-col gap-1'>
            <h2 className='sm:text-lg text-base font-bold '>Deliver Conference</h2>
            <p className='text-xs text-[#9fa0a2] font-medium  font-medium'>Eth2Vec: Learning contract-wide code representations for vulnerability detection on Ethereum smart cEth2Vec: Learning 
             contract-wide code representations for vulnerability detection on Ethereum smart c</p>
             </div>
             <div className='w-full '>
              <input type="text" placeholder='Write something..' className='w-[100%] border border-gray-500 px-10 py-3 rounded-full outline-0'/>
              </div>
          </div>
        </div>
        </div>
    </div>
}
    </>
  )
}

export default ManagePost