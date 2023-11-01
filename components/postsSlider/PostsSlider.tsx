"use client"
import React from 'react'
import Image from 'next/image'
import logoImg from "../../images/a5 2.svg"
import img from "../../images/hotel.svg"
// import fhfd from "../../"
import '@ant-design/cssinjs'
import { Carousel } from 'antd';
import FlatIcon from '../flatIcon/flatIcon'

const PostsSlider = () => {
  return (
  <div className='  w-full  h-fit'>
  <div className=' bg-[#F8FAFC] xl:px-8 px-4 xl:pt-8 pt-4 xl:pb-10 pb-5  w-full'>
    <div className='flex justify-between '>
      <div className='flex items-center sm:gap-5 gap-3  mb-4'>
      <div className='w-[65px] h-[65px]'><Image src={logoImg} alt='' height={1000} width={1000} className='h-[100%] w-[100%] object-fill '/></div>
      <div className=''>
        <div className='flex items-center sm:gap-3 gap-2'>
          <div className='text-primary font-bold xl:text-lg sm:text-base text-xs'>Code Fusion</div>
          <div className='h-[5px] w-[5px] rounded-full bg-primary'> </div>
        <div className='text-[#636464] sm:text-sm text-xs font-medium '>5mins ago</div>
        </div>
        <div className='text-[#636464] sm:text-sm text-xs font-medium '>@codefusion243</div>
      </div>
      </div>
      <div className='flex items-center gap-1'>
       
        <FlatIcon className="flaticon-options text-primary xl:text-4xl sm:text-2xl text-xl"/>
      </div>
    </div>
  <div className=' sm:h-[300px] h-[200px] w-full relative  '>
  <Carousel autoplay dots={true} dotPosition='bottom' className=' h-full rounded-lg  w-[100%]'>

  <div className='w-full sm:h-[300px] h-[200px] rounded-lg relative '>
  <Image src={img} alt='' height={1000} width={1000} className='w-[100%] sm:h-[300px] h-[200px] object-cover rounded-lg ' />
  <div className='bg-primary absolute bottom-0 left-0 w-[100%] border  py-2.5 px-5 flex justify-between items-center  rounded-br-lg rounded-bl-lg'>
    <div className='flex items-center gap-4'>
      <div><FlatIcon className="flaticon-heart text-white text-xl"/></div>
      <div><FlatIcon className="flaticon-chat text-white text-xl"/></div>
    </div>
    <div><FlatIcon className="flaticon-send text-white text-xl"/></div>
    </div>
  </div>
  <div className='w-full  sm:h-[300px] h-[200px] rounded-lg relative '>
  <Image src={img} alt='' height={1000} width={1000} className='w-[100%] sm:h-[300px] h-[200px] object-cover rounded-lg ' />
  <div className='bg-primary absolute bottom-0 left-0 w-[100%] border  py-2.5 px-5 flex justify-between items-center  rounded-br-lg rounded-bl-lg'>
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
    <div className='flex flex-col md:gap-7 gap-4 xl:mt-10 mt-5'>
      <div className='flex flex-col gap-1'>
      <h2 className='xl:text-lg sm:text-base text-sm font-bold '>Deliver Conference</h2>
      <p className='text-xs text-[#9fa0a2] font-medium  font-medium'>Eth2Vec: Learning contract-wide code representations for vulnerability detection on Ethereum smart cEth2Vec: Learning 
       contract-wide code representations for vulnerability detection on Ethereum smart c</p>
       </div>
       <div className='w-full '>
        <input type="text" placeholder='Write something..' className='w-[100%] border border-gray-500 xl:px-10 px-5 md:py-3 py-2 rounded-full outline-0'/>
        </div>
    </div>
  </div>
  </div>
</div>

  )
}

export default PostsSlider