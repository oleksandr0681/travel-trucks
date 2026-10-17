import Header from "@/components/Header/Header";
import css from "./LayoutCatalog.module.css";

interface CatalogLayoutProps {
  filtersBar: React.ReactNode;
  children: React.ReactNode;
}

export default function CatalogLayout({
  filtersBar,
  children,
}: CatalogLayoutProps) {
  return (
    <>
      <Header />
      <main>
        <section>
          <div className={`container ${css["layout-container"]}`}>
            <div aria-label="filters bar">{filtersBar}</div>
            <div aria-label="campers">{children}</div>
          </div>
        </section>
      </main>
    </>
  );
}
