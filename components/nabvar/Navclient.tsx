import { getStartUpData } from "@/services/startupService";
import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/react-query";
import { cookies } from "next/dist/client/components/headers";
import Navbar from "./Navbar";

const NavbarClient = async () => {
  const cookie = cookies().get("uid");
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(["startUpData"], () =>
    getStartUpData(cookie)
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Navbar cookie={cookie} />
    </Hydrate>
  );
};
export default NavbarClient;
