import React, { useState } from 'react'
import NewPost from '../businessAccountPage/newPost/NewPost'
import img from "../../../images/hotel.svg"
import Image from 'next/image'
import logoImg from "../../../images/a5 2.svg"
// import 'antd/dist/antd.css';
import '@ant-design/cssinjs'
// import 'antd/dist/antd.c'

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
    <div className=' flex-[0.63]  h-fit'>
        
        <div className='flex items-center justify-between my-5'>
            <div className='text-primary font-bold text-xl tracking-widest'><h2>My Posts</h2></div>
            <div onClick={()=>setIsNewPost(true)} className='bg-primary font-semibold tracking-widest text-lg text-white cursor-pointer px-10 py-3.5 rounded-md'>
                <button>+ New Post</button></div>
        </div>
        <div className=' bg-[#F8FAFC] px-8 py-10'>
          <div className='flex justify-between '>
            <div className='flex items-center gap-5 mb-4'>
            <div className='w-[65px] h-[65px]'><Image src={logoImg} alt='' height={1000} width={1000} className='h-[100%] w-[100%] object-fill '/></div>
            <div className=''>
              <div className='flex items-center gap-3'><div className='text-primary font-bold text-lg'>Code Fusion</div><div className='h-[5px] w-[5px] rounded-full bg-primary'> </div>
              <div className='text-[#636464] text-sm font-medium tracking-wider'>5mins ago</div></div>
              <div className='text-[#636464] text-sm font-medium tracking-wider'>@codefusion243</div>
            </div>
            </div>
            <div className='flex items-center gap-1'>
              <div className='h-[4px] w-[4px] bg-primary rounded-full'></div>
              <div className='h-[4px] w-[4px] bg-primary rounded-full'></div>

              <div className='h-[4px] w-[4px] bg-primary rounded-full'></div>

            </div>
          </div>
        <div className=' h-[300px] w-[700px] relative '>
        <Carousel autoplay dots={true} dotPosition='bottom' className=' h-full rounded-lg'>
    
        <div className='w-[700px] h-[300px] rounded-lg relative'>
        <Image src={img} alt='' className='w-[100%] h-[100%] object-cover rounded-lg'/>
        <div className='bg-primary absolute bottom-0 left-0 w-full py-2 flex justify-between items-center px-5 rounded-br-lg rounded-bl-lg'>
          <div className='flex items-center gap-4'>
            <div>icon</div>
            <div>icon</div>
          </div>
          <div>icon</div>
          </div>
        </div>
      {/* <h3 className='text-xl text-primary h-[300px] w-fit'>1</h3> */}
  
  
    <div className='w-[700px] h-[300px] rounded-lg relative'>
        <Image src={img} alt='' className='w-[100%] h-[100%] object-cover rounded-lg'/>
        <div className='bg-primary absolute bottom-0 left-0 w-full py-2 flex justify-between items-center px-5 rounded-br-lg rounded-bl-lg'>
          <div className='flex items-center gap-4'>
            <div>icon</div>
            <div>icon</div>
          </div>
          <div>icon</div>
          </div>

        </div>
      <div className='w-[700px] h-[300px] rounded-lg relative'>
        <Image src={img} alt='' className='w-[100%] h-[100%] object-cover rounded-lg'/>
        <div className='bg-primary absolute bottom-0 left-0 w-full py-2 flex justify-between items-center px-5 rounded-br-lg rounded-bl-lg'>
          <div className='flex items-center gap-4'>
            <div>icon</div>
            <div>icon</div>
          </div>
          <div>icon</div>
          </div>

        </div> 
    <div className='w-[700px] h-[300px] rounded-lg relative'>
        <Image src={img} alt='' className='w-[100%] h-[100%] object-cover rounded-lg'/>
        <div className='bg-primary absolute bottom-0 left-0 w-full py-2 flex justify-between items-center px-5 rounded-br-lg rounded-bl-lg'>
          <div className='flex items-center gap-4'>
            <div>icon</div>
            <div>icon</div>
          </div>
          <div>icon</div>
          </div>

        </div>
  </Carousel>
{/* <div>
    <div></div>
    <div></div>
    <div></div>
</div> */}
        </div>
        <div>
          <div className='flex flex-col gap-7 mt-10'>
            <div className='flex flex-col gap-1'>
            <h2 className='text-lg font-bold'>Deliver Conference</h2>
            <p className='text-xs text-[#9fa0a2] font-medium tracking-wide font-medium'>Eth2Vec: Learning contract-wide code representations for vulnerability detection on Ethereum smart cEth2Vec: Learning 
             contract-wide code representations for vulnerability detection on Ethereum smart c</p>
             </div>
             <div className='w-full '>
              <input type="text" placeholder='Write something..' className='w-[100%] border border-gray-500 px-10 py-3 rounded-full'/>
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