import React from 'react';
import HomeComponent from "../components/homepage/HomeComponent";
import getQueryClient from "../utils/getQueryClient";
import Hydrate from "../utils/hydrate.client"
import { fetchSchemes } from '@/services/schemesService';
import { dehydrate } from "@tanstack/react-query"
import { fetchBusinessAccountDetails, getStartUpData } from '@/services/startupService';
import { cookies } from "next/dist/client/components/headers";

export default async function Home() {
  const cookie = cookies().get("uid");
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({ queryKey: ["schemes"], queryFn: fetchSchemes });
// console.log(cookie,"cookie vcbch");

  await queryClient.prefetchQuery(["startUpData"], () =>
    getStartUpData(cookie)
  );
  await queryClient.prefetchQuery(["businessAccountData"], () =>
  fetchBusinessAccountDetails(cookie)
);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <HomeComponent cookie={cookie}/>
    </Hydrate>
  )
}
