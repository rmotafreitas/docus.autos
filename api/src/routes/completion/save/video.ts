import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function videoCompletionSave(
  request: FastifyRequest,
  reply: FastifyReply,
  userId: string
) {
  const bodySchema = z.object({
    videoId: z.string().uuid(),
    resultText: z.string(),
    promptText: z.string(),
  });

  const { videoId, resultText, promptText } = bodySchema.parse(request.body);

  const video = await prisma.videohistory.findFirst({
    where: {
      videoId,
      userId,
      resultText,
    },
  });

  if (!video) {
    const res = await prisma.videohistory.create({
      data: {
        videoId,
        userId,
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
