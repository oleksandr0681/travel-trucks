import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { connection } from "next/server";
import { fetchCampers } from "@/lib/api/api";
import CatalogClient from "./Catalog.client";

interface CatalogProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function Content({ searchParams }: CatalogProps) {
  await connection();

  const queryClient = new QueryClient();
  const searchParameters = await searchParams;
  const form = (searchParameters.form as string) || undefined;
  const transmission = (searchParameters.transmission as string) || undefined;
  const engine = (searchParameters.engine as string) || undefined;

  await queryClient.prefetchQuery({
    queryKey: ["campers", form, transmission, engine],
    queryFn: () => fetchCampers({}),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CatalogClient />
      </HydrationBoundary>
    </>
  );
}

export default function Catalog({ searchParams }: CatalogProps) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Content searchParams={searchParams} />
    </Suspense>
  );
}
