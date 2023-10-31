import { Eraser, FileText, Upload } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";

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

interface ArticleInputFormProps {
  onArticleUploaded: (articleId: string) => void;
  view?: View;
}

export const ArticleInputForm = ({
  onArticleUploaded,
  view,
}: ArticleInputFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [status, setStatus] = useState<Status>("waiting");

  const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;

    if (!files) return;

    const [selectedFile] = files;

    setSelectedFile(selectedFile);
  };

  const previewURL = useMemo(() => {
    if (!selectedFile) return null;

    return URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  const handleUploadArticle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedFile) {
      setStatus("uploading");
      const data = new FormData();
      data.append("file", selectedFile);
      const res = await api.post("/articles", data);
      setStatus("success");
      onArticleUploaded(res.data.article.id);
    }
  };

  const handleDeleteArticle = () => {
    setSelectedFile(null);
    setStatus("waiting");
    view?.deleteView();
  };

  useEffect(() => {
    if (view && view.article) {
      setStatus("success");
    }
  }, [view]);

  return (
    <form className="flex flex-col gap-6" onSubmit={handleUploadArticle}>
      <label
        className="border flex rounded-md aspect-video border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground data-[disabled=false]:hover:bg-primary/5 text-center
              data-[disabled=true]:cursor-not-allowed data-[disabled=false]:cursor-pointer"
        htmlFor="article"
        data-disabled={status !== "waiting"}
      >
        {previewURL ? (
          <iframe
            className="w-full h-full"
            src={previewURL}
            title="article-preview"
          />
        ) : view?.article ? (
          <>
            <Cross2Icon className="w-4 h-4" />
            Preview of article ({view.article.name}) preview not available in
            view mode
          </>
        ) : (
          <>
            <FileText className="w-4 h-4" />
            Upload an article
          </>
        )}
      </label>
      <input
        type="file"
        id="article"
        accept="application/pdf"
        className="sr-only"
        onChange={handleFileSelected}
        disabled={status !== "waiting"}
      />

      <div className="flex gap-2 justify-end">
        <Button
          disabled={status !== "waiting" || selectedFile === null}
          type="submit"
          data-success={status === "success"}
          className="data-[success=true]:bg-emerald-400 flex-1"
        >
          {status === "waiting" ? (
            <>
              Upload Article
              <Upload className="w-4 h-4 ml-2" />
            </>
          ) : (
            statusMessages[status]
          )}
        </Button>
        <Button
          onClick={handleDeleteArticle}
          type="button"
          className="bg-red-600 hover:bg-gray-500"
        >
          <Eraser className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};
