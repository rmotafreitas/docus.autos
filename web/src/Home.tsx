import { useCallback, useEffect, useMemo, useState } from "react";

export function App() {
  return (
    <div>
      <section className="flex flex-col justify-center items-center gap-6">
        <h1 className="bg-clip-text text-transparent font-bold text-7xl bg-gradient-to-r from-[#5350F6] to-[#E662FE] mt-20 text-center">
          AI Documents Tool
        </h1>
        <p className="text-5xl text-center max-w-7xl">
          An AI-powered tool that has a ton of features that helps you with your
          documents
        </p>
        <p className="text-2xl font-semibold text-[#FF3BFF]">
          Automate your docus
        </p>
      </section>
    </div>
  );
}
