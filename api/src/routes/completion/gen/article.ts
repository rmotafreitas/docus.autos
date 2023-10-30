import { OpenAIStream, streamToResponse } from "ai";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

import { openai, streamRes } from "../../../lib/opeanai";

export async function articleCompletion(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodySchema = z.object({
    id: z.string(),
    prompt: z.string(),
    temperature: z.number().min(0).max(1).default(0.5),
  });

  const { id, prompt, temperature } = bodySchema.parse(request.body);

  const article = await prisma.article.findUniqueOrThrow({
    where: {
      id,
    },
  });

  if (!article || !article?.transcript) {
    return reply.status(400).send({ error: "Article not found" });
  }

  const originalPromptSize = prompt.length;
  const articleTranscript = article.transcript.slice(
    0,
    14400 - originalPromptSize
  );
  const promptMessage = prompt.replace("{transcription}", articleTranscript);

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k-0613",
    temperature,
    messages: [
      {
        role: "user",
        content: promptMessage,
      },
    ],
    max_tokens: 400,
    stream: true,
  });

  const stream = OpenAIStream(response);

  return streamRes(stream, reply);
}
