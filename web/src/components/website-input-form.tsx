import { api } from "@/lib/axios";
import { View } from "@/pages/apps/Videos";
import { CrossIcon, Eraser, Globe, Upload } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import axios from "axios";

type Status = "waiting" | "fetching" | "uploading" | "generating" | "success";

const statusMessages = {
  fetching: "Fetching...",
  uploading: "Uploading...",
  generating: "Generating...",
  success: "Success!",
};

interface WebsiteInfo {
  url: string;
  title: string;
  image: string;
  content: string;
}

interface WebsiteInputFormProps {
  onWebsiteUploaded: (url: string) => void;
  view?: View;
}

export const WebsiteInputForm = ({
  onWebsiteUploaded,
  view,
}: WebsiteInputFormProps) => {
  const urlInputRef = useRef<HTMLInputElement>(document.createElement("input"));
  const [status, setStatus] = useState<Status>("waiting");
  const [websiteInfo, setWebsiteInfo] = useState<WebsiteInfo>({
    url: "",
    title: "",
    image: "",
    content: "",
  });

  const handleUploadWebsite = async (event: FormEvent<HTMLFormElement>) => {
    urlInputRef.current!.value = urlInputRef.current!.value.trim();
    let url = urlInputRef.current!.value.trim();
    url = url.includes("http") ? url : `https://${url}`;
    event.preventDefault();
    setStatus("fetching");
    try {
      const res = await api.post("/websites", {
        url,
      });
      // grab status from response
      if (res.data.content) {
        setStatus("success");
        const image = await axios.get(
          `https://api.apiflash.com/v1/urltoimage?access_key=${
            import.meta.env.VITE_API_FLASH
          }&wait_until=page_loaded&url=${url}`,
          { responseType: "blob" }
        );
        const file = new File([image.data], "image.png", { type: "image/png" });
        res.data.image = URL.createObjectURL(file);
        onWebsiteUploaded(res.data.url);
        setWebsiteInfo(res.data);
      } else {
        throw new Error("Website not available for us");
      }
    } catch (error) {
      setStatus("waiting");
      setWebsiteInfo({
        url: "",
        title: "",
        image: "404",
        content: "",
      });
    }
  };

  const handleDeleteWebsite = async () => {
    urlInputRef.current!.value = "";
    setStatus("waiting");
    setWebsiteInfo({
      url: "",
      title: "",
      image: "",
      content: "",
    });
    view?.deleteView();
  };

  useEffect(() => {
    if (view && view.website) {
      urlInputRef.current!.value = view.website.url;
      handleUploadWebsite(new Event("submit") as any);
    }
  }, [view]);

  return (
    <form className="flex flex-col gap-6" onSubmit={handleUploadWebsite}>
      <label className="border flex rounded-md aspect-video overflow-hidden border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground relative">
        {status === "fetching" ? (
          <span className="loader"></span>
        ) : websiteInfo.title !== "" ? (
          <img src={websiteInfo?.image} className="pointer-events-none" />
        ) : websiteInfo.image !== "404" ? (
          <>
            <Globe className="w-4 h-4" />
            Website Preview
          </>
        ) : (
          <>
            <CrossIcon className="w-4 h-4" />
            Invalid URL or Website not available for us :(
          </>
        )}
      </label>
      <Separator />
      <Label htmlFor="website_url">Website Url</Label>
      <Input
        disabled={status !== "waiting"}
        id="website_url"
        placeholder="Paste a website link here"
        ref={urlInputRef}
      />

      <Separator />

      <div className="flex gap-2 justify-end">
        <Button
          disabled={status !== "waiting"}
          type="submit"
          data-success={status === "success"}
          className="data-[success=true]:bg-emerald-400 flex-1"
        >
          {status === "waiting" ? (
            <>
              Upload Website
              <Upload className="w-4 h-4 ml-2" />
            </>
          ) : (
            statusMessages[status]
          )}
        </Button>
        <Button
          onClick={handleDeleteWebsite}
          type="button"
          className="bg-red-600 hover:bg-gray-500"
        >
          <Eraser className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};
