"use client"
import React,{useState,FC} from 'react'
import ProfileOptions from './profileOptions/ProfileOptions'
import MyProfile from './myProfile/MyProfile'
import BusinessAccount from './businessAccountPage/BusinessAccount'
import ManagePost from './managePosts/ManagePost'
import ChatsPage from './chatsPage/ChatsPage'
import ProfileOptionsMobile from '../profileMobile/ProfileOptionsMobile'
// import { useRouter } from 'next/router'
import { useRouter,useSearchParams } from 'next/navigation'
// import { log } from 'console'
import NewPost from './businessAccountPage/newPost/NewPost'
import { Cookie } from 'next/font/google'

interface Props{
  cookie:any
}
const AccountPage:FC<Props> = ({cookie}) => {
  // console.log(cookie);
  
  const router=useRouter()
  const params=useSearchParams()
  const currTab=params.get("tab")
    const [selectedTab,setSelectedTab]=useState(0)
    // console.log("hiii");
    
    // console.log(currTab,"------------");
    
  return (
   <>
   <div className='flex w-[100%] md:flex-row flex-col gap-y-6 px-body xl:gap-x-14 gap-x-7 md:mt-14 mt-7 md:mb-20 mb-10 relative z-10'>
    <ProfileOptions cookie={cookie} setSelectedTab={setSelectedTab} selectedTab={selectedTab}/>
    <ProfileOptionsMobile/>
    {/* <div className="  "> */}
        
            {
                currTab==="my-profile"&&<MyProfile />
              }
          {
                currTab==="business-account"&&<BusinessAccount/>
              }
                 {
               currTab==="manage-posts"&&<ManagePost/>
              }
                {
                currTab==="chat"&&<ChatsPage/>
              }
               {
                currTab==="new-post"&&<NewPost/>
              }
       
  
        {/* </div> */}
   </div>
   </>
  )
}

export default AccountPage