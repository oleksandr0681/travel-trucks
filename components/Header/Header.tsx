import css from "./Header.module.css";
import Link from "next/link";

interface HeaderProps {
  isHomePage?: boolean;
}

export default function Header({ isHomePage }: HeaderProps) {
  return (
    <header className={css.header}>
      <div className={`container`}>
        <div className={`${css["menu-wrapper"]}`}>
          <Link href="/" className={`${css["logo-link"]}`}>
            <svg width="136" height="16">
              <use href="/logo.svg"></use>
            </svg>
          </Link>
          <nav aria-label="Main Navigation">
            {isHomePage === true ? (
              <ul className={css.menu}>
                <li>
                  <Link
                    href="/"
                    className={`${css["menu-item-link"]} ${css["menu-item-link-current"]}`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/catalog" className={`${css["menu-item-link"]}`}>
                    Catalog
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className={css.menu}>
                <li>
                  <Link href="/" className={`${css["menu-item-link"]}`}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/catalog"
                    className={`${css["menu-item-link"]} ${css["menu-item-link-current"]}`}
                  >
                    Catalog
                  </Link>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
