import AllPostPage from '@/components/allPostPage/AllpostPage';
import getQueryClient from '@/utils/getQueryClient';
import React from 'react'
import { dehydrate } from "@tanstack/react-query"
import Hydrate from "../../utils/hydrate.client"
import { fetchAllPosts } from '@/services/postService';

const viewAllPosts = async() => {
    const queryClient = getQueryClient();
    const dehydratedState = dehydrate(queryClient);
    await queryClient.prefetchQuery({ queryKey: ["Posts"], queryFn: fetchAllPosts});
  return (
<>
<Hydrate state={dehydratedState}>
<AllPostPage/>
</Hydrate>
</>
   
  )
}

export default viewAllPosts