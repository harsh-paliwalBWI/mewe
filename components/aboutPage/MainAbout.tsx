"use client"
import React, { useEffect, useState } from 'react'
import About from './about/About'
import AboutOptions from './aboutOptions/AboutOptions'
import Photos from './photos/Photos'
import Posts from './postSection/Posts'
import VideoSection from './videoSection/VideoSection'
import Followers from './followers/Followers'
import Followings from './followings/Followings'
import { useQuery } from '@tanstack/react-query'
import { fetchSingleStartup, getStartUpData } from '@/services/startupService'
import { getCookie } from "cookies-next";


const MainAbout = ({ params }: any) => {
  const [client, setClient] = useState(false);
  const cookies = { value: getCookie("uid") };
  const { data: singleStartup } = useQuery({
    queryKey: ["startup", params?.slug],
    queryFn: () => fetchSingleStartup(params?.slug),
  });

  // console.log(singleStartup,"---jj-----");
  const { data: startUpData } = useQuery({
    queryKey: ["startUpData"],
    queryFn: () => getStartUpData(cookies),
  });

  // console.log(startUpData);
  
  const [selectedTab, setSelectedTab] = useState(1)
  const headingTabStyle = 'text-primary   xl:text-base md:text-xs text-sm  cursor-pointer font-semibold border md:border-0 rounded-full md:rounded-0 text-center md:text-start py-1  '
  // const headingTabStyle='text-primary lg:text-base  sm:text-sm text-sm  cursor-pointer font-semibold border border-[red]'
  // const selectedStyle="bg-primary text-white rounded-full md:px-6 px-3 md:py-2.5 py-1"
  const selectedStyle = "bg-primary text-white rounded-full text-center md:text-start md:px-6  md:py-2.5 py-1  "

  useEffect(() => {
    // console.log("inside use effect");
    setClient(true)

}, []);
  return (
    <>
      <div className='px-body '>
        <div className='flex md:flex-row flex-col xl:gap-x-14 gap-x-7 w-full sm:mt-6 mt-3 md:mb-32 sm:mb-10 mb-5 '>
          <div className='md:w-[35%] w-[100%]'>
            <AboutOptions setSelectedTab={setSelectedTab} selectedTab={selectedTab} aboutInfo={singleStartup}/>
          </div>
          <div className='md:w-[60%] w-[100%]'>
            {/* <div className='grid grid-cols-6  xl:mt-14 mt-7 xl:mb-8 mb-6 sm:px-8 px-4'> */}
            <div className='md:flex md:flex-nowrap flex-wrap items-center grid sm:grid-cols-3 grid-cols-2 gap-4 w-full  xl:gap-x-10 gap-x-4 xl:mt-14 mt-7 xl:mb-8 mb-6 xl:px-8 px-4 '>
              <div onClick={() => setSelectedTab(1)} className={`${headingTabStyle} ${selectedTab === 1 && `${selectedStyle}`}`}><h3>About</h3></div>
              <div onClick={() => setSelectedTab(2)} className={`${headingTabStyle} ${selectedTab === 2 && `${selectedStyle}`}`}><h3>Photos</h3></div>
              <div onClick={() => setSelectedTab(3)} className={`${headingTabStyle} ${selectedTab === 3 && `${selectedStyle}`}`}><h3>Videos</h3></div>
              <div onClick={() => setSelectedTab(4)} className={`${headingTabStyle} ${selectedTab === 4 && `${selectedStyle}`}`}><h3>Posts</h3></div>
             {client&&startUpData?.id===singleStartup?.id&&
              <div onClick={() => setSelectedTab(5)} className={`${headingTabStyle} ${selectedTab === 5 && `${selectedStyle}`}`}><h3>Followers</h3></div>
             }
             {client&&startUpData?.id===singleStartup?.id&&
              <div onClick={() => setSelectedTab(6)} className={`${headingTabStyle} ${selectedTab === 6 && `${selectedStyle}`}`}><h3>Following</h3></div>

             }
            </div>
            {selectedTab === 1 && <About aboutInfo={singleStartup}/>}
            {selectedTab === 2 && <Photos />}
            {selectedTab === 3 && <VideoSection />}
            {selectedTab === 4 && <Posts aboutInfo={singleStartup}/>}
            {selectedTab === 5 && <Followers aboutInfo={singleStartup}  params={params}  />}
            {selectedTab === 6 && <Followings aboutInfo={singleStartup}  params={params}/>}
          </div>
        </div>
      </div>
    </>
  )
}

export default MainAbout