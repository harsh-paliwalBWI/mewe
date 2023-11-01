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
    const headingTabStyle='text-primary sm:text-base text-xs  cursor-pointer font-semibold  '
  return (
<>
<div className='px-body '>
    <div className='flex md:flex-row flex-col xl:gap-x-14 gap-x-7 w-full sm:mt-6 mt-3 sm:mb-20 mb-5 '>
      <div className='md:w-[35%] w-[100%]'>
      <AboutOptions setSelectedTab={setSelectedTab} selectedTab={selectedTab}/>

      </div>
    <div className='md:w-[60%] w-[100%]'>
        <div className='flex items-center w-full  sm:gap-x-10 gap-x-4 xl:mt-14 mt-7 xl:mb-8 mb-4 sm:px-8 px-4'>
            <div  onClick={()=>setSelectedTab(1)} className={`${headingTabStyle} ${selectedTab===1&&"bg-primary text-white rounded-full sm:px-6 px-3 sm:py-2.5 py-1"}`}><h3>About</h3></div>
            <div  onClick={()=>setSelectedTab(2)} className={`${headingTabStyle} ${selectedTab===2&&"bg-primary text-white rounded-full sm:px-6 px-3 sm:py-2.5 py-1"}`}><h3>Photos</h3></div>
            <div  onClick={()=>setSelectedTab(3)} className={`${headingTabStyle} ${selectedTab===3&&"bg-primary text-white rounded-full sm:px-6 px-3 sm:py-2.5 py-1"}`}><h3>Videos</h3></div>
            <div  onClick={()=>setSelectedTab(4)} className={`${headingTabStyle} ${selectedTab===4&&"bg-primary text-white rounded-full sm:px-6 px-3 sm:py-2.5 py-1"}`}><h3>Posts</h3></div>
        </div>
        {/* <div className='w-[100%] border border-primary'> */}
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
              
{/* </div> */}
        </div>
    </div>
</div>
</>
  )
}

export default MainAbout