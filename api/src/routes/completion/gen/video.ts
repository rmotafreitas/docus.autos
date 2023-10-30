import { OpenAIStream, streamToResponse } from "ai";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

import { openai, streamRes } from "../../../lib/opeanai";

export async function videoCompletion(
  request: FastifyRequest,
  reply: FastifyReply
) {
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

  return streamRes(stream, reply);
}
