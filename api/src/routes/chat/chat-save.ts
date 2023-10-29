import { OpenAIStream, streamToResponse } from "ai";
import { openai } from "../../lib/opeanai";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { ChatCompletionMessageParam } from "openai/resources/chat";

export const getAIChatSaveRoute = async (app: FastifyInstance) => {
  app.post("/ai/chat/:type/save", async (request, reply) => {
    const bodySchema = z.object({
      userId: z.string().uuid(),
      id: z.string().uuid(),
      promptText: z.string(),
      resultText: z.string(),
    });

    const { userId, id, promptText, resultText } = bodySchema.parse(
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
            id,
            promptText,
            resultText,
          },
        });
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
        await prisma.message.create({
          data: {
            userId,
            id,
            promptText,
            resultText,
          },
        });
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
        await prisma.message.create({
          data: {
            userId,
            id,
            promptText,
            resultText,
          },
        });
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
        await prisma.message.create({
          data: {
            userId,
            id,
            promptText,
            resultText,
          },
        });
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
