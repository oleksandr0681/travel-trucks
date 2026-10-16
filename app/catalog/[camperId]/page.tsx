import { Suspense } from "react";
import { connection } from "next/server";

export const metadata = { title: "Camper details" };

async function DynamicMarker() {
  await connection();
  return null;
}

export default function Details() {
  return (
    <>
      <Suspense fallback={null}>
        <DynamicMarker />
      </Suspense>
      <main>
        <section>
          <div className="container">
            <h1>Details</h1>
          </div>
        </section>
      </main>
    </>
  );
}
