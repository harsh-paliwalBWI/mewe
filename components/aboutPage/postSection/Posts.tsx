"use client"
import React,{FC} from 'react'
import Image from 'next/image'
import logoImg from "../../../images/a5 2.svg"
import img from "../../../images/hotel.svg"
// import fhfd from "../../"
import '@ant-design/cssinjs'
import { Carousel } from 'antd';
import PostsSlider from '@/components/postsSlider/PostsSlider'
interface Props {
  aboutInfo:any
}
const Posts:FC<Props> = ({aboutInfo }) => {
  return (
    <div className='w-full '>
      <PostsSlider aboutInfo={aboutInfo}/>
      </div>

  )
}

export default Posts