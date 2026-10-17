"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCampers } from "@/lib/api/api";
import { useSearchParams } from "next/navigation";

export default function CatalogClient() {
    const params = useSearchParams();
    const searchParameters = new URLSearchParams(params.toString());
    const form = searchParameters.get("form") || undefined;
    const transmission = searchParameters.get("transmission") || undefined;
    const engine = searchParameters.get("engine") || undefined;
    const location = searchParameters.get("location") || undefined;

  const {
    data: campersData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["campers", form, transmission, engine, location],
    queryFn: () => {
      return fetchCampers({form, transmission, engine, location});
    },
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (isError || campersData === undefined) {
    return <p>Something went wrong.</p>;
  }

  
  return (
    <div><p>{campersData.total}</p></div>
  );
}
