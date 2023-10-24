import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function websiteCompletionSave(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodySchema = z.object({
    websiteUrl: z.string(),
    userId: z.string().uuid(),
    resultText: z.string(),
    promptText: z.string(),
  });

  const { websiteUrl, resultText, userId, promptText } = bodySchema.parse(
    request.body
  );

  const video = await prisma.websitehistory.findFirst({
    where: {
      websiteUrl,
      userId,
      resultText,
    },
  });

  if (!video) {
    const website = await prisma.website.findUnique({
      where: {
        url: websiteUrl,
      },
    });
    await prisma.websitehistory.create({
      data: {
        userId,
        websiteUrl,
        resultText,
        promptText: promptText.replace(
          "{content}",
          website?.content || "{content}"
        ),
      },
    });
  }

  return;
}
