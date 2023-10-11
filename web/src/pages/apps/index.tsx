import { Navbar } from "@/components/navbar";
import { FileVideo } from "lucide-react";

export function AppsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="flex-1 flex flex-col justify-center items-center">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 justify-center">
          <div className="bg-muted rounded-lg p-4 flex flex-col gap-4 max-w-xs">
            <div className="flex justify-start items-center gap-4">
              <div className="flex justify-center items-center text-center bg-primary rounded-md p-2  bg-gradient-to-r from-[#5350F6] to-[#E662FE]">
                <FileVideo className="text-xl" />
              </div>
              <h1 className="font-semibold text-lg">Videos App</h1>
            </div>
            <ul className="flex flex-col gap-2">
              <li className="leading-relaxed">
                <p>
                  <span className="font-semibold"> &bull; </span>
                  Generate a cool title for your video
                </p>
              </li>
              <li className="leading-relaxed">
                <p>
                  <span className="font-semibold"> &bull; </span>
                  Generate an attractive description for your video
                </p>
              </li>
              <li className="leading-relaxed">
                <p>
                  <span className="font-semibold"> &bull; </span>
                  Generate a summary from a video
                </p>
              </li>
            </ul>
          </div>
          <div className="bg-muted rounded-lg p-4 flex flex-col gap-4 max-w-xs">
            <div className="flex justify-start items-center gap-4">
              <div className="flex justify-center items-center text-center bg-primary rounded-md p-2  bg-gradient-to-r from-[#5350F6] to-[#E662FE]">
                <FileVideo className="text-xl" />
              </div>
              <h1 className="font-semibold text-lg">Websites App</h1>
            </div>
            <ul className="flex flex-col gap-2">
              <li className="leading-relaxed">
                <p>
                  <span className="font-semibold"> &bull; </span>
                  Generate a cool title for your video
                </p>
              </li>
              <li className="leading-relaxed">
                <p>
                  <span className="font-semibold"> &bull; </span>
                  Generate an attractive description for your video
                </p>
              </li>
              <li className="leading-relaxed">
                <p>
                  <span className="font-semibold"> &bull; </span>
                  Generate a summary from a video
                </p>
              </li>
            </ul>
          </div>
          <div className="bg-muted rounded-lg p-4 flex flex-col gap-4 max-w-xs">
            <div className="flex justify-start items-center gap-4">
              <div className="flex justify-center items-center text-center bg-primary rounded-md p-2  bg-gradient-to-r from-[#5350F6] to-[#E662FE]">
                <FileVideo className="text-xl" />
              </div>
              <h1 className="font-semibold text-lg">Documents App</h1>
            </div>
            <ul className="flex flex-col gap-2">
              <li className="leading-relaxed">
                <p>
                  <span className="font-semibold"> &bull; </span>
                  Generate a cool title for your video
                </p>
              </li>
              <li className="leading-relaxed">
                <p>
                  <span className="font-semibold"> &bull; </span>
                  Generate an attractive description for your video
                </p>
              </li>
              <li className="leading-relaxed">
                <p>
                  <span className="font-semibold"> &bull; </span>
                  Generate a summary from a video
                </p>
              </li>
            </ul>
          </div>
          <div className="bg-muted rounded-lg p-4 flex flex-col gap-4 max-w-xs">
            <div className="flex justify-start items-center gap-4">
              <div className="flex justify-center items-center text-center bg-primary rounded-md p-2  bg-gradient-to-r from-[#5350F6] to-[#E662FE]">
                <FileVideo className="text-xl" />
              </div>
              <h1 className="font-semibold text-lg">Audios App</h1>
            </div>
            <ul className="flex flex-col gap-2">
              <li className="leading-relaxed">
                <p>
                  <span className="font-semibold"> &bull; </span>
                  Generate a cool title for your video
                </p>
              </li>
              <li className="leading-relaxed">
                <p>
                  <span className="font-semibold"> &bull; </span>
                  Generate an attractive description for your video
                </p>
              </li>
              <li className="leading-relaxed">
                <p>
                  <span className="font-semibold"> &bull; </span>
                  Generate a summary from a video
                </p>
              </li>
            </ul>
          </div>
        </section>
      </section>
    </div>
  );
}
