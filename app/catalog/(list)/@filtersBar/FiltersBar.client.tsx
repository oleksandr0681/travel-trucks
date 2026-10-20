"use client";

import { MdOutlineClose } from "react-icons/md";
import css from "./FiltersBar.module.css";
import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const FiltersFormSchema = Yup.object().shape({
  location: Yup.string(),
  form: Yup.string().required("Select form"),
  engine: Yup.string().required("Select engine"),
  transmission: Yup.string().required("Select transmission"),
});

interface FiltersError {
  path?: string;
  message: string;
}

interface FiltersData {
  location?: string;
  form?: string;
  engine?: string;
  transmission?: string;
}

export default function FiltersBarClient() {
  const fieldId = useId();
  const router = useRouter();
  const [filtersError, setFiltersError] = useState<FiltersError | null>(null);

  const handleClear = () => {
    setFiltersError(null);
    router.push("/catalog");
  };

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as FiltersData;
    let isValid: boolean = true;
    setFiltersError(null);
    try {
      FiltersFormSchema.validateSync(values);
    } catch (error) {
      isValid = false;
      if (error instanceof Yup.ValidationError) {
        setFiltersError({ path: error.path, message: error.message });
      }
    }
    if (isValid === true) {
      if (formData.get("location") !== "" && formData.get("location") !== undefined) {
        router.push(`/catalog?form=${formData.get("form")}&transmission=${formData.get("transmission")}&engine=${formData.get("engine")}&location=${formData.get("location")}`);
      } else {
        router.push(`/catalog?form=${formData.get("form")}&transmission=${formData.get("transmission")}&engine=${formData.get("engine")}`);
      }
    }
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css["form-group"]}>
        <label htmlFor={`${fieldId}-location`}>Location</label>
        <input
          id={`${fieldId}-location`}
          type="text"
          name="location"
          placeholder="City"
          className={css.input}
        />
      </div>

      <h2 className={css["form-title"]}>Filters</h2>
      <p className={css["form-text"]}>Camper form</p>
      <div className={css["form-group"]}>
        <label className={css.label}>
          <input
            type="radio"
            name="form"
            value="alcove"
            className={css.radio}
          />
          Alcove
        </label>
        <label className={css.label}>
          <input
            type="radio"
            name="form"
            value="panel_van"
            className={css.radio}
          />
          Panel Van
        </label>
        <label className={css.label}>
          <input
            type="radio"
            name="form"
            value="integrated"
            className={css.radio}
          />
          Integrated
        </label>
        <label className={css.label}>
          <input
            type="radio"
            name="form"
            value="semi_integrated"
            className={css.radio}
          />
          Semi Integrated
        </label>
        {filtersError !== null && filtersError.path === "form" && (
          <p className={css.error}>{filtersError.message}</p>
        )}
      </div>

      <p className={css["form-text"]}>Engine</p>
      <div className={css["form-group"]}>
        <label className={css.label}>
          <input
            type="radio"
            name="engine"
            value="diesel"
            className={css.radio}
          />
          Diesel
        </label>
        <label className={css.label}>
          <input
            type="radio"
            name="engine"
            value="petrol"
            className={css.radio}
          />
          Petrol
        </label>
        <label className={css.label}>
          <input
            type="radio"
            name="engine"
            value="hybrid"
            className={css.radio}
          />
          Hybrid
        </label>
        <label className={css.label}>
          <input
            type="radio"
            name="engine"
            value="electric"
            className={css.radio}
          />
          Electric
        </label>
        {filtersError !== null && filtersError.path === "engine" && (
          <p className={css.error}>{filtersError.message}</p>
        )}
      </div>

      <p className={css["form-text"]}>Transmission</p>
      <div className={css["form-group"]}>
        <label className={css.label}>
          <input
            type="radio"
            name="transmission"
            value="automatic"
            className={css.radio}
          />
          Automatic
        </label>
        <label className={css.label}>
          <input
            type="radio"
            name="transmission"
            value="manual"
            className={css.radio}
          />
          Manual
        </label>
        {filtersError !== null && filtersError.path === "transmission" && (
          <p className={css.error}>{filtersError.message}</p>
        )}
      </div>
      <div className={css.buttons}>
        <button type="submit" className={css["search-button"]}>Search</button>
        <button type="reset" onClick={handleClear} className={css["clear-button"]}>
          <MdOutlineClose className={css["clear-symbol"]} /> Clear filters
        </button>
      </div>
    </form>
  );
}
