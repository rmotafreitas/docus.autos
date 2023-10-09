import { useCallback, useEffect, useMemo, useState } from "react";
// @ts-ignore
import { register, Hanko } from "@teamhanko/hanko-elements";
import { Navbar } from "./components/navbar";

const hankoApi = import.meta.env.VITE_HANKO_API_URL;

export function App() {
  const hanko = useMemo(() => new Hanko(hankoApi), []);

  useEffect(
    () =>
      hanko.onAuthFlowCompleted(() => {
        console.log("Auth flow completed");
      }),
    [hanko]
  );

  useEffect(() => {
    register(hankoApi).catch((error) => {
      // handle error
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="flex flex-1 flex-col justify-center gap-20 items-center">
        <h1 className="font-bold text-5xl text-center">Start working faster</h1>
        <hanko-auth />
      </section>
    </div>
  );
}
