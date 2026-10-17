"use client";

import { ClipLoader } from "react-spinners";
import style from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={style.backdrop}>
        <div className={style.loader}>
            <ClipLoader color="#6d7b75" />
            <h2 className={style.title}>Loading tracks...</h2>
            <p className={style.text}>Please wait while we fetch the best travel trucks for you</p>
        </div>
    </div>
  );
}
