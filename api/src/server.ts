import { getAIChatRoute } from "./routes/chat/chat";
import { prisma } from "./lib/prisma";
import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import { getAllPromptsRoute } from "./routes/get-all-prompts";
import { uploadVideoRoute } from "./routes/upload-video";
import { createTranscriptionVideoRoute } from "./routes/create-transcription-video";
import { generateAICompletionRoute } from "./routes/generate-ai-completion";
import { getWebsiteContentRoute } from "./routes/get-website-content";
import { getYTVideoInfoRoute } from "./routes/get-yt-video-info";
import fastifystatic from "@fastify/static";
import path from "path";
import { saveAIVideoCompletion } from "./routes/save-ai-completion";
import { getAILogsCompletion } from "./routes/get-ai-log";
import { downloadYtAudioRoute } from "./routes/download-yt-audio";
import { uploadArticleRoute } from "./routes/upload-article-and-transcribe";
import { uploadAudioRoute } from "./routes/upload-audio";
import { createTranscriptionAudioRoute } from "./routes/create-transcription-audio";
import { getAIChatCompleteRoute } from "./routes/chat/chat-completition";
import { getAIChatSaveRoute } from "./routes/chat/chat-save";

const app = fastify();

app.register(fastifyCors, {
  origin: "*",
});

app.get("/", async (request, reply) => {
  return { hello: "world" };
});

app.register(getAllPromptsRoute);
app.register(getYTVideoInfoRoute);
app.register(uploadVideoRoute);
app.register(createTranscriptionVideoRoute);
app.register(createTranscriptionAudioRoute);
app.register(generateAICompletionRoute);
app.register(getWebsiteContentRoute);
app.register(saveAIVideoCompletion);
app.register(getAILogsCompletion);
app.register(downloadYtAudioRoute);
app.register(uploadArticleRoute);
app.register(uploadAudioRoute);
app.register(getAIChatRoute);
app.register(getAIChatCompleteRoute);
app.register(getAIChatSaveRoute);

app.register(fastifystatic, {
  root: path.join(__dirname, "..", "tmp"),
  prefix: "/tmp/",
});

app
  .listen({
    port: 3333,
  })
  .then((address) => {
    console.log(`Server is listening on ${address}`);
  });
