import Header from "@/components/Header/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page not found - TravelTrucks",
  description: "Sorry, the page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section>
          <h1>404 - Page not found</h1>
          <p>Sorry, the page you are looking for does not exist.</p>
        </section>
      </main>
    </>
  );
}
