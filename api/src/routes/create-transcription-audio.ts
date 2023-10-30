import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

import { createReadStream } from "node:fs";
import { openai } from "../lib/opeanai";

export const createTranscriptionAudioRoute = async (app: FastifyInstance) => {
  app.post("/audios/:audioId/transcription", async (request, reply) => {
    // @ts-expect-error
    const userID = request.userID;
    if (!userID) {
      throw new Error("Not authenticated");
    }

    const paramsSchema = z.object({
      audioId: z.string(),
    });

    const { audioId } = paramsSchema.parse(request.params);

    const bodySchema = z.object({
      prompt: z.string(),
    });

    const { prompt } = bodySchema.parse(request.body);

    const audio = await prisma.audio.findUniqueOrThrow({
      where: {
        id: audioId,
      },
    });

    const audioPath = audio.path;
    const audioReadStream = createReadStream(audioPath);

    const response = await openai.audio.transcriptions.create({
      file: audioReadStream,
      model: "whisper-1",
      language: "en",
      response_format: "json",
      temperature: 0,
      prompt,
    });

    const transcript = response.text;

    await prisma.audio.update({
      where: {
        id: audioId,
      },
      data: {
        transcript,
      },
    });

    return { transcript };
  });
};
