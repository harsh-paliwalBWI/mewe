
import React from 'react'
import AccountPage from '@/components/accountPage/AccountPage'
import getQueryClient from '@/utils/getQueryClient';
import { fetchBusinessAccountDetails, getStartUpData, isBusinessAccountExistOrNot } from '@/services/startupService';
import { dehydrate } from "@tanstack/react-query"
import Hydrate from "../../utils/hydrate.client"
import { cookies } from "next/dist/client/components/headers";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify"


const ProfilePage= async() => {
  const cookie = cookies().get("uid");
  const queryClient = getQueryClient();
 


  await queryClient.prefetchQuery(["startUpData"], () =>
    getStartUpData(cookie)
  );
  await queryClient.prefetchQuery(["businessAccountData"], () =>
  fetchBusinessAccountDetails(cookie)
);
await queryClient.prefetchQuery(["businessAccountExistOrNot"], () =>
isBusinessAccountExistOrNot(cookie)
);
  const dehydratedState = dehydrate(queryClient);
  // console.log(cookie,"cookie from account page");
  
  return (
   <>
   <Hydrate state={dehydratedState}>
   <AccountPage />
   </Hydrate>
   </>
  )
}

export default ProfilePage