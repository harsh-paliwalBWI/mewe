
import React from 'react'
import AccountPage from '@/components/accountPage/AccountPage'
import getQueryClient from '@/utils/getQueryClient';
import { getStartUpData } from '@/services/startupService';
import { dehydrate } from "@tanstack/react-query"
import Hydrate from "../../utils/hydrate.client"
import { cookies } from "next/dist/client/components/headers";


const ProfilePage= async() => {
  const cookie = cookies().get("uid");
  const queryClient = getQueryClient();
  // await queryClient.prefetchQuery({ queryKey: ["startUpData"], queryFn: getStartUpData });
  const dehydratedState = dehydrate(queryClient);
  return (
   <>
   {/* <Hydrate state={dehydratedState}> */}
   <AccountPage cookie={cookie}/>
   {/* </Hydrate> */}
   </>
  )
}

export default ProfilePage