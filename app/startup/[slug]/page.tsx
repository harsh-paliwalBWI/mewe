import React from 'react'
import MainAbout from '@/components/aboutPage/MainAbout';
import { fetchSingleStartup } from '@/services/startupService';
import getQueryClient from '@/utils/getQueryClient';
import { dehydrate } from "@tanstack/react-query";
import Hydrate from "../../../utils/hydrate.client"


const AboutPageInfo =async ({ params }:any) => {
    console.log(params,"----------");
    const queryClient: any = getQueryClient();await queryClient.prefetchQuery({
      queryKey: ["startup", params?.slug],
      queryFn: () => fetchSingleStartup(params?.slug),
      cacheTime: 60 * 60 * 3,
    });
  
    const dehydratedState = dehydrate(queryClient);
    
  return (
    <Hydrate state={dehydratedState}>
    <MainAbout params={params}/>

    </Hydrate>
  )
}

export default AboutPageInfo