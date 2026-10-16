"use client";

import css from "./FiltersBar.module.css";
import { useId } from 'react';

export default function FiltersBarClient() {
    const fieldId = useId();

  return (
    <form className={css.form}>
      <h2>Filters Bar</h2>
      <label className={css.label}>Location</label>
      <div className={css["form-group"]}>
        <label htmlFor={`${fieldId}-location`}>Title</label>
        <input
          id={`${fieldId}-location`}
          type="text"
          name="location"
          className={css.input}
        />
        {/* {filterError !== null && filterError.path === 'location' && (
          <p className={css.error}>{filterError.message}</p>
        )} */}
      </div>

    </form>
  );
}
