import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export const getAIChatRoute = async (app: FastifyInstance) => {
  app.post("/ai/chat/:type", async (request, reply) => {
    // @ts-expect-error
    const userId = request.userID;
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const bodySchema = z.object({
      contentId: z.string().uuid(),
    });

    const { contentId } = bodySchema.parse(request.body);

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
            articlehistoryId: contentId,
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
            videohistoryId: contentId,
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
            websitehistoryId: contentId,
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
            audiohistoryId: contentId,
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
