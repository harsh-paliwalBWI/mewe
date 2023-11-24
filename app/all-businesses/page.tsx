import AllBusinessPage from '@/components/allBusinessPage/AllBusinessPage'
import getQueryClient from '@/utils/getQueryClient';
import React from 'react'
import { dehydrate } from "@tanstack/react-query"
import Hydrate from "../../utils/hydrate.client"
import { fetchAllStartUps } from '@/services/homeService';

const viewAllBusinessPage = async() => {
    const queryClient = getQueryClient();
    const dehydratedState = dehydrate(queryClient);
    await queryClient.prefetchQuery({ queryKey: ["allStartUpsData"], queryFn: fetchAllStartUps});
  return (
<>
<Hydrate state={dehydratedState}>
<AllBusinessPage/>
</Hydrate>
</>
   
  )
}

export default viewAllBusinessPage