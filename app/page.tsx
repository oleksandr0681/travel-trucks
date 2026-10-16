import HomeButton from "@/components/HomeButton/HomeButton";
import styles from "./page.module.css";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <>
      <Header isHomePage={true} />
      <main className={`${styles["hero-main"]}`}>
        <section className={`${styles["hero-section"]}`}>
          <div className={`container ${styles["hero-container"]}`}>
            <div className={`${styles["title-wrapper"]}`}>
              <h1 className={`${styles["page-title"]}`}>
                Campers of your dreams
              </h1>
              <p className={`${styles["hero-text"]}`}>
                You can find everything you want in our catalog
              </p>
              <HomeButton />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
