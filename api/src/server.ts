import { prisma } from "./lib/prisma";
import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import { getAllPromptsRoute } from "./routes/get-all-prompts";
import { uploadVideoRoute } from "./routes/upload-video";
import { createTranscriptionRoute } from "./routes/create-transcription";
import { generateVideoAICompletionRoute } from "./routes/generate-video-ai-completion";
import { generateWebsiteAICompletionRoute } from "./routes/generate-website-ai-completion";
import { getWebsiteContentRoute } from "./routes/get-website-content";
import { getYTVideoInfoRoute } from "./routes/get-yt-video-info";
import fastifystatic from "@fastify/static";
import path from "path";

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
app.register(generateVideoAICompletionRoute);
app.register(generateWebsiteAICompletionRoute);
app.register(getWebsiteContentRoute);
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
