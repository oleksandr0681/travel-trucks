"use client";

import {
  useInfiniteQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import { fetchCampers } from "@/lib/api/api";
import { useSearchParams } from "next/navigation";
import CamperList from "@/components/CamperList/CamperList";
import Loader from "@/components/Loader/Loader";
import NotFound from "@/components/NotFound/NotFound";
import css from "./CatalogClient.module.css";

export default function CatalogClient() {
  const params = useSearchParams();
  const searchParameters = new URLSearchParams(params.toString());
  const form = searchParameters.get("form") || undefined;
  const transmission = searchParameters.get("transmission") || undefined;
  const engine = searchParameters.get("engine") || undefined;
  const location = searchParameters.get("location") || undefined;

  const {
    data: campersData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["campers", form, transmission, engine, location],
    queryFn: ({ pageParam }) => {
      return fetchCampers({ page: pageParam, perPage: 4, form, transmission, engine, location });
    },
    initialPageParam: 1,
    initialData: { pages: [], pageParams: [] },
    getNextPageParam: (lastPage) =>
      lastPage.totalPages >= lastPage.page + 1 ? lastPage.page + 1 : undefined,
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  if (isError || campersData === undefined) {
    return <p>{error?.message}</p>;
  }

  const campers = campersData.pages.flatMap((page) => page.campers);

  return campers && campers.length > 0 ? (
    <div className={css["camper-list-wrapper"]}>
      {isLoading && <Loader />}
      <CamperList campers={campers} />
      {hasNextPage && (
        <button
          disabled={isLoading || isFetching}
          onClick={() => {
            fetchNextPage();
          }}
          className={css["load-more-button"]}
        >
          Load more
        </button>
      )}
    </div>
  ) : (
    <NotFound />
  );
}
