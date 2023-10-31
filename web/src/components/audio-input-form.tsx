import { Eraser, FileAudio, Upload } from "lucide-react";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";

import { api } from "@/lib/axios";
import { View } from "@/pages/apps/Videos";
import { Cross2Icon } from "@radix-ui/react-icons";

type Status = "waiting" | "converting" | "uploading" | "generating" | "success";

const statusMessages = {
  converting: "Converting...",
  uploading: "Uploading...",
  generating: "Generating...",
  success: "Success!",
};

interface AudioInputFormProps {
  onAudioUploaded: (audioId: string) => void;
  view?: View;
}

export const AudioInputForm = ({
  onAudioUploaded,
  view,
}: AudioInputFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const promptInputRef = useRef<HTMLTextAreaElement>(null);

  const [status, setStatus] = useState<Status>("waiting");

  const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;

    if (!files) return;

    const [selectedFile] = files;

    setSelectedFile(selectedFile);
  };

  const previewURL = useMemo(() => {
    if (!selectedFile) {
      return null;
    }

    return URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  const handleUploadAudio = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const prompt = promptInputRef.current?.value;

    if (!selectedFile) return;

    const data = new FormData();
    data.append("file", selectedFile);

    setStatus("uploading");
    const res = await api.post("/audios", data);
    const audioId = res.data.audio.id;

    setStatus("generating");
    await api.post(`/audios/${audioId}/transcription`, {
      prompt,
    });

    setStatus("success");
    onAudioUploaded(audioId);
  };

  const handleDeleteAudio = () => {
    setSelectedFile(null);
    setStatus("waiting");
    promptInputRef.current!.value = "";
    view?.deleteView();
  };

  useEffect(() => {
    if (view && view.audio) {
      setStatus("success");
    }
  }, [view]);

  return (
    <form className="flex flex-col gap-6" onSubmit={handleUploadAudio}>
      <label
        className="border flex rounded-md aspect-video border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground data-[disabled=false]:hover:bg-primary/5 text-center
                   data-[disabled=true]:cursor-not-allowed data-[disabled=false]:cursor-pointer"
        htmlFor="audio"
        data-disabled={status !== "waiting"}
      >
        {previewURL ? (
          <>
            <audio
              className="w-full p-2 object-cover rounded-md justify-self-center items-center justify-center"
              src={previewURL}
              controls
            />
          </>
        ) : view ? (
          <>
            <Cross2Icon className="w-4 h-4" />
            Audio preview of ({view.audio?.name}) not available in view mode
          </>
        ) : (
          <>
            <FileAudio className="w-4 h-4" />
            Upload a audio
          </>
        )}
      </label>
      <input
        type="file"
        id="audio"
        accept="audio/mp3"
        className="sr-only"
        onChange={handleFileSelected}
        disabled={status !== "waiting"}
      />

      <Separator />

      <div className="flex flex-col gap-2">
        <Label htmlFor="transcription_prompt">Transcription Prompt</Label>
        <Textarea
          disabled={status !== "waiting"}
          id="transcription_prompt"
          className="h-20 resize-none leading-relaxed"
          placeholder="Keywords from the transcription to help the AI generate the result separated by comma (,)"
          ref={promptInputRef}
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button
          disabled={status !== "waiting" || selectedFile === null}
          type="submit"
          data-success={status === "success"}
          className="data-[success=true]:bg-emerald-400 flex-1"
        >
          {status === "waiting" ? (
            <>
              Upload audio
              <Upload className="w-4 h-4 ml-2" />
            </>
          ) : (
            statusMessages[status]
          )}
        </Button>
        <Button
          onClick={handleDeleteAudio}
          type="button"
          className="bg-red-600 hover:bg-gray-500"
        >
          <Eraser className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};
