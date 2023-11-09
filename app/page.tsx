import React from 'react';
import HomeComponent from "../components/homepage/HomeComponent";
import getQueryClient from "../utils/getQueryClient";
import Hydrate from "../utils/hydrate.client"
import { fetchSchemes } from '@/services/schemesService';
import { dehydrate } from "@tanstack/react-query"


export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({ queryKey: ["schemes"], queryFn: fetchSchemes });
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <HomeComponent />
    </Hydrate>
  )
}
