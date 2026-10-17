"use client";

import Header from "@/components/Header/Header";
import { fetchCamperById } from "@/lib/api/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import toast from "react-hot-toast";
import css from "./CamperDetails.module.css";
import Image from "next/image";
import { FaEuroSign } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

export default function CamperDetailsClient() {
  const { camperId } = useParams<{ camperId: string }>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["camper", camperId],
    queryFn: () => {
      return fetchCamperById(camperId);
    },
    refetchOnMount: false,
  });

  if (isError) {
    toast.error(error.message);
  }

  return (
    <>
      <Header />
      <main>
        <section className={css["camper-details-section"]}>
          {isLoading && <Loader />}
          {data !== null && data !== undefined && (
            <div className={`container`}>
              <div className={css.top}>
                <div className={css["image-and-thumbnails"]}>
                  <Image
                    src={data.gallery[0].original}
                    alt={data.name}
                    loading="eager"
                    width={638}
                    height={505}
                    className={css.image}
                  />
                  <div className={css.thumbnails}>
                    {data.gallery.map((thumbnail) => (
                      <Image
                        key={thumbnail.id}
                        src={thumbnail.thumb}
                        alt="Camper image"
                        loading="eager"
                        width={136}
                        height={144}
                        className={css.thumbnail}
                      />
                    ))}
                  </div>
                </div>

                <div className={css.info}>
                  <div className={css.header}>
                    <h1>{data?.name}</h1>
                    <div className={css["text-container"]}>
                      <div className={css.title}></div>
                      <div className={css.details}>
                        <div className={css.reviews}>
                          <p>
                            <FaStar className={css.star} /> {data.rating} (
                            {data.totalReviews} Reviews)
                          </p>
                        </div>
                        <div className={css.location}>
                          <p>{data.location}</p>
                        </div>
                      </div>
                      <p className={css.price}>
                        <FaEuroSign />
                        {data.price}
                      </p>
                      <p className={css.description}>{data.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
