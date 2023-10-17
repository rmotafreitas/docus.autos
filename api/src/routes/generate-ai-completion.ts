import { OpenAIStream, streamToResponse } from "ai";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

import { openai } from "../lib/opeanai";

export const generateAICompletionRoute = async (app: FastifyInstance) => {
  app.post("/ai/complete/videos", async (request, reply) => {
    const bodySchema = z.object({
      videoId: z.string().uuid(),
      prompt: z.string(),
      temperature: z.number().min(0).max(1).default(0.5),
      userId: z.string(),
    });

    const { videoId, prompt, temperature, userId } = bodySchema.parse(
      request.body
    );

    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId,
      },
    });

    if (!video.transcript) {
      return reply.status(400).send({ error: "Transcript not generated yet" });
    }

    const promptMessage = prompt.replace("{transcription}", video.transcript);

    if (
      !(await prisma.videohistory.findUnique({
        where: {
          userId_videoId: {
            userId,
            videoId,
          },
        },
      }))
    ) {
      await prisma.videohistory.create({
        data: {
          userId,
          videoId,
          promptText: promptMessage,
        },
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k-0613",
      temperature,
      messages: [
        {
          role: "user",
          content: promptMessage,
        },
      ],
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
