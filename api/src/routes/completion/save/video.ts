import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function videoCompletionSave(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodySchema = z.object({
    videoId: z.string().uuid(),
    userId: z.string().uuid(),
    resultText: z.string(),
    promptText: z.string(),
  });

  const { videoId, resultText, userId, promptText } = bodySchema.parse(
    request.body
  );

  const video = await prisma.videohistory.findFirst({
    where: {
      videoId,
      userId,
      resultText,
    },
  });

  if (!video) {
    await prisma.videohistory.create({
      data: {
        videoId,
        userId,
        resultText,
        promptText,
      },
    });
  }

  return;
}
