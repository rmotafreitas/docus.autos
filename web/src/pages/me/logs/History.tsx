import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { HistoryTypeParams } from "@/App";
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
  HistoryItemArticle,
  columns as article_cols,
} from "./schema/articles.columns";
import {
  HistoryItemAudio,
  columns as audio_cols,
} from "./schema/audios.columns";
import {
  HistoryItemVideo,
  columns as video_cols,
} from "./schema/videos.columns";
import {
  HistoryItemWebsite,
  columns as website_cols,
} from "./schema/webistes.columns";

export const linker = {
  websites: {
    cols: website_cols,
    key: "websites",
  },
  videos: {
    cols: video_cols,
    key: "videos",
  },
  articles: {
    cols: article_cols,
    key: "articles",
  },
  audios: {
    cols: audio_cols,
    key: "audios",
  },
};

type History = {
  videos: HistoryItemVideo[];
  websites: HistoryItemWebsite[];
  articles: HistoryItemArticle[];
  audios: HistoryItemAudio[];
};

export const deleteRow = async (id: string, type: keyof typeof linker) => {
  const res = await api.delete(`/ai/complete/${type}/${id}`);
  window.location.href = `/me/history/${type}`;
};

export function HistoryPage() {
  let { typeid } = useParams<HistoryTypeParams>();
  typeid = typeid || "websites";

  const router = useNavigate();
  const [history, setHistory] = useState<History>();
  const [filter, setFilter] = useState<keyof typeof linker>(typeid);

  useEffect(() => {
    (async () => {
      try {
        const history = await api.post("/ai/complete/all/log");
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
              <DropdownMenuTrigger className="absolute top-[4.85rem] right-2">
                <FilterIcon className="text-xl text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Media Filter</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setFilter("videos")}
                  className="flex flex-row gap-2 justify-start items-center"
                >
                  <FileVideo className="w-4" />
                  Videos
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setFilter("websites")}
                  className="flex flex-row gap-2 justify-start items-center"
                >
                  <Globe className="w-4" />
                  Websites
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setFilter("articles")}
                  className="flex flex-row gap-2 justify-start items-center"
                >
                  <FileText className="w-4" />
                  Documents
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setFilter("audios")}
                  className="flex flex-row gap-2 justify-start items-center"
                >
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
