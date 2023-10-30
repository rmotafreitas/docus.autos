import { useContext, useEffect, useMemo } from "react";
// @ts-ignore
import { register } from "@teamhanko/hanko-elements";
import { Navbar } from "@/components/navbar";
import { hankoApi, hankoInstance } from "@/lib/hanko";
import { UserIdContext, UserIdContextProps } from "@/contexts/user.context";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { EditIcon, History, LogOutIcon, UserIcon } from "lucide-react";

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
        <div className="flex flex-col gap-4 max-w-xl w-full p-8 border-border border-2 rounded-lg max-sm:border-0">
          <h1 className="font-black text-3xl justify-center items-center text-center flex flex-row gap-4">
            <p>My Profile</p>
            <UserIcon className="w-8 h-8" />
          </h1>
          <hanko-profile />
          <section className="w-full flex flex-row justify-center gap-2 items-center max-sm:flex-col">
            <Button className="flex flex-1 bg-primary max-sm:w-full">
              <Link to="/me/history" className="flex flex-row items-center">
                <History size={24} className="mr-2" />
                History
              </Link>
            </Button>
            <Button className="flex flex-1 bg-primary max-sm:w-full">
              <Link to="/me/history" className="flex flex-row items-center">
                <EditIcon size={24} className="mr-2" />
                Prompts
              </Link>
            </Button>
            <Button
              className="flex flex-1 bg-red-500 hover:bg-red-600 max-sm:w-full justify-center items-center"
              onClick={handleHankoLogout}
            >
              <LogOutIcon size={24} className="mr-2" />
              Logout
            </Button>
          </section>
        </div>
      </section>
    </div>
  );
}
