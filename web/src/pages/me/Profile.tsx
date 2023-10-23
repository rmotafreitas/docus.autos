import { useEffect } from "react";
// @ts-ignore
import { register } from "@teamhanko/hanko-elements";
import { Navbar } from "@/components/navbar";

const hankoApi = import.meta.env.VITE_HANKO_API_URL;

export function ProfilePage() {
  useEffect(() => {
    register(hankoApi).catch((error) => {
      // handle error
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="flex-1 flex flex-col justify-center items-center">
        <div
          className="w-fit h-fit bg-gradient-to-r from-[#5350F6] to-[#E662FE] backdrop-blur-lg   

        rounded-3xl shadow-lg py-10 px-10"
        >
          <hanko-profile />
        </div>
      </section>
    </div>
  );
}
