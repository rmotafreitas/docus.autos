import { useEffect } from "react";
// @ts-ignore
import { register } from "@teamhanko/hanko-elements";

const hankoApi = import.meta.env.VITE_HANKO_API_URL;

export function ProfilePage() {
  useEffect(() => {
    register(hankoApi).catch((error) => {
      // handle error
    });
  }, []);

  return (
    <div>
      <hanko-profile />
    </div>
  );
}
