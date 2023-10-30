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
          automate your docs
        </p>
      </section>
      <section className="flex flex-col justify-center items-center gap-6 mt-10 mb-20">
        <h2 className="bg-clip-text text-transparent font-bold text-5xl bg-gradient-to-r from-[#5350F6] to-[#E662FE] mt-20 text-center pb-2">
          Hack your productivity
        </h2>
        <h3 className="text-3xl text-center max-w-7xl">
          Revolutionize your documents functionality with AI integration
        </h3>
      </section>
      <section className="flex flex-row justify-evenly w-5/6 items-center gap-6 mb-16 max-md:flex-col max-md:items-center">
        <div className="max-w-xl flex flex-col gap-2">
          <h4 className="text-4xl font-semibold">
            Efficiency Unleashed: Embrace Cutting-Edge Tech
          </h4>
          <p className="text-lg leading-relaxed">
            Harness the full potential of our cutting-edge technology, allowing
            you to effortlessly streamline your workflow and unlock unparalleled
            efficiency. Our AI-powered solution is meticulously designed to
            optimize every aspect of your document management process, enabling
            you to focus on what truly matters. Say goodbye to tedious tasks and
            welcome a new era of seamless productivity.
          </p>
        </div>
        <aside className="flex flex-col max-w-3xl bg-muted p-4 gap-4 rounded-lg">
          <section className="flex flex-row gap-2">
            <FileVideo className="w-14 h-14 stroke-primary" />
            <aside>
              <h5 className="text-lg font-semibold">Video & Youtube Content</h5>
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
              <p>Generate a summary, FAQ, for any website</p>
            </aside>
          </section>
        </aside>
      </section>
      <section className="flex flex-row-reverse justify-evenly w-5/6 items-center gap-6 mb-10 max-md:flex-col max-md:items-center">
        <div className="max-w-xl flex flex-col gap-2">
          <h4 className="text-4xl font-semibold">
            Enhancing Document Dynamics: Streamlining Audio and PDFs
          </h4>
          <p className="text-lg leading-relaxed">
            Experience a seamless synergy of innovation as we revolutionize the
            management of your audio files and PDF documents. Our cutting-edge
            solution enhances accessibility and precision, empowering you to
            effortlessly navigate through the realms of sound and text. Uncover
            a new dimension of efficiency and organization with our integrated
            tools, simplifying your document experience like never before.
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
