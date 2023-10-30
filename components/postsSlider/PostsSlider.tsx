"use client"
import React from 'react'
import Image from 'next/image'
import logoImg from "../../images/a5 2.svg"
import img from "../../images/hotel.svg"
// import fhfd from "../../"
import '@ant-design/cssinjs'
import { Carousel } from 'antd';

const PostsSlider = () => {
  return (
  <div className='  w-[100%]  h-fit'>
  <div className=' bg-[#F8FAFC] sm:px-8 px-4 sm:py-10 py-5 w-[100%]'>
    <div className='flex justify-between '>
      <div className='flex items-center sm:gap-5 gap-3  mb-4'>
      <div className='w-[65px] h-[65px]'><Image src={logoImg} alt='' height={1000} width={1000} className='h-[100%] w-[100%] object-fill '/></div>
      <div className=''>
        <div className='flex items-center sm:gap-3 gap-2'>
          <div className='text-primary font-bold sm:text-lg text-xs'>Code Fusion</div>
          <div className='h-[5px] w-[5px] rounded-full bg-primary'> </div>
        <div className='text-[#636464] sm:text-sm text-xs font-medium tracking-wider'>5mins ago</div>
        </div>
        <div className='text-[#636464] sm:text-sm text-xs font-medium tracking-wider'>@codefusion243</div>
      </div>
      </div>
      <div className='flex items-center gap-1'>
        <div className='h-[4px] w-[4px] bg-primary rounded-full'></div>
        <div className='h-[4px] w-[4px] bg-primary rounded-full'></div>
        <div className='h-[4px] w-[4px] bg-primary rounded-full'></div>
      </div>
    </div>
  <div className=' sm:h-[300px] h-[200px] w-[100%] relative border border-[red] '>
  <Carousel autoplay dots={true} dotPosition='bottom' className=' h-full rounded-lg border border-primary w-[100%]'>

  <div className='w-[100%]  sm:h-[300px] h-[200px] rounded-lg relative border border-[yellow]'>
  <Image src={img} alt='' height={1000} width={1000} className='w-[100%] h-[100%] object-fill rounded-lg border border-black' />
  {/* <div className='bg-primary absolute bottom-0 left-0 w-[100%] border border-[green] py-2 flex justify-between items-center  rounded-br-lg rounded-bl-lg'>
    <div className='flex items-center gap-4'>
      <div>icon</div>
      <div>icon</div>
    </div>
    <div>icon</div>
    </div> */}
  </div>
  <div className='w-[100%]  sm:h-[300px] h-[200px] rounded-lg relative border border-[yellow]'>
  <Image src={img} alt='' height={1000} width={1000} className='w-[100%] h-[100%] object-fill rounded-lg border border-black'/>
  {/* <div className='bg-primary absolute bottom-0 left-0 w-[100%] border border-[green] py-2 flex justify-between items-center  rounded-br-lg rounded-bl-lg'>
    <div className='flex items-center gap-4'>
      <div>icon</div>
      <div>icon</div>
    </div>
    <div>icon</div>
    </div> */}
  </div>



</Carousel>
  </div>
  <div>
    <div className='flex flex-col gap-7 sm:mt-10 mt-5'>
      <div className='flex flex-col gap-1'>
      <h2 className='sm:text-lg text-base font-bold tracking-wider'>Deliver Conference</h2>
      <p className='text-xs text-[#9fa0a2] font-medium tracking-wide font-medium'>Eth2Vec: Learning contract-wide code representations for vulnerability detection on Ethereum smart cEth2Vec: Learning 
       contract-wide code representations for vulnerability detection on Ethereum smart c</p>
       </div>
       <div className='w-full '>
        <input type="text" placeholder='Write something..' className='w-[100%] border border-gray-500 px-10 py-3 rounded-full outline-0'/>
        </div>
    </div>
  </div>
  </div>
</div>

  )
}

export default PostsSlider