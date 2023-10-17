import { prisma } from "./lib/prisma";
import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import { getAllPromptsRoute } from "./routes/get-all-prompts";
import { uploadVideoRoute } from "./routes/upload-video";
import { createTranscriptionRoute } from "./routes/create-transcription";
import { generateAICompletionRoute } from "./routes/generate-ai-completion";
import { getYTVideoInfoRoute } from "./routes/get-yt-video-info";
import { saveAIVideoCompletion } from "./routes/save-ai-video-completion";

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
app.register(createTranscriptionRoute);
app.register(generateAICompletionRoute);
app.register(saveAIVideoCompletion);

app
  .listen({
    port: 3333,
  })
  .then((address) => {
    console.log(`Server is listening on ${address}`);
  });
