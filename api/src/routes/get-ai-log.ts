import { prisma } from "./../lib/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";

export const getAILogsCompletion = async (app: FastifyInstance) => {
  app.post("/ai/complete/:type/log", async (request, reply) => {
    const paramsSchema = z.object({
      type: z.string(),
    });

    const { type } = paramsSchema.parse(request.params);

    const bodySchema = z.object({
      userId: z.string().uuid(),
      contentId: z.string().uuid().optional(),
    });

    const { userId, contentId } = bodySchema.parse(request.body);

    const res: {
      videos: Prisma.VideohistoryGetPayload<{}>[] | null;
      websites: any[] | null;
      audios: any[] | null;
      files: any[] | null;
    } = {
      videos: [],
      websites: [],
      audios: [],
      files: [],
    };

    if (type === "all") {
      res.videos = await getLogFrom("videos", userId);
      res.websites = await getLogFrom("websites", userId);
      res.audios = await getLogFrom("audios", userId);
      res.files = await getLogFrom("files", userId);
      return res;
    }
    return res[type];
  });

  const getLogFrom = async (type, userId) => {
    let res: Prisma.VideohistoryGetPayload<{}>[] | null = null;
    switch (type) {
      case "videos":
        res = await prisma.videohistory.findMany({
          where: {
            userId,
          },
        });
        break;
      case "websites":
        break;
      case "audios":
        break;
      case "files":
        break;
    }
    return res;
  };
};
