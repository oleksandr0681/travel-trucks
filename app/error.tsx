"use client";

import Header from "@/components/Header/Header";

type ErrorProps = {
  error: Error;
};

function Error({ error }: ErrorProps) {
  return (
    <>
      <Header />
      <main>
        <section>
          <h2>Error</h2>
          <p>{error.message}</p>
        </section>
      </main>
    </>
  );
}

export default Error;
