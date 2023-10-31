import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export const getAICompletionHistoryRoute = async (app: FastifyInstance) => {
  app.get("/ai/complete/:type/:id", async (request, reply) => {
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
        return await prisma.videohistory.findUnique({
          where: {
            id,
          },
          include: {
            video: true,
          },
        });
      case "websites":
        return await prisma.websitehistory.findUnique({
          where: {
            id,
          },
          include: {
            website: true,
          },
        });
      case "articles":
        return await prisma.articlehistory.findUnique({
          where: {
            id,
          },
          include: {
            article: true,
          },
        });
      case "audios":
        return await prisma.audiohistory.findUnique({
          where: {
            id,
          },
          include: {
            audio: true,
          },
        });
      default:
        return reply.status(400).send({ error: "Invalid type" });
    }
  });
};
