import { ViewParams } from "@/App";
import { ArticleInputForm } from "@/components/article-input-form";
import { ChatSection } from "@/components/chat-modal";
import { Navbar } from "@/components/navbar";
import { api } from "@/lib/axios";
import { hankoInstance } from "@/lib/hanko";
import { useCompletion } from "ai/react";
import Cookies from "js-cookie";
import { Wand2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PromptSelect } from "../../components/prompt-select";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Separator } from "../../components/ui/separator";
import { Slider } from "../../components/ui/slider";
import { Textarea } from "../../components/ui/textarea";
import { View } from "./Videos";

export function ArticleAppPage() {
  const deleteView = () => {
    setView(undefined);
    setChatId("");
    setArticleId(null);
  };

  const { viewid } = useParams<ViewParams>();

  const [view, setView] = useState<View>();

  const [temperature, setTemperature] = useState(0.5);
  const [articleId, setArticleId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const hanko = useMemo(() => hankoInstance, []);
  const router = useNavigate();

  const [chatId, setChatId] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const user = await hanko.user.getCurrent();
        setUser(user);
      } catch (e) {
        router("/auth?expired=1");
      }
      if (viewid) {
        const res = await api.get(`/ai/complete/articles/${viewid}`);
        const data: View = res.data;
        if (data.article) {
          setArticleId(data.article.id);
        }
        setInput(data.promptText);
        setChatId(data.id);
        setCompletion(data.resultText);
        data.deleteView = deleteView;
        setView(data);
      }
    })();
  }, []);

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
    setCompletion,
  } = useCompletion({
    api: api.getUri() + "/ai/complete/articles",
    body: {
      id: articleId,
      temperature,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("hanko")}`,
    },
    onFinish: async (prompt, completion) => {
      const res = await api.post("/ai/complete/articles/save", {
        articleId,
        resultText: completion,
        promptText: input,
      });
      setChatId(res.data.id);
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-6 flex gap-6 max-md:flex-col-reverse">
        <section className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea
              placeholder="Type your prompt here"
              className="resize-none p-4 leading-relaxed max-md:h-64"
              value={input}
              onChange={handleInputChange}
            />
            <Textarea
              readOnly
              placeholder="Result generated by AI"
              className="resize-none p-4 leading-relaxed"
              value={completion}
            />
          </div>
          <section className="flex flex-row justify-between items-center max-sm:flex-col-reverse max-sm:gap-2">
            <p className="text-sm text-muted-foreground">
              Pro tip: You can use{" "}
              <code className="text-violet-400">
                {"{"}transcription{"}"}
              </code>{" "}
              tag on your prompt to add the transcription of the article
            </p>

            <ChatSection id={chatId} type="article" />
          </section>
        </section>

        <aside className="w-80 flex flex-col gap-6 max-md:w-full">
          <ArticleInputForm view={view} onArticleUploaded={setArticleId} />

          <Separator />

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label>Prompt</Label>
              <PromptSelect type="article" onPromptSelected={setInput} />
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
              <Label>Model</Label>
              <Select disabled defaultValue="gpt3.5">
                <SelectTrigger>
                  <SelectValue></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-xs text-muted-foreground italic">
                Coming soon the option to choose the model
              </span>
            </div>

            <Separator />

            <div className="flex flex-col gap-4">
              <Label>Temperature</Label>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[temperature]}
                onValueChange={([value]) => setTemperature(value)}
              />

              <span className="text-xs text-muted-foreground italic leading-relaxed">
                Higher temperature means the AI will be more creative
              </span>
            </div>

            <Separator />

            <Button disabled={isLoading || !articleId || !input} type="submit">
              Generate
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  );
}
