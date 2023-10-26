import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

import { createReadStream } from "node:fs";
import { openai } from "../lib/opeanai";

export const createTranscriptionVideoRoute = async (app: FastifyInstance) => {
  app.post("/videos/:videoId/transcription", async (request, reply) => {
    const paramsSchema = z.object({
      videoId: z.string().uuid(),
    });

    const { videoId } = paramsSchema.parse(request.params);

    const bodySchema = z.object({
      prompt: z.string(),
    });

    const { prompt } = bodySchema.parse(request.body);

    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId,
      },
    });

    const videoPath = video.path;
    const audioReadStream = createReadStream(videoPath);

    const response = await openai.audio.transcriptions.create({
      file: audioReadStream,
      model: "whisper-1",
      language: "en",
      response_format: "json",
      temperature: 0,
      prompt,
    });

    const transcript = response.text;

    await prisma.video.update({
      where: {
        id: videoId,
      },
      data: {
        transcript,
      },
    });

    return { transcript };
  });
};
