import { FeatureCard } from "@/components/feature-card";
import { Navbar } from "@/components/navbar";
import { hankoInstance } from "@/lib/hanko";
import { FileAudio, FileText, FileVideo, Globe } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export function AppsPage() {
  const hanko = useMemo(() => hankoInstance, []);
  const router = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const user = await hanko.user.getCurrent();
        console.log(user);
      } catch (e) {
        router("/auth?expired=1");
      }
    })();
  }, []);

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
              "Generate a cool title for your website",
              "Generate an attractive description for your website",
              "Generate a summary from a website",
            ]}
          />
          <FeatureCard
            i={3}
            title="Articles"
            Icon={FileText}
            url="/apps/articles"
            features={[
              "Generate a cool title for your article",
              "Make the best bullet points for your article",
              "Generate a summary from an article",
            ]}
          />
          <FeatureCard
            i={4}
            Icon={FileAudio}
            title="Audios"
            url="/apps/audios"
            features={[
              "Generate a transcript from an audio",
              "Generate a summary from an audio",
              "Make a blog post from an audio",
            ]}
          />
        </section>
      </section>
    </div>
  );
}
