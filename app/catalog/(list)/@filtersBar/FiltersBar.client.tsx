"use client";

import { MdOutlineClose } from "react-icons/md";
import css from "./FiltersBar.module.css";
import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { CiMap } from "react-icons/ci";
import toast from "react-hot-toast";

const FiltersFormSchema = Yup.object().shape({
  location: Yup.string(),
  form: Yup.string(),
  engine: Yup.string(),
  transmission: Yup.string(),
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
  const [filtersData, setFiltersData] = useState<FiltersData | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleClear = () => {
    setFiltersError(null);
    setFiltersData({ location: "", form: "", engine: "", transmission: "" });
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
      setFiltersData(values);
      const jsonFiltersData = JSON.stringify(values);
      window.localStorage.setItem("filters", jsonFiltersData);

      const location = String(formData.get("location") ?? "");
      const form = String(formData.get("form") ?? "");
      const transmission = String(formData.get("transmission") ?? "");
      const engine = String(formData.get("engine") ?? "");
      const route = `/catalog?location=${location}&form=${form}&transmission=${transmission}&engine=${engine}`;
      router.push(route);
    }
  };

  useEffect(() => {
    function load() {
      const filters = window.localStorage.getItem("filters");
      if (filters !== null && formRef.current !== null) {
        try {
          const parsedFilters = JSON.parse(filters) as unknown as FiltersData;
          const location = formRef.current?.elements.namedItem("location");
          if (
            location instanceof HTMLInputElement &&
            parsedFilters.location !== undefined
          ) {
            location.value = parsedFilters.location;
          }
          const formList = formRef.current.elements.namedItem("form");
          if (
            formList instanceof RadioNodeList &&
            parsedFilters.form !== undefined
          ) {
            formList.value = parsedFilters.form;
          }
          const engineList = formRef.current.elements.namedItem("engine");
          if (
            engineList instanceof RadioNodeList &&
            parsedFilters.engine !== undefined
          ) {
            engineList.value = parsedFilters.engine;
          }
          const transmissionList =
            formRef.current.elements.namedItem("transmission");
          if (
            transmissionList instanceof RadioNodeList &&
            parsedFilters.transmission !== undefined
          ) {
            transmissionList.value = parsedFilters.transmission;
          }
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "Something went wrong");
        }
      }
    }

    load();
    window.addEventListener("filters-changed", load);
    return () => window.removeEventListener("filters-changed", load);
  }, []);

  return (
    <form
      action={handleSubmit}
      key={filtersData ? JSON.stringify(filtersData) : "empty"}
      ref={formRef}
      className={css.form}
    >
      <div className={css["form-group"]}>
        <label htmlFor={`${fieldId}-location`}>Location</label>
        <span className={css["input-wrapper"]}>
          <input
            id={`${fieldId}-location`}
            type="text"
            name="location"
            placeholder="City"
            defaultValue={filtersData?.location}
            className={`${css.input} ${css["location-input"]}`}
          />
          <CiMap className={css.map} />
        </span>
      </div>

      <h2 className={css["form-title"]}>Filters</h2>
      <p className={css["form-text"]}>Camper form</p>
      <div className={css["form-group"]}>
        <label className={css.label}>
          <input
            type="radio"
            name="form"
            value="alcove"
            defaultChecked={filtersData?.form === "alcove"}
            className={css.radio}
          />
          Alcove
        </label>
        <label className={css.label}>
          <input
            type="radio"
            name="form"
            value="panel_van"
            defaultChecked={filtersData?.form === "panel_van"}
            className={css.radio}
          />
          Panel Van
        </label>
        <label className={css.label}>
          <input
            type="radio"
            name="form"
            value="integrated"
            defaultChecked={filtersData?.form === "integrated"}
            className={css.radio}
          />
          Integrated
        </label>
        <label className={css.label}>
          <input
            type="radio"
            name="form"
            value="semi_integrated"
            defaultChecked={filtersData?.form === "semi_integrated"}
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
            defaultChecked={filtersData?.engine === "diesel"}
            className={css.radio}
          />
          Diesel
        </label>
        <label className={css.label}>
          <input
            type="radio"
            name="engine"
            value="petrol"
            defaultChecked={filtersData?.engine === "petrol"}
            className={css.radio}
          />
          Petrol
        </label>
        <label className={css.label}>
          <input
            type="radio"
            name="engine"
            value="hybrid"
            defaultChecked={filtersData?.engine === "hybrid"}
            className={css.radio}
          />
          Hybrid
        </label>
        <label className={css.label}>
          <input
            type="radio"
            name="engine"
            value="electric"
            defaultChecked={filtersData?.engine === "electric"}
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
            defaultChecked={filtersData?.transmission === "automatic"}
            className={css.radio}
          />
          Automatic
        </label>
        <label className={css.label}>
          <input
            type="radio"
            name="transmission"
            value="manual"
            defaultChecked={filtersData?.transmission === "manual"}
            className={css.radio}
          />
          Manual
        </label>
        {filtersError !== null && filtersError.path === "transmission" && (
          <p className={css.error}>{filtersError.message}</p>
        )}
      </div>
      <div className={css.buttons}>
        <button type="submit" className={css["search-button"]}>
          Search
        </button>
        <button
          type="reset"
          onClick={handleClear}
          className={css["clear-button"]}
        >
          <MdOutlineClose className={css["clear-symbol"]} /> Clear filters
        </button>
      </div>
    </form>
  );
}
