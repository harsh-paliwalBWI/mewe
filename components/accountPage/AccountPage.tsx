"use client"
import React,{useState} from 'react'
import ProfileOptions from './profileOptions/ProfileOptions'
import MyProfile from './myProfile/MyProfile'
import BusinessAccount from './businessAccountPage/BusinessAccount'
import ManagePost from './managePosts/ManagePost'
import ChatsPage from './chatsPage/ChatsPage'

const AccountPage = () => {
    const [selectedTab,setSelectedTab]=useState(1)
  return (
   <>
   <div className='flex w-[100%] md:flex-row flex-col gap-y-6 px-body xl:gap-x-14 gap-x-7 sm:mt-14 mt-7 sm:mb-20 mb-10 relative z-10'>
    <ProfileOptions setSelectedTab={setSelectedTab} selectedTab={selectedTab}/>
    {/* <div className="  "> */}
        
            {
                selectedTab===1&&<MyProfile/>
              }
          {
                selectedTab===2&&<BusinessAccount/>
              }
                 {
                selectedTab===3&&<ManagePost/>
              }
                {
                selectedTab===6&&<ChatsPage/>
              }
       
        {/* </div> */}
   </div>
   </>
  )
}

export default AccountPage