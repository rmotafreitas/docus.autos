import { hankoInstance } from "@/lib/hanko";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  const [isLogged, setIsLogged] = useState(false);

  const hanko = useMemo(() => hankoInstance, []);

  useEffect(() => {
    (async () => {
      try {
        const user = await hanko.user.getCurrent();
        setIsLogged(true);
      } catch (e) {
        setIsLogged(false);
      }
    })();
  }, []);

  return (
    <nav className="flex px-8 py-4 justify-between w-full items-center border-border border-b-2">
      <Link
        to="/"
        className="bg-clip-text text-transparent font-bold text-2xl bg-gradient-to-r from-[#5350F6] to-[#E662FE]"
      >
        Docus
      </Link>
      <ul className="flex gap-8 items-center">
        <li className="text-lg font-semibold">
          <Link to="/apps">Apps</Link>
        </li>
        <li className="text-lg font-semibold">
          <Link
            to={isLogged ? "/me" : "/auth"}
            className="bg-[#4F4CE5] px-4 py-1 rounded-lg"
          >
            {isLogged ? "Profile" : "Login"}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
