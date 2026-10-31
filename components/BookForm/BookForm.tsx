"use client";

import css from "./BookForm.module.css";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UserData } from "@/types/user";
import { BookCampervanData } from "@/lib/api/api";
import { useId, useActionState, useEffect, useRef } from "react";
import { bookCampervan } from "@/lib/api/api";
import * as Yup from "yup";

const BookFormSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[^0-9]*$/)
    .required(),
  email: Yup.string().email().required(),
});

interface BookFormProps {
  camperId: string;
}

interface FormState {
  success: boolean;
  errors: Record<string, string>;
  values: { name: string; email: string };
}

const initialState: FormState = {
  success: false,
  errors: {},
  values: { name: "", email: "" },
};

export default function BookForm({ camperId }: BookFormProps) {
  const fieldId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const postBookingMutation = useMutation({
    mutationFn: bookCampervan,
    onSuccess: async () => {},
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async (
    prevState: FormState,
    formData: FormData,
  ): Promise<FormState> => {
    const submitted = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
    };
    try {
      await BookFormSchema.validate(submitted, { abortEarly: false });

      const bookCampervanData: BookCampervanData = {
        camperId: camperId,
        userData: submitted as UserData,
      };
      const response = await postBookingMutation.mutateAsync(bookCampervanData);
      if (response !== null && response !== undefined) {
        const message = String(response.message);
        toast.success(message, { duration: 8000 });
      }

      return { success: true, errors: {}, values: { name: "", email: "" } };
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const formattedErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) formattedErrors[err.path] = err.message;
        });

        return { success: false, errors: formattedErrors, values: submitted };
      }
    }

    return {
      success: false,
      errors: { global: "Fatal error" },
      values: submitted,
    };
  };

  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    handleSubmit,
    initialState,
  );

  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className={css["book-form"]}>
      <div className={css["book-form-field"]}>
        {state.errors?.name && <label htmlFor={`${fieldId}-name`}>Name*</label>}
        <input
          id={`${fieldId}-name`}
          type="text"
          name="name"
          required
          placeholder="Name*"
          defaultValue={state.values.name}
          aria-label="book name input"
          className={css["book-form-input"]}
        />
        <p className={css["book-form-error-text"]}>Please enter your name.</p>
      </div>

      <div className={css["book-form-field"]}>
        {state.errors?.email && (
          <label htmlFor={`${fieldId}-email`}>Email*</label>
        )}
        <input
          id={`${fieldId}-email`}
          type="email"
          name="email"
          required
          placeholder="Email*"
          defaultValue={state.values.email}
          aria-label="book email input"
          className={css["book-form-input"]}
        />
        <p className={css["book-form-error-text"]}>Please enter your email.</p>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={css["book-form-button"]}
      >
        Send
      </button>
    </form>
  );
}
