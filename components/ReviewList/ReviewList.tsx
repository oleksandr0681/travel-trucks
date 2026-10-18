"use client";

import { Review } from "@/types/review";
import css from "./ReviewList.module.css";

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  return (
    <ul className={css.list}>
      {reviews.map((review) => (
        <li key={review.id} className={css["review-card"]}>
          <p>{review.reviewer_name}</p>
          <p className={css.comment}>{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}
