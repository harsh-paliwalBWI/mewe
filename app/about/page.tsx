import MainAbout from '@/components/aboutPage/MainAbout'
import React from 'react'
import getQueryClient from "../../utils/getQueryClient";
import { cookies } from "next/dist/client/components/headers";
import { dehydrate } from "@tanstack/react-query"
import Hydrate from "../../utils/hydrate.client"
import { fetchAcceptedFollowRequests, fetchAcceptedFollowings, fetchBusinessAccountDetails, fetchPendingFollowRequests, fetchPendingFollowings, getStartUpData, isBusinessAccountExistOrNot } from '@/services/startupService';

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
await queryClient.prefetchQuery(["pendingRequestsData"], () =>
fetchPendingFollowRequests(cookie)
);
await queryClient.prefetchQuery(["acceptedRequestsData"], () =>
fetchAcceptedFollowRequests(cookie)
);
await queryClient.prefetchQuery(["pendingfollowingsData"], () =>
fetchPendingFollowings(cookie)
);
await queryClient.prefetchQuery(["AcceptedfollowingsData"], () =>
fetchAcceptedFollowings(cookie)
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