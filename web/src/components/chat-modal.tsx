import * as Dialog from "@radix-ui/react-dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SendHorizonal } from "lucide-react";

export function ChatModal() {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-4 px-6 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-xl font-black mb-4">AI Chat</Dialog.Title>
        <ChatBubble
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nulla sunt a doloribus sint aliquid, minima similique eius! Recusandae molestiae cum laboriosam omnis. Aperiam voluptatibus possimus rem praesentium! Quae, aliquid?"
          isAi
        />
        <ChatBubble
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nulla sunt a doloribus sint aliquid, minima similique eius! Recusandae molestiae cum laboriosam omnis. Aperiam voluptatibus possimus rem praesentium! Quae, aliquid?"
          isAi={false}
        />
        <div className="flex w-full items-center space-x-2">
          <Input type="text" placeholder="Type a message..." />
          <Button type="submit">
            <SendHorizonal />
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

interface ChatBubbleProps {
  text: string;
  isAi: boolean;
}

function ChatBubble({ text, isAi }: ChatBubbleProps) {
  return (
    <div className={`flex flex-col mb-4 ${isAi ? "items-start" : "items-end"}`}>
      <div className="flex w-11/12 items-center">
        <div
          className={`
            ${isAi ? "bg-[#4F4CE5]" : "bg-gray-500"}
        rounded-lg py-2 px-4 shadow-lg shadow-black/25`}
        >
          <p className="text-white">{text}</p>
        </div>
      </div>
    </div>
  );
}
