import { useContext, useEffect, useMemo } from "react";
// @ts-ignore
import { register } from "@teamhanko/hanko-elements";
import { Navbar } from "@/components/navbar";
import { hankoApi, hankoInstance } from "@/lib/hanko";
import { UserIdContext, UserIdContextProps } from "@/contexts/user.context";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function ProfilePage() {
  const hanko = useMemo(() => hankoInstance, []);

  const { userId, setUserId }: UserIdContextProps = useContext(UserIdContext);
  const router = useNavigate();

  if (!userId) {
    router("/auth");
  }

  const handleHankoLogout = async () => {
    setUserId("");
    await hanko.user.logout();
    router("/auth");
  };

  useEffect(() => {
    register(hankoApi).catch((error) => {
      // handle error
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="flex-1 flex flex-col justify-center items-center">
        <div>
          <hanko-profile />
          <section className="w-full flex flex-row justify-center gap-2 items-center">
            <Button className="flex flex-1 bg-primary">
              <Link to="/me/history">History</Link>
            </Button>
            <Button className="flex flex-1 bg-primary">My prompts</Button>
            <Button
              className="flex flex-1 bg-red-500 hover:bg-red-600"
              onClick={handleHankoLogout}
            >
              Logout
            </Button>
          </section>
        </div>
      </section>
    </div>
  );
}
