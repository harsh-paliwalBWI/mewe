import React, { useState } from 'react'
import NewPost from '../businessAccountPage/newPost/NewPost'
import img from "../../../images/hotel.svg"
import Image from 'next/image'
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
    <div className=' flex-[0.63] border border-primary'>
        
        <div className='flex items-center justify-between my-5'>
            <div className='text-primary font-bold text-xl tracking-wider'><h2>My Posts</h2></div>
            <div onClick={()=>setIsNewPost(true)} className='bg-primary font-semibold text-xl text-white cursor-pointer px-10 py-3.5 rounded-md'>
                <button>+ New Post</button></div>
        </div>
        <div className=' h-[300px] w-[700px] bg-priamry border border-primary bg-[#F8FAFC]'>
        <Carousel autoplay dots={true} dotPosition='bottom' className='border border-black h-full'>
    <div>
        <div className='w-[700px] h-[300px]'>
        <Image src={img} alt='' className='w-[100%] h-[100%] object-fill'/>
        </div>
      {/* <h3 className='text-xl text-primary h-[300px] w-fit'>1</h3> */}
    </div>
    <div>
    <div className='w-[700px] h-[300px]'>
        <Image src={img} alt='' className='w-[100%] h-[100%] object-fill'/>
        </div>
    </div>
    <div>
      <div className='w-[700px] h-[300px]'>
        <Image src={img} alt='' className='w-[100%] h-[100%] object-fill'/>
        </div> 
    </div>
    <div>
    <div className='w-[700px] h-[300px]'>
        <Image src={img} alt='' className='w-[100%] h-[100%] object-fill'/>
        </div>
    </div>
  </Carousel>
{/* <div>
    <div></div>
    <div></div>
    <div></div>
</div> */}
        </div>
    </div>
}
    </>
  )
}

export default ManagePost