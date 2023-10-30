import { prisma } from "./../lib/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";

interface typeRes {
  videos: Prisma.VideohistoryGetPayload<{}>[] | null;
  websites: Prisma.WebsitehistoryGetPayload<{}>[] | null;
  audios: Prisma.AudiohistoryGetPayload<{}>[] | null;
  articles: Prisma.ArticlehistoryGetPayload<{}>[] | null;
}

export const getAILogsCompletion = async (app: FastifyInstance) => {
  app.post("/ai/complete/:type/log", async (request, reply) => {
    // @ts-expect-error
    const userId = request.userID;
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const paramsSchema = z.object({
      type: z.string(),
    });

    const { type } = paramsSchema.parse(request.params);

    let res: typeRes = {
      videos: [],
      websites: [],
      audios: [],
      articles: [],
    };

    if (type === "all") {
      res.videos = (await getLogFrom(
        "videos",
        userId
      )) as Prisma.VideohistoryGetPayload<{}>[];
      res.websites = (await getLogFrom(
        "websites",
        userId
      )) as Prisma.WebsitehistoryGetPayload<{}>[];
      res.articles = (await getLogFrom(
        "articles",
        userId
      )) as Prisma.ArticlehistoryGetPayload<{}>[];
      res.audios = (await getLogFrom(
        "audios",
        userId
      )) as Prisma.AudiohistoryGetPayload<{}>[];
      return res;
    }
    return res[type];
  });

  const getLogFrom = async (
    type: "videos" | "websites" | "audios" | "articles",
    userId: string
  ): Promise<
    | Prisma.VideohistoryGetPayload<{}>[]
    | Prisma.WebsitehistoryGetPayload<{}>[]
    | Prisma.ArticlehistoryGetPayload<{}>[]
    | Prisma.AudiohistoryGetPayload<{}>[]
    | null
  > => {
    let res:
      | Prisma.VideohistoryGetPayload<{}>[]
      | Prisma.WebsitehistoryGetPayload<{}>[]
      | Prisma.ArticlehistoryGetPayload<{}>[]
      | Prisma.AudiohistoryGetPayload<{}>[]
      | null = null;
    switch (type) {
      case "videos":
        res = await prisma.videohistory.findMany({
          where: {
            userId,
          },
        });
        break;
      case "websites":
        res = await prisma.websitehistory.findMany({
          where: {
            userId,
          },
        });
        break;
      case "audios":
        res = await prisma.audiohistory.findMany({
          where: {
            userId,
          },
        });
        break;
      case "articles":
        res = await prisma.articlehistory.findMany({
          where: {
            userId,
          },
          include: {
            article: true,
          },
        });
        break;
    }
    return res;
  };
};
