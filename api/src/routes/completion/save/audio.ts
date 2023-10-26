import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function audioCompletionSave(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodySchema = z.object({
    audioId: z.string().uuid(),
    userId: z.string().uuid(),
    resultText: z.string(),
    promptText: z.string(),
  });

  const { audioId, resultText, userId, promptText } = bodySchema.parse(
    request.body
  );

  const audio = await prisma.audiohistory.findFirst({
    where: {
      audioId,
      userId,
      resultText,
    },
  });

  if (!audio) {
    await prisma.audiohistory.create({
      data: {
        audioId,
        userId,
        resultText,
        promptText,
      },
    });
  }

  return;
}
