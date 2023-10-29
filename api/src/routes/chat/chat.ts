import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export const getAIChatRoute = async (app: FastifyInstance) => {
  app.post("/ai/chat/:type", async (request, reply) => {
    const bodySchema = z.object({
      userId: z.string().uuid(),
      contentId: z.string().uuid(),
    });

    const { userId, contentId } = bodySchema.parse(request.body);

    const paramsSchema = z.object({
      type: z.enum(["article", "video"]),
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
    }
    return messages;
  });
};
