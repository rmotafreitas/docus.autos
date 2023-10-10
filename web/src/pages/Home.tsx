import { Navbar } from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import {
  FileVideo,
  Globe,
  LucideFileAudio2,
  LucideFileText,
} from "lucide-react";

export function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 w-full h-full">
      <Navbar />
      <section className="flex flex-col justify-center items-center gap-6">
        <h1 className="bg-clip-text text-transparent font-bold text-7xl bg-gradient-to-r from-[#5350F6] to-[#E662FE] mt-20 text-center">
          AI Documents Tool
        </h1>
        <p className="text-5xl text-center max-w-7xl leading-relaxed">
          An AI-powered tool that has a ton of features that helps you with your
          documents
        </p>
        <p className="text-2xl font-semibold text-[#FF3BFF]">
          Automate your docus
        </p>
      </section>
      <section className="flex flex-col justify-center items-center gap-6 mt-10 mb-20">
        <h2 className="bg-clip-text text-transparent font-bold text-5xl bg-gradient-to-r from-[#5350F6] to-[#E662FE] mt-20 text-center">
          Hack your productivity
        </h2>
        <h3 className="text-3xl text-center max-w-7xl">
          revolutionize your documents functionality with AI integration
        </h3>
      </section>
      <section className="flex flex-row justify-evenly w-5/6 items-center gap-6 mb-16">
        <div className="max-w-xl flex flex-col gap-2">
          <h4 className="text-4xl font-semibold">
            Lorem ipsum, dolor sit amet
          </h4>
          <p className="text-lg leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
            nobis nostrum libero eaque fuga modi amet exercitationem
            reprehenderit aut commodi repudiandae ipsum quibusdam minus labore
            quae ipsam accusamus illo facere?
          </p>
        </div>
        <aside className="flex flex-col max-w-3xl bg-muted p-4 gap-4 rounded-lg">
          <section className="flex flex-row gap-2">
            <FileVideo className="w-14 h-14 stroke-primary" />
            <aside>
              <h5 className="text-lg font-semibold">Video Files</h5>
              <p>
                Create a summary, title, and description for your video files
              </p>
            </aside>
          </section>
          <Separator className="w-full bg-muted-foreground" />
          <section className="flex flex-row gap-2">
            <Globe className="w-14 h-14 stroke-primary" />
            <aside>
              <h5 className="text-lg font-semibold">Internet Access</h5>
              <p>Generate a summary for any website</p>
            </aside>
          </section>
        </aside>
      </section>
      <section className="flex flex-row-reverse justify-evenly w-5/6 items-center gap-6 mb-10">
        <div className="max-w-xl flex flex-col gap-2">
          <h4 className="text-4xl font-semibold">
            Lorem ipsum, dolor sit amet
          </h4>
          <p className="text-lg leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
            nobis nostrum libero eaque fuga modi amet exercitationem
            reprehenderit aut commodi repudiandae ipsum quibusdam minus labore
            quae ipsam accusamus illo facere?
          </p>
        </div>
        <aside className="flex flex-col max-w-3xl bg-muted p-4 gap-4 rounded-lg">
          <section className="flex flex-row gap-2">
            <LucideFileText className="w-14 h-14 stroke-primary" />
            <aside>
              <h5 className="text-lg font-semibold">PDF Documents file</h5>
              <p>Create glossary, summary and appoints grammar mistakes</p>
            </aside>
          </section>
          <Separator className="w-full bg-muted-foreground" />
          <section className="flex flex-row gap-2">
            <LucideFileAudio2 className="w-14 h-14 stroke-primary" />
            <aside>
              <h5 className="text-lg font-semibold">Audio Files</h5>
              <p>Generate a transcript, bullet points for your audio files</p>
            </aside>
          </section>
        </aside>
      </section>
    </div>
  );
}
