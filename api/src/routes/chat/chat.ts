import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export const getAIChatRoute = async (app: FastifyInstance) => {
  app.post("/ai/chat/:type", async (request, reply) => {
    const bodySchema = z.object({
      userId: z.string().uuid(),
      id: z.string().uuid(),
    });

    const { userId, id } = bodySchema.parse(request.body);

    const paramsSchema = z.object({
      type: z.enum(["article", "video", "website", "audio"]),
    });

    const { type } = paramsSchema.parse(request.params);

    let messages;

    switch (type) {
      case "article":
        messages = await prisma.message.findMany({
          where: {
            userId,
            id,
          },
          orderBy: {
            createdAt: "asc",
          },
        });
        break;
      case "video":
        messages = await prisma.message.findMany({
          where: {
            userId,
            id,
          },
          orderBy: {
            createdAt: "asc",
          },
        });
        break;
      case "website":
        messages = await prisma.message.findMany({
          where: {
            userId,
            id,
          },
          orderBy: {
            createdAt: "asc",
          },
        });
        break;
      case "audio":
        messages = await prisma.message.findMany({
          where: {
            userId,
            id,
          },
          orderBy: {
            createdAt: "asc",
          },
        });
        break;
    }
    return messages;
  });
};
