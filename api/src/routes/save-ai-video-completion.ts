import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export const saveAIVideoCompletion = async (app: FastifyInstance) => {
  app.post("/ai/complete/videos/save", async (request, reply) => {
    const bodySchema = z.object({
      videoId: z.string().uuid(),
      userId: z.string().uuid(),
      resultText: z.string(),
    });

    const { videoId, resultText, userId } = bodySchema.parse(request.body);

    const video = await prisma.videohistory.findUniqueOrThrow({
      where: {
        userId_videoId: {
          userId,
          videoId,
        },
      },
    });

    if (!video) {
      return reply.status(400).send({ error: "Result not generated yet" });
    }

    const res = await prisma.videohistory.update({
      where: {
        userId_videoId: {
          userId,
          videoId,
        },
      },
      data: {
        resultText,
      },
    });

    return res;
  });
};
