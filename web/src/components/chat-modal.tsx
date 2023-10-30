import * as Dialog from "@radix-ui/react-dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MessagesSquareIcon, SendHorizonal } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { useContext, useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { UserIdContext, UserIdContextProps } from "@/contexts/user.context";
import { useCompletion } from "ai/react";

interface ChatModalProps {
  id: string;
  type: "article" | "video" | "audio" | "website";
}

interface Message {
  promptText: string;
  resultText: string;
}

export function ChatSection({ id, type }: ChatModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger disabled={!id} className="flex items-center">
        <Button disabled={!id}>
          <MessagesSquareIcon className="w-4 h-4 mr-2" />
          AI Chat
        </Button>
      </Dialog.Trigger>
      {id && <ChatModal type={type} id={id} />}
    </Dialog.Root>
  );
}

export function ChatModal({ id, type }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  const { userId }: UserIdContextProps = useContext(UserIdContext);

  async function getMessages() {
    const { data } = await api.post(`/ai/chat/${type}`, {
      contentId: id,
    });
    setMessages(data);
  }

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    setCompletion,
    isLoading,
  } = useCompletion({
    api: `http://localhost:3333/ai/chat/${type}/complete`,
    body: {
      contentId: id,
    },
    headers: {
      "Content-Type": "application/json",
    },
    onFinish: async (prompt, completion) => {
      setInput("");
      setCompletion("");
      await api.post(`/ai/chat/${type}/save`, {
        contentId: id,
        resultText: completion,
        promptText: input,
      });
      await getMessages();
    },
  });

  useEffect(() => {
    getMessages().then(() => {
      scrollChat();
    });
  }, [id]);

  useEffect(() => {
    scrollChat();
  }, [completion, isLoading]);

  const scrollChat = () => {
    const myDiv = document.querySelector(
      "div[style='min-width: 100%; display: table;']"
    );
    if (myDiv) {
      myDiv.scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-4 px-4 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] h-[480px] max-h-[480px] shadow-lg shadow-black/25 flex flex-col">
        <Dialog.Title className="text-xl font-black mb-4">AI Chat</Dialog.Title>
        <ScrollArea className="flex-1 flex-col pr-2 scroll-area">
          {messages &&
            messages.map((message: Message, i) => {
              return (
                <>
                  <ChatBubble key={i} text={message.promptText} isAi={false} />
                  <ChatBubble
                    key={i + 1}
                    text={message.resultText}
                    isAi={true}
                  />
                  {i === messages.length - 1 && (
                    <>
                      <ChatBubble
                        visible={isLoading}
                        key={i + 2}
                        text={input}
                        isAi={false}
                      />
                      <ChatBubble
                        visible={completion.length > 0}
                        key={i + 3}
                        text={completion}
                        isAi={true}
                      />
                    </>
                  )}
                </>
              );
            })}
        </ScrollArea>
        <form
          onSubmit={handleSubmit}
          className="flex w-full pt-2 items-end space-x-2"
        >
          <Input
            onChange={handleInputChange}
            value={isLoading || completion.length > 0 ? "" : input}
            type="text"
            placeholder="Type a message..."
          />
          <Button disabled={isLoading} type="submit">
            <SendHorizonal />
          </Button>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

interface ChatBubbleProps {
  text: string;
  isAi: boolean;
  visible?: boolean;
}

function ChatBubble({ text, isAi, visible }: ChatBubbleProps) {
  visible = visible ?? true;
  return (
    <div
      className={`flex flex-col mb-4 ${isAi ? "items-start" : "items-end"}
    ${!visible && "hidden"}
    `}
    >
      <div className="flex max-w-[90%] items-center">
        <div
          className={`
            ${isAi ? "bg-[#4F4CE5]" : "bg-gray-500"}
        rounded-lg py-2 px-4 shadow-lg shadow-black/25`}
        >
          <p className="text-white leading-relaxed break-words whitespace-pre-wrap">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
