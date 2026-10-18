"use client";

import css from "./BookForm.module.css";
import { useMutation } from "@tanstack/react-query";
import toast from 'react-hot-toast';
import { UserData } from "@/types/user";
import { BookCampervanData } from "@/lib/api/api";
import { useId } from "react";
import { bookCampervan } from "@/lib/api/api";

interface BookFormProps {
  camperId: string;
}

export default function BookForm({ camperId }: BookFormProps) {
  const fieldId = useId();

  const postBookingMutation = useMutation({
    mutationFn: bookCampervan,
    onSuccess: async () => {},
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as UserData;
    const bookCampervanData: BookCampervanData = {
      camperId: camperId,
      userData: values,
    };
    const response = await postBookingMutation.mutateAsync(bookCampervanData);
    if (response !== null && response !== undefined) {
        const message = String(response.message);
        toast.success(message, { duration: 8000 });
    }
  };

  return (
    <form action={handleSubmit} className={css["book-form"]}>
      <div className={css["book-form-field"]}>
        <input
          id={`${fieldId}-name`}
          type="text"
          name="name"
          required
          placeholder="Name*"
          aria-label="book name input"
          className={css["book-form-input"]}
        />
        <p className={css["book-form-error-text"]}>Please enter your name.</p>
      </div>

      <div className={css["book-form-field"]}>
        <input
          id={`${fieldId}-email`}
          type="email"
          name="email"
          required
          placeholder="Email*"
          aria-label="book email input"
          className={css["book-form-input"]}
        />
        <p className={css["book-form-error-text"]}>Please enter your email.</p>
      </div>

      <button type="submit" className={css["book-form-button"]}>
        Send
      </button>
    </form>
  );
}
