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
import { CiMap } from "react-icons/ci";

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
  console.log(data);

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
                    <div className={css["title-wrapper"]}>
                      <h1 className={css.title}>{data.name}</h1>
                    </div>
                    <div className={css.details}>
                      <div className={css.reviews}>
                        <p>
                          <FaStar className={css.star} /> {data.rating} (
                          {data.totalReviews} Reviews)
                        </p>
                      </div>
                      <div className={css.location}>
                        <p>
                          <CiMap className={css.map} /> {data.location}
                        </p>
                      </div>
                    </div>
                    <p className={css.price}>
                      <FaEuroSign />
                      {data.price}
                    </p>
                    <p className={css.description}>{data.description}</p>
                  </div>

                  <div className={css["details-wrapper"]}>
                    <div className={css["features-section"]}>
                      <p className={css["features-section-text"]}>
                        Vehicle details
                      </p>
                    </div>
                    <div className={css["badges-container"]}>
                      <p>{data.transmission}</p>
                      <p>{data.engine}</p>
                      <p>{data.form}</p>
                      {data.amenities.map((amenity) => (
                        <p key={amenity}>{amenity}</p>
                      ))}
                    </div>
                    <span className={css.line}></span>
                    <div className={css["details-info"]}>
                      <div className={css["details-info-row"]}>
                        <p>Form</p>
                        <p>{data.form}</p>
                      </div>
                      <div className={css["details-info-row"]}>
                        <p>Length</p>
                        <p>{data.length}</p>
                      </div>
                      <div className={css["details-info-row"]}>
                        <p>Width</p>
                        <p>{data.width}</p>
                      </div>
                      <div className={css["details-info-row"]}>
                        <p>Height</p>
                        <p>{data.height}</p>
                      </div>
                      <div className={css["details-info-row"]}>
                        <p>Tank</p>
                        <p>{data.tank}</p>
                      </div>
                      <div className={css["details-info-row"]}>
                        <p>Consumption</p>
                        <p>{data.consumption}</p>
                      </div>
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
