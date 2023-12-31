import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function articleCompletionSave(
  request: FastifyRequest,
  reply: FastifyReply,
  userId: string
) {
  const bodySchema = z.object({
    articleId: z.string(),
    resultText: z.string(),
    promptText: z.string(),
  });

  const { articleId, resultText, promptText } = bodySchema.parse(request.body);

  const article = await prisma.articlehistory.findFirst({
    where: {
      articleId,
      userId,
      resultText,
    },
  });

  if (!article) {
    const res = await prisma.articlehistory.create({
      data: {
        userId,
        articleId,
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
