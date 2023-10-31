import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export const deleteAICompletionHistoryRoute = async (app: FastifyInstance) => {
  app.delete("/ai/complete/:type/:id", async (request, reply) => {
    // @ts-expect-error
    const userId = request.userID;
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const paramsSchema = z.object({
      type: z.string(),
      id: z.string(),
    });

    const { type, id } = paramsSchema.parse(request.params);

    switch (type) {
      case "videos":
        return await prisma.videohistory.delete({
          where: {
            id,
          },
        });
      case "websites":
        return await prisma.websitehistory.delete({
          where: {
            id,
          },
        });
      case "articles":
        return await prisma.articlehistory.delete({
          where: {
            id,
          },
        });
      case "audios":
        return await prisma.audiohistory.delete({
          where: {
            id,
          },
        });
      default:
        return reply.status(400).send({ error: "Invalid type" });
    }
  });
};
