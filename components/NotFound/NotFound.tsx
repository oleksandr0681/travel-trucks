import css from "./NotFound.module.css";
import Image from "next/image";
import { MdOutlineClose } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/catalog");
  };

  return (
    <div className={css.card}>
      <Image
        src="/not-found-image.png"
        alt="Not found"
        loading="eager"
        width={488}
        height={463}
        className={css.locationCardImage}
      />
      <h2 className={css.title}>No campers found</h2>
      <p className={css.text}>
        We couldn`t find any campers that match your filters. <br />
        Try adjusting your search or clearing some filters.
      </p>
      <div className={css.buttons}>
        <button type="button" onClick={handleClick} className={css["clear-button"]}>
          <MdOutlineClose className={css["clear-symbol"]} /> Clear filters
        </button>
        <button type="button" onClick={handleClick} className={css["view-button"]}>View all campers</button>
      </div>
    </div>
  );
}
