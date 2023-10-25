import { Button } from "./ui/button";
import { CrossIcon, FileVideo, Upload, Youtube } from "lucide-react";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";

import { initFFmpeg } from "@/lib/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { api } from "@/lib/axios";
import axios from "axios";

type Status = "waiting" | "converting" | "uploading" | "generating" | "success";

const statusMessages = {
  converting: "Converting...",
  uploading: "Uploading...",
  generating: "Generating...",
  success: "Success!",
};

interface YoutubeVideoInfo {
  url: string;
  title: string;
  id: string;
  thumbnail: string;
}

interface VideoInputFormProps {
  onVideoUploaded: (videoId: string) => void;
}

export const VideoInputForm = ({ onVideoUploaded }: VideoInputFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFetchingDataFromAPI, setIsFetchingDataFromAPI] = useState(false);
  const promptInputRef = useRef<HTMLTextAreaElement>(null);
  const youtubeLinkInputRef = useRef<HTMLTextAreaElement>(null);

  const [status, setStatus] = useState<Status>("waiting");
  const [inputType, setInputType] = useState<"file" | "youtube">("file");
  const [youtubeVideoInfo, setYoutubeVideoInfo] = useState<YoutubeVideoInfo>({
    url: "",
    title: "",
    id: "",
    thumbnail: "",
  });

  const handleGetInfoFromYoutube = async () => {
    setIsFetchingDataFromAPI(true);
    const url = youtubeLinkInputRef.current?.value;

    if (!url) {
      setIsFetchingDataFromAPI(false);
      return setYoutubeVideoInfo({
        url: "",
        title: "",
        id: "",
        thumbnail: "",
      });
    }

    if (!RegExp(/youtube.com\/watch\?v=/).test(url)) {
      setIsFetchingDataFromAPI(false);
      return setYoutubeVideoInfo({
        url,
        title: "",
        id: "",
        thumbnail: "404",
      });
    }

    const res = await api
      .post("/videos/yt", {
        url,
      })
      .catch(() => {
        return {
          data: {
            url,
            title: "",
            audioFile: "",
            thumbnail: "404",
          },
        };
      });

    const { title, id, thumbnail } = res.data;

    setYoutubeVideoInfo({
      url,
      title,
      id,
      thumbnail,
    });

    promptInputRef.current!.value = title;

    setIsFetchingDataFromAPI(false);
  };

  const convertVideoToAudio = async (video: File) => {
    console.log(video);

    console.log("Converting video to audio...");

    const ffmpeg = await initFFmpeg();

    await ffmpeg.writeFile("input.mp4", await fetchFile(video));

    // ffmpeg.on("log", (log) => console.log(log));

    ffmpeg.on("progress", (progress) => {
      console.log("Convert progress: " + ~~(progress.progress * 100));
    });

    await ffmpeg.exec([
      "-i",
      "input.mp4",
      "-map",
      "0:a",
      "-b:a",
      "20K",
      "-acodec",
      "libmp3lame",
      "output.mp3",
    ]);

    const data = await ffmpeg.readFile("output.mp3");

    const audioFileBlob = new Blob([data], { type: "audio/mpeg" });
    const audioFile = new File([audioFileBlob], "output.mp3", {
      type: "audio/mpeg",
    });

    console.log("Done converting video to audio!");

    return audioFile;
  };

  const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;

    if (!files) return;

    const [selectedFile] = files;

    setSelectedFile(selectedFile);
  };

  const previewURL = useMemo(() => {
    if (!selectedFile || (inputType === "youtube" && !youtubeVideoInfo)) {
      return null;
    }

    if (inputType === "youtube" && youtubeVideoInfo) {
      return youtubeVideoInfo.thumbnail;
    }

    return URL.createObjectURL(selectedFile);
  }, [selectedFile, youtubeVideoInfo]);

  const handleUploadVideo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const prompt = promptInputRef.current?.value;
    let videoId: string = "";

    if (inputType === "file" && !selectedFile) {
      return;
    } else {
      if (selectedFile) {
        // converter o video em áudio
        setStatus("converting");

        const audioFile = await convertVideoToAudio(selectedFile);

        const data = new FormData();
        data.append("file", audioFile);

        setStatus("uploading");
        const res = await api.post("/videos", data);
        videoId = res.data.video.id;
      } else if (youtubeVideoInfo.title !== "") {
        setStatus("uploading");
        const res = await api.post("/videos/yt/download", {
          url: youtubeVideoInfo.url,
        });
        videoId = res.data.video.id;
      }
    }

    if (!videoId) return;

    setStatus("generating");
    await api.post(`/videos/${videoId}/transcription`, {
      prompt,
    });

    setStatus("success");
    onVideoUploaded(videoId);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleUploadVideo}>
      <section className="flex justify-evenly">
        <button
          className="hover:text-primary
          transition-all duration-200 hover:border-b-primary border-2 border-transparent flex-1
          data-[active=true]:border-b-primary data-[active=true]:text-primary data-[active=true]:font-bold data-[active=true]:pointer-events-none
        "
          data-active={inputType === "file"}
          onClick={() => setInputType("file")}
        >
          File
        </button>
        <button
          className="hover:text-primary
          transition-all duration-200 hover:border-b-primary border-2 border-transparent flex-1 hover:font-bold
          data-[active=true]:border-b-primary data-[active=true]:text-primary data-[active=true]:font-bold data-[active=true]:pointer-events-none
        "
          data-active={inputType === "youtube"}
          onClick={() => setInputType("youtube")}
        >
          Youtube
        </button>
      </section>

      {inputType === "file" ? (
        <>
          <label
            className="border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5"
            htmlFor="video"
          >
            {previewURL ? (
              <video src={previewURL} className="pointer-events-none" />
            ) : (
              <>
                <FileVideo className="w-4 h-4" />
                Upload a video
              </>
            )}
          </label>
          <input
            type="file"
            id="video"
            accept="video/mp4"
            className="sr-only"
            onChange={handleFileSelected}
          />
        </>
      ) : (
        <>
          <label className="border flex rounded-md aspect-video overflow-hidden border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground relative">
            {isFetchingDataFromAPI ? (
              <span className="loader"></span>
            ) : youtubeVideoInfo.title !== "" ? (
              <img
                src={youtubeVideoInfo?.thumbnail}
                className="pointer-events-none"
              />
            ) : youtubeVideoInfo.thumbnail !== "404" ? (
              <>
                <Youtube className="w-4 h-4" />
                Video thumbnail
              </>
            ) : (
              <>
                <CrossIcon className="w-4 h-4" />
                Invalid URL
              </>
            )}
          </label>
          <Separator />
          <Label htmlFor="yt_url">Youtube Video Url</Label>
          <Textarea
            disabled={status !== "waiting"}
            id="yt_url"
            placeholder="Paste a youtube link here"
            className="h-20 resize-none leading-relaxed"
            ref={youtubeLinkInputRef}
            onChange={handleGetInfoFromYoutube}
          />
        </>
      )}

      <Separator />

      <div className="flex flex-col gap-2">
        <Label htmlFor="transcription_prompt">Transcription Prompt</Label>
        <Textarea
          disabled={
            status !== "waiting" ||
            (inputType === "youtube" && youtubeVideoInfo.title === "")
          }
          id="transcription_prompt"
          className="h-20 resize-none leading-relaxed"
          placeholder="Keywords from the transcription to help the AI generate the result separated by comma (,)"
          ref={promptInputRef}
        />
      </div>

      <Button
        disabled={
          status !== "waiting" ||
          (inputType === "youtube" && youtubeVideoInfo.title === "")
        }
        type="submit"
        data-success={status === "success"}
        className="data-[success=true]:bg-emerald-400"
      >
        {status === "waiting" ? (
          <>
            Upload video
            <Upload className="w-4 h-4 ml-2" />
          </>
        ) : (
          statusMessages[status]
        )}
      </Button>
    </form>
  );
};
