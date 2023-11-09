import React from 'react';
import HomeComponent from "../components/homepage/HomeComponent";
import getQueryClient from "../utils/getQueryClient";
import Hydrate from "../utils/hydrate.client"
import { dehydrate } from '@tanstack/react-query';

export default async function Home() {
  const queryClient = getQueryClient();
  const dehydratedState = dehydrate(queryClient);
  return (
  //  <Hydrate state={dehydratedState}>
    <HomeComponent />
  //  </Hydrate>
  )
}
