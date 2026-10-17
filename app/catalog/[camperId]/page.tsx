import { Suspense } from "react";
import { fetchCamperById } from "@/lib/api/api";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import CamperDetailsClient from "./CamperDetails.client";
import Loader from "@/components/Loader/Loader";
import { Metadata } from 'next';

interface CamperDetailsProps {
  params: Promise<{ camperId: string }>;
}

export async function generateMetadata({
  params,
}: CamperDetailsProps): Promise<Metadata> {
  const { camperId } = await params;
  const camper = await fetchCamperById(camperId);

  return {
    title: camper.name,
    description: `${camper.description.slice(0, 120)}...`,
    openGraph: {
      title: camper.name,
      description: `${camper.description.slice(0, 120)}...`,
      url: `https://travel-trucks-gray-nine.vercel.app/catalog/${camperId}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://travel-trucks-gray-nine.vercel.app/hero-image-1x.webp',
          width: 1200,
          height: 630,
          alt: `Camper: ${camper.name}`,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: camper.name,
      description: `${camper.description.slice(0, 120)}...`,
      images: ['https://travel-trucks-gray-nine.vercel.app/hero-image-1x.webp'],
    },
  };
}

async function CamperDetailsContent({ params }: CamperDetailsProps) {
  "use cache"

  const { camperId } = await params;

  const queryClient = new QueryClient();
  await queryClient.query({
    queryKey: ["camper", camperId],
    queryFn: () => {
      return fetchCamperById(camperId);
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CamperDetailsClient />
    </HydrationBoundary>
  );
}

export default function CamperDetails({ params }:CamperDetailsProps) {
  return (
    <Suspense fallback={<Loader />}>
      <CamperDetailsContent params={params} />
    </Suspense>
  );
}
