import { OpenAIStream } from "ai";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

import { openai, streamRes } from "../../../lib/opeanai";

export async function audioCompletion(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodySchema = z.object({
    audioId: z.string(),
    prompt: z.string(),
    temperature: z.number().min(0).max(1).default(0.5),
  });

  const { audioId, prompt, temperature } = bodySchema.parse(request.body);

  const audio = await prisma.audio.findUniqueOrThrow({
    where: {
      id: audioId,
    },
  });

  if (!audio.transcript) {
    return reply.status(400).send({ error: "Transcript not generated yet" });
  }

  const promptMessage = prompt.replace("{transcription}", audio.transcript);

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
