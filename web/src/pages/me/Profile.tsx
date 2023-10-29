import { useContext, useMemo } from "react";
// @ts-ignore
import { register } from "@teamhanko/hanko-elements";
import { Navbar } from "@/components/navbar";
import { hankoInstance } from "@/lib/hanko";
import { UserIdContext, UserIdContextProps } from "@/contexts/user.context";
import { useNavigate } from "react-router-dom";
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
        <Button onClick={handleHankoLogout}>Logout</Button>
      </section>
    </div>
  );
}
