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
    const headingTabStyle='text-primary lg:text-base  sm:text-sm text-sm  cursor-pointer font-semibold'
    const selectedStyle="bg-primary text-white rounded-full md:px-6 px-3 md:py-2.5 py-1"
  return (
<>
<div className='px-body '>
    <div className='flex md:flex-row flex-col xl:gap-x-14 gap-x-7 w-full sm:mt-6 mt-3 md:mb-32 sm:mb-10 mb-5 '>
      <div className='md:w-[35%] w-[100%]'>
      <AboutOptions setSelectedTab={setSelectedTab} selectedTab={selectedTab}/>

      </div>
    <div className='md:w-[60%] w-[100%]'>
        <div className='flex items-center w-full  sm:gap-x-10 gap-x-4 xl:mt-14 mt-7 xl:mb-8 mb-6 sm:px-8 px-4'>
            <div  onClick={()=>setSelectedTab(1)} className={`${headingTabStyle} ${selectedTab===1&&`${selectedStyle}`}`}><h3>About</h3></div>
            <div  onClick={()=>setSelectedTab(2)} className={`${headingTabStyle} ${selectedTab===2&&`${selectedStyle}`}`}><h3>Photos</h3></div>
            <div  onClick={()=>setSelectedTab(3)} className={`${headingTabStyle} ${selectedTab===3&&`${selectedStyle}`}`}><h3>Videos</h3></div>
            <div  onClick={()=>setSelectedTab(4)} className={`${headingTabStyle} ${selectedTab===4&&`${selectedStyle}`}`}><h3>Posts</h3></div>
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