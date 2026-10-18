"use client";

import { Review } from "@/types/review";
import css from "./ReviewList.module.css";
import Stars from "../Stars/Stars";

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  return (
    <ul className={css.list}>
      {reviews.map((review) => (
        <li key={review.id} className={css["review-card"]}>
          <div className={css.person}>
            <div className={css.image}>
              <p>{review.reviewer_name[0].toUpperCase()}</p>
            </div>
            <div className={css.name}>
              <p>{review.reviewer_name}</p>
              <Stars value={review.reviewer_rating} />
            </div>
          </div>
          <p className={css.comment}>{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}
