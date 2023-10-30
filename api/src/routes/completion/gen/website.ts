import { OpenAIStream, streamToResponse } from "ai";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

import { openai, streamRes } from "../../../lib/opeanai";

export async function websiteCompletion(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodySchema = z.object({
    url: z.string(),
    prompt: z.string(),
    temperature: z.number().min(0).max(1).default(0.5),
  });

  const { url, prompt, temperature } = bodySchema.parse(request.body);

  const website = await prisma.website.findUniqueOrThrow({
    where: {
      url,
    },
  });

  if (!website.content) {
    return reply.status(400).send({ error: "Website not found" });
  }
  const originalPromptSize = prompt.length;
  const websiteContent = website.content.slice(0, 14400 - originalPromptSize);
  const promptMessage = prompt.replace("{content}", websiteContent);
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
    max_tokens: 400,
    stream: true,
  });

  const stream = OpenAIStream(response);

  return streamRes(stream, reply);
}
