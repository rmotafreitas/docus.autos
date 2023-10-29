import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function websiteCompletionSave(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodySchema = z.object({
    url: z.string(),
    userId: z.string().uuid(),
    resultText: z.string(),
    promptText: z.string(),
  });

  const { url, resultText, userId, promptText } = bodySchema.parse(
    request.body
  );

  const website = await prisma.websitehistory.findFirst({
    where: {
      websiteUrl: url,
      userId,
      resultText,
    },
  });

  if (!website) {
    const res = await prisma.websitehistory.create({
      data: {
        userId,
        websiteUrl: url,
        resultText,
        promptText,
        messages: {
          create: [
            {
              userId,
              promptText,
              resultText,
            },
          ],
        },
      },
    });
    return res;
  }

  return;
}
