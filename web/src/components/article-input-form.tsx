import { Button } from "./ui/button";
import { FileText, Trash, Upload } from "lucide-react";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";

import { api } from "@/lib/axios";

type Status = "waiting" | "converting" | "uploading" | "generating" | "success";

const statusMessages = {
  converting: "Converting...",
  uploading: "Uploading...",
  generating: "Generating...",
  success: "Success!",
};

interface ArticleInputFormProps {
  onArticleUploaded: (articleId: string) => void;
}

export const ArticleInputForm = ({
  onArticleUploaded,
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
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleUploadArticle}>
      <label
        className="border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5 overflow-hidden"
        htmlFor="article"
      >
        {previewURL ? (
          <iframe
            className="w-full h-full"
            src={previewURL}
            title="article-preview"
          />
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
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};
