import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "./ui/select";
import { api } from "@/lib/axios";

interface Prompt {
  id: string;
  title: string;
  template: string;
}

interface PromptSelectProps {
  onPromptSelected: (template: string) => void;
}

export function PromptSelect({ onPromptSelected }: PromptSelectProps) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    api.get("/prompts/video").then((response) => {
      setPrompts(response.data);
    });
  }, []);

  const handlePromptSelected = (promptId: string) => {
    const prompt = prompts.find((prompt) => prompt.id === promptId);
    if (!prompt) return;
    onPromptSelected(prompt.template);
  };

  return (
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Choose prompt"></SelectValue>
      </SelectTrigger>
      <SelectContent>
        {prompts.map((prompt) => (
          <SelectItem key={prompt.id} value={prompt.id}>
            {prompt.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
