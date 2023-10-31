import { FeatureCard } from "@/components/feature-card";
import { Navbar } from "@/components/navbar";
import { FileAudio, FileText, FileVideo, Globe } from "lucide-react";

export function AppsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="flex-1 flex flex-col justify-center items-center">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 justify-center">
          <FeatureCard
            i={1}
            title="Videos"
            Icon={FileVideo}
            url="/apps/videos"
            features={[
              "Generate a cool title for your video",
              "Generate an attractive description for your video",
              "Generate a summary from a video",
            ]}
          />
          <FeatureCard
            i={2}
            title="Websites"
            Icon={Globe}
            url="/apps/websites"
            features={[
              "Generate a good summary for your website",
              "Generate a Frequently Asked Questions section for your website",
              "Generate a tutorial or guide for your website",
            ]}
          />
          <FeatureCard
            i={3}
            title="Articles"
            Icon={FileText}
            url="/apps/articles"
            features={[
              "Generate a good summary for your article",
              "Create a blog post from your article",
            ]}
          />
          <FeatureCard
            i={4}
            Icon={FileAudio}
            title="Audios"
            url="/apps/audios"
            features={[
              "Generate a good summary for your audio",
              "Generate a transcript from an audio",
            ]}
          />
        </section>
      </section>
    </div>
  );
}
