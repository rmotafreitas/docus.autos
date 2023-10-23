import { CrossIcon, Globe, Upload } from "lucide-react";
import { FormEvent, useMemo, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { api } from "@/lib/axios";

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
}

export const WebsiteInputForm = ({
  onWebsiteUploaded,
}: WebsiteInputFormProps) => {
  const [selectedWebsite, setSelectedWebsite] = useState<String | null>(null);
  const [isFetchingDataFromAPI, setIsFetchingDataFromAPI] = useState(false);
  const promptInputRef = useRef<HTMLTextAreaElement>(null);
  const [url, setUrl] = useState<String>("");
  const [status, setStatus] = useState<Status>("waiting");
  const [websiteInfo, setWebsiteInfo] = useState<WebsiteInfo>({
    url: "",
    title: "",
    image: "",
    content: "",
  });

  const handleGetInfoFromWebsite = async (value: String) => {
    setUrl(value);
  };

  const previewURL = useMemo(() => {}, [selectedWebsite, websiteInfo]);

  const handleUploadWebsite = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("fetching");
    setIsFetchingDataFromAPI(true);
    const res = await api.post("/websites", {
      url: url.includes("http") ? url : `https://${url}`,
    });
    setStatus("success");
    setIsFetchingDataFromAPI(false);
    const image = await api.get(res.data.image, { responseType: "blob" });
    const file = new File([image.data], "image.png", { type: "image/png" });
    res.data.image = URL.createObjectURL(file);
    setWebsiteInfo(res.data);
    onWebsiteUploaded(res.data.url);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleUploadWebsite}>
      <label className="border flex rounded-md aspect-video overflow-hidden border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground relative">
        {isFetchingDataFromAPI ? (
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
            Invalid URL
          </>
        )}
      </label>
      <Separator />
      <Label htmlFor="website_url">Website Url</Label>
      <Textarea
        disabled={status !== "waiting"}
        id="website_url"
        placeholder="Paste a website link here"
        className="h-20 resize-none leading-relaxed"
        onChange={(e) => handleGetInfoFromWebsite(e.target.value)}
      />

      <Separator />

      <Button
        disabled={status !== "waiting" || url === ""}
        type="submit"
        data-success={status === "success"}
        className="data-[success=true]:bg-emerald-400"
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
    </form>
  );
};
