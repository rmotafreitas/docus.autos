import "dotenv/config";
import { getAIChatRoute } from "./routes/chat/chat";
import { fastifyCors } from "@fastify/cors";
import { FastifyReply, FastifyRequest, fastify } from "fastify";
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
import type { FastifyCookieOptions } from "@fastify/cookie";
import cookie from "@fastify/cookie";
import * as jose from "jose";
import { getAICompletionHistoryRoute } from "./routes/get-ai-completion-history";
import { deleteAICompletionHistoryRoute } from "./routes/delete-ai-completion-history";
const host = "RENDER" in process.env ? `0.0.0.0` : `localhost`;

const app = fastify();

const authJWTCookieHanko = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const token = request.cookies?.hanko;

  // Check if the token is valid and not expired
  try {
    const payload = jose.decodeJwt(token ?? "");
    const userID = payload.sub;

    if (!userID || token === undefined) {
      throw new Error("Invalid token");
    }

    // @ts-expect-error
    request.userID = userID;
  } catch (error) {
    // @ts-expect-error
    request.userID = null;
  }
};

app.register(fastifyCors, {
  origin: "http://localhost:5173",
  credentials: true,
});

app.register(cookie, {
  secret: "my-secret", // for cookies signature
  parseOptions: {}, // options for parsing cookies
} as FastifyCookieOptions);

app.addHook("preHandler", authJWTCookieHanko);

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
app.register(getAICompletionHistoryRoute);
app.register(deleteAICompletionHistoryRoute);

app.register(fastifystatic, {
  root: path.join(__dirname, "..", "tmp"),
  prefix: "/tmp/",
});

// @ts-ignore
app
  .listen({
    host,
    port: process.env.PORT || 3000,
  })
  .then((address) => {
    console.log(`Server is listening on ${address}`);
  });
