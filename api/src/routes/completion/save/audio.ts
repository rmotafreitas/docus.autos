import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function audioCompletionSave(
  request: FastifyRequest,
  reply: FastifyReply,
  userId: string
) {
  const bodySchema = z.object({
    audioId: z.string().uuid(),
    resultText: z.string(),
    promptText: z.string(),
  });

  const { audioId, resultText, promptText } = bodySchema.parse(request.body);

  const audio = await prisma.audiohistory.findFirst({
    where: {
      audioId,
      userId,
      resultText,
    },
  });

  if (!audio) {
    const res = await prisma.audiohistory.create({
      data: {
        audioId,
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
