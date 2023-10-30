import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import Cookies from "js-cookie";
import * as jose from "jose";

export function Navbar() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    try {
      const token = Cookies.get("hanko");

      const payload = jose.decodeJwt(token ?? "");
      const userID = payload.sub;

      if (!userID || token === undefined) {
        throw new Error("Invalid token");
      }

      setIsLogged(true);
    } catch (error) {
      setIsLogged(false);
    }
  }, []);

  return (
    <nav className="flex px-8 py-4 justify-between w-full items-center border-border border-b-2 mb-4">
      <Link
        to="/"
        className="bg-clip-text text-transparent font-bold text-2xl bg-gradient-to-r from-[#5350F6] to-[#E662FE]"
      >
        Docus
      </Link>
      <ul className="flex gap-8 items-center">
        <ModeToggle />
        <li className="text-lg font-semibold">
          <Link to="/apps">Apps</Link>
        </li>
        <li className="text-lg font-semibold">
          <Link
            to={isLogged ? "/me" : "/auth"}
            className="bg-primary text-primary-foreground px-4 py-1 rounded-lg"
          >
            {isLogged ? "Profile" : "Login"}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
