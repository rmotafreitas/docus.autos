import { OpenAIStream, streamToResponse } from "ai";
import { openai } from "../../lib/opeanai";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { ChatCompletionMessageParam } from "openai/resources/chat";

export const getAIChatSaveRoute = async (app: FastifyInstance) => {
  app.post("/ai/chat/:type/save", async (request, reply) => {
    // @ts-expect-error
    const userId = request.userID;
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const bodySchema = z.object({
      contentId: z.string(),
      promptText: z.string(),
      resultText: z.string(),
    });

    const { contentId, promptText, resultText } = bodySchema.parse(
      request.body
    );

    const paramsSchema = z.object({
      type: z.enum(["article", "video", "website", "audio"]),
    });

    const { type } = paramsSchema.parse(request.params);

    let messages;

    switch (type) {
      case "article":
        await prisma.message.create({
          data: {
            userId,
            articlehistoryId: contentId,
            promptText,
            resultText,
          },
        });
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
        await prisma.message.create({
          data: {
            userId,
            videohistoryId: contentId,
            promptText,
            resultText,
          },
        });
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
        await prisma.message.create({
          data: {
            userId,
            websitehistoryId: contentId,
            promptText,
            resultText,
          },
        });
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
        await prisma.message.create({
          data: {
            userId,
            audiohistoryId: contentId,
            promptText,
            resultText,
          },
        });
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
