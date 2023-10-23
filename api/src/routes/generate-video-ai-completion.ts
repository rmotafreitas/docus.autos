import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { streamToResponse, OpenAIStream } from "ai";

import { createReadStream } from "node:fs";
import { openai } from "../lib/opeanai";

export const generateVideoAICompletionRoute = async (app: FastifyInstance) => {
  app.post("/ai/complete/video", async (request, reply) => {
    const bodySchema = z.object({
      videoId: z.string().uuid(),
      prompt: z.string(),
      temperature: z.number().min(0).max(1).default(0.5),
    });

    const { videoId, prompt, temperature } = bodySchema.parse(request.body);

    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId,
      },
    });

    if (!video.transcript) {
      return reply.status(400).send({ error: "Transcript not generated yet" });
    }

    const promptMessage = prompt.replace("{transcription}", video.transcript);
    console.log(promptMessage);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k-0613",
      temperature,
      messages: [
        {
          role: "user",
          content: promptMessage,
        },
      ],
      // max_tokens: 150,
      stream: true,
    });

    const stream = OpenAIStream(response);

    streamToResponse(stream, reply.raw, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
      },
    });
  });
};
