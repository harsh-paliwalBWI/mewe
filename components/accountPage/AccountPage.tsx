"use client"
import React, { useState, useEffect, FC } from 'react'
import ProfileOptions from './profileOptions/ProfileOptions'
import MyProfile from './myProfile/MyProfile'
import BusinessAccount from './businessAccountPage/BusinessAccount'
import ManagePost from './managePosts/ManagePost'
import ChatsPage from './chatsPage/ChatsPage'
import ProfileOptionsMobile from '../profileMobile/ProfileOptionsMobile'
import { useRouter, useSearchParams } from 'next/navigation'
import NewPost from './businessAccountPage/newPost/NewPost'
import { useQuery } from '@tanstack/react-query'
import { getStartUpData, isBusinessAccountExistOrNot } from '@/services/startupService'
import { toast } from 'react-toastify'

import { getCookie } from "cookies-next";
import SavedStartups from './savedStartups/SavedStartups'

// interface Props {
//   cookie: any
// }
const AccountPage = () => {

const cookies = { value: getCookie("uid") };
// console.log(cookies,"from account page bmbm");
// console.log(cookies?.value,"value");
const router = useRouter();


// if (!cookies?.value) {
//   toast.error("Please Login First")
//   router.push('/welcome');
//   return null; 
// }

  const params = useSearchParams()
  const currTab = params.get("tab")
  const [selectedTab, setSelectedTab] = useState(0)
  const [toastShown, setToastShown] = useState(false);
  // console.log("hiii");
  // console.log(currTab,"------------");

  const { data: startUpData } = useQuery({
    queryKey: ["startUpData"],
    queryFn: () => getStartUpData(cookies),
  });
  // console.log("startUpData", startUpData);

  

  return (
    <>
      <div className='flex w-[100%] md:flex-row flex-col gap-y-6 px-body xl:gap-x-14 gap-x-7 md:mt-14 mt-7 md:mb-20 mb-10 relative z-10'>
        <ProfileOptions  setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
        <ProfileOptionsMobile />
        {currTab === "my-profile" && <MyProfile />}
        {currTab === "business-account" && <BusinessAccount />}
        {currTab === "manage-posts" && <ManagePost />}
        {currTab === "chat" && <ChatsPage />}
        {currTab === "new-post" && <NewPost />}
        {currTab === "saved-startups" && <SavedStartups />}
      </div>
    </>
  );
};

export default AccountPage;
