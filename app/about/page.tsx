import MainAbout from '@/components/aboutPage/MainAbout'
import React from 'react'
import getQueryClient from "../../utils/getQueryClient";
import { cookies } from "next/dist/client/components/headers";
import { dehydrate } from "@tanstack/react-query"
import Hydrate from "../../utils/hydrate.client"
import { fetchBusinessAccountDetails, getStartUpData, isBusinessAccountExistOrNot } from '@/services/startupService';

const AboutPage = async() => {
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
   <MainAbout/>
   </Hydrate>
   </>
  )
}

export default AboutPage