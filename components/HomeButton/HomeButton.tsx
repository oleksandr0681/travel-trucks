'use client';

import css from "./HomeButton.module.css";
import { useRouter } from "next/navigation";

export default function HomeButton() {
    const router = useRouter();

    const handleClick = () => {
        router.push("/catalog");
    }

    return (
        <button type="button" onClick={handleClick} className={css.button}>View Now</button>
    );
}
