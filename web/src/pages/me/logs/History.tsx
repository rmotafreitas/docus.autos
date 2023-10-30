import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

import { DataTable } from "@/components/data-table";
import { Navbar } from "@/components/navbar";
import { api } from "@/lib/axios";
import {
  FileAudio,
  FileText,
  FileVideo,
  FilterIcon,
  Globe,
} from "lucide-react";
import {
  HistoryItemWebsite,
  columns as website_cols,
} from "./schema/webistes.columns";
import {
  HistoryItemVideo,
  columns as video_cols,
} from "./schema/videos.columns";
import {
  HistoryItemArticle,
  columns as article_cols,
} from "./schema/articles.columns";
import { HistoryItemAudio } from "./schema/audios.columns";

const linker = {
  website_cols: {
    cols: website_cols,
    key: "websites",
  },
  video_cols: {
    cols: video_cols,
    key: "videos",
  },
  article_cols: {
    cols: article_cols,
    key: "articles",
  },
};

type History = {
  videos: HistoryItemVideo[];
  websites: HistoryItemWebsite[];
  articles: HistoryItemArticle[];
  audios: HistoryItemAudio[];
};

export function HistoryPage() {
  const router = useNavigate();
  const [history, setHistory] = useState<History>();
  const [filter, setFilter] = useState<keyof typeof linker>("website_cols");

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-col flex-1 justify-center items-center">
        {history?.websites && (
          <div className="flex flex-col justify-center items-end relative">
            <DataTable
              columns={linker[filter].cols}
              data={
                // @ts-expect-error
                history[linker[filter].key]
              }
            />
            <DropdownMenu>
              <DropdownMenuTrigger className="absolute top-2 right-2">
                <FilterIcon className="text-xl text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Media Filter</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setFilter("video_cols")}
                  className="flex flex-row gap-2 justify-start items-center"
                >
                  <FileVideo className="w-4" />
                  Videos
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setFilter("website_cols")}
                  className="flex flex-row gap-2 justify-start items-center"
                >
                  <Globe className="w-4" />
                  Websites
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setFilter("article_cols")}
                  className="flex flex-row gap-2 justify-start items-center"
                >
                  <FileText className="w-4" />
                  Documents
                </DropdownMenuItem>

                <DropdownMenuItem className="flex flex-row gap-2 justify-start items-center">
                  <FileAudio className="w-4" />
                  Audios
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
}
