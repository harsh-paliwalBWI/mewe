"use client"
import React,{useState} from 'react'
// import AboutOptions from './aboutOptions/AboutOptions'
import About from './about/About'
import AboutOptions from './aboutOptions/AboutOptions'
import Photos from './photos/Photos'
import Posts from './postSection/Posts'
import VideoSection from './videoSection/VideoSection'

const MainAbout = () => {
    const [selectedTab,setSelectedTab]=useState(1)
    const headingTabStyle='text-primary sm:text-sm text-xs tracking-wider cursor-pointer font-semibold  '
  return (
<>
<div className='px-body border border-primary'>
    <div className='flex md:flex-row flex-col gap-x-14 w-full mt-6 mb-20'>
    <AboutOptions setSelectedTab={setSelectedTab} selectedTab={selectedTab}/>
    <div className='md:w-[60%] w-[100%]'>
        <div className='flex items-center  sm:gap-x-10 gap-x-4 mt-14 mb-8 sm:px-8 px-4'>
            <div  onClick={()=>setSelectedTab(1)} className={`${headingTabStyle} ${selectedTab===1&&"bg-primary text-white rounded-full sm:px-6 px-3 sm:py-2.5 py-1"}`}><h3>About</h3></div>
            <div  onClick={()=>setSelectedTab(2)} className={`${headingTabStyle} ${selectedTab===2&&"bg-primary text-white rounded-full sm:px-6 px-3 sm:py-2.5 py-1"}`}><h3>Photos</h3></div>
            <div  onClick={()=>setSelectedTab(3)} className={`${headingTabStyle} ${selectedTab===3&&"bg-primary text-white rounded-full sm:px-6 px-3 sm:py-2.5 py-1"}`}><h3>Videos</h3></div>
            <div  onClick={()=>setSelectedTab(4)} className={`${headingTabStyle} ${selectedTab===4&&"bg-primary text-white rounded-full sm:px-6 px-3 sm:py-2.5 py-1"}`}><h3>Posts</h3></div>
        </div>
        {
                selectedTab===1&&<About/>
              }
        {
                selectedTab===2&&<Photos/>
              }
              {
                selectedTab===3&&<VideoSection/>
              }
               {
                selectedTab===4&&<Posts/>
              }
        </div>
    </div>
</div>
</>
  )
}

export default MainAbout