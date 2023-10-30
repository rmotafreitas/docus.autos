import { useEffect, useMemo, useState } from "react";
// @ts-ignore
import { register } from "@teamhanko/hanko-elements";
import { hankoInstance } from "@/lib/hanko";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Navbar } from "@/components/navbar";
import {
  FileAudio,
  FileText,
  FileVideo,
  FilterIcon,
  Globe,
} from "lucide-react";
import { api } from "@/lib/axios";

interface HistoryItemVideo {
  id: string;
  videoId: string;
  promptText: string;
  resultText: string;
  createdAt: string;
}

interface HistoryItemAudio {
  id: string;
  audioId: string;
  promptText: string;
  resultText: string;
  createdAt: string;
}

interface HistoryItemWebsite {
  id: string;
  websiteUrl: string;
  promptText: string;
  resultText: string;
  createdAt: string;
}

interface HistoryItemArticle {
  article: {
    name: string;
  };
  promptText: string;
  resultText: string;
  createdAt: string;
}

interface History {
  videos: HistoryItemVideo[];
  websites: HistoryItemWebsite[];
  articles: HistoryItemArticle[];
  audios: HistoryItemAudio[];
}

export function HistoryPage() {
  const router = useNavigate();
  const [history, setHistory] = useState<History>();
  const [filter, setFilter] = useState<
    "video" | "website" | "article" | "audio"
  >("video");

  useEffect(() => {
    (async () => {
      try {
        const history = await api.post("/ai/complete/all/log");
        console.log(history.data);
        setHistory(history.data);
      } catch (e) {
        router("/auth?expired=1");
      }
    })();
  }, []);

  const Components = {
    video: () => (
      <Table>
        <TableCaption>A list of your video related prompts</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Video</TableHead>
            <TableHead>Prompt</TableHead>
            <TableHead>Result</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history?.videos &&
            history.videos.map((item: HistoryItemVideo, i: number) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell>{item.promptText.slice(0, 60)}...</TableCell>
                <TableCell>{item.resultText.slice(0, 60)}...</TableCell>
                <TableCell className="text-right">
                  {new Date(item.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    ),
    website: () => (
      <Table>
        <TableCaption>A list of your web related prompts</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Website</TableHead>
            <TableHead>Prompt</TableHead>
            <TableHead>Result</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history?.websites &&
            history.websites.map((item: HistoryItemWebsite, i: number) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium break-words max-w-[5em]">
                  {item.websiteUrl}
                </TableCell>
                <TableCell>{item.promptText.slice(0, 60)}...</TableCell>
                <TableCell>{item.resultText.slice(0, 60)}...</TableCell>
                <TableCell className="text-right">
                  {new Date(item.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    ),
    article: () => (
      <Table>
        <TableCaption>A list of your PDFs related prompts</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Article</TableHead>
            <TableHead>Prompt</TableHead>
            <TableHead>Result</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history?.articles &&
            history.articles.map((item: HistoryItemArticle, i: number) => (
              <TableRow key={i}>
                <TableCell className="font-medium">
                  {item.article.name}
                </TableCell>
                <TableCell>{item.promptText.slice(0, 60)}...</TableCell>
                <TableCell>{item.resultText.slice(0, 60)}...</TableCell>
                <TableCell className="text-right">
                  {new Date(item.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    ),
    audio: () => (
      <Table>
        <TableCaption>A list of your audio related prompts</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Audio</TableHead>
            <TableHead>Prompt</TableHead>
            <TableHead>Result</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history?.videos &&
            history.videos.map((item: HistoryItemVideo, i: number) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell>{item.promptText.slice(0, 60)}...</TableCell>
                <TableCell>{item.resultText.slice(0, 60)}...</TableCell>
                <TableCell className="text-right">
                  {new Date(item.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    ),
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <Navbar />
      <div className="flex flex-col justify-center items-center flex-1 min-h-full xl:min-w-[74rem] xl:max-w-[74rem] max-xl:w-full">
        <div className="flex justify-end w-full mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row justify-center items-center gap-2">
              <FilterIcon className="text-xl" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Media Filter</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setFilter("video")}
                className="flex flex-row gap-2 justify-start items-center"
              >
                <FileVideo className="w-4" />
                Videos
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setFilter("website")}
                className="flex flex-row gap-2 justify-start items-center"
              >
                <Globe className="w-4" />
                Websites
              </DropdownMenuItem>

              <DropdownMenuItem
                className="flex flex-row gap-2 justify-start items-center"
                onClick={() => setFilter("article")}
              >
                <FileText className="w-4" />
                Documents
              </DropdownMenuItem>

              <DropdownMenuItem
                className="flex flex-row gap-2 justify-start items-center"
                onClick={() => setFilter("audio")}
              >
                <FileAudio className="w-4" />
                Audios
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {Components[filter]()}
      </div>
    </div>
  );
}
