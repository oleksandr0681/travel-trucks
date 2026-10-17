"use client";

import { Camper } from "@/types/camper";
import Image from "next/image";
import { FaEuroSign } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { BsFuelPump } from "react-icons/bs";
import { TbManualGearbox } from "react-icons/tb";
import { FaCarAlt } from "react-icons/fa";
import css from "./CamperList.module.css";

interface CamperListProps {
  campers: Camper[];
}

export default function CamperList({ campers }: CamperListProps) {
  const handleClick = (index: number) => {
    window.open(
      `/catalog/${campers[index].id}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <ul className={css.list}>
      {campers.map((camper, index) => (
        <li key={camper.id} className={css["camper-card"]}>
          <Image
            src={camper.coverImage}
            alt={camper.name}
            loading="eager"
            width={219}
            height={240}
            className={css.locationCardImage}
          />

          <div className={css.info}>
            <div className={css["text-container"]}>
              <div className={css.title}>
                <h2 className={css.name}>{camper.name}</h2>
                <p className={css.price}><FaEuroSign />{camper.price}</p>
              </div>
              <div className={css.details}>
                <div className={css.reviews}>
                  <p><FaStar className={css.star} /> {camper.rating} ({camper.totalReviews} Reviews)</p>
                </div>
                <div className={css.location}>
                  <p>{camper.location}</p>
                </div>
              </div>
            </div>

            <p className={css["supporting-text"]}>{camper.description}</p>

            <div className={css["badges-container"]}>
              <p><BsFuelPump /> {camper.engine}</p>
              <p><TbManualGearbox /> {camper.transmission}</p>
              <p><FaCarAlt /> {camper.form}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                handleClick(index);
              }}
              aria-label={`Show more about ${camper.name}`}
              className={css.button}
            >
              Show more
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
