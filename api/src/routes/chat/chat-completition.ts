import { OpenAIStream, streamToResponse } from "ai";
import { openai, streamRes } from "../../lib/opeanai";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { ChatCompletionMessageParam } from "openai/resources/chat";

export const getAIChatCompleteRoute = async (app: FastifyInstance) => {
  app.post("/ai/chat/:type/complete", async (request, reply) => {
    // @ts-expect-error
    const userId = request.userID;
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const bodySchema = z.object({
      contentId: z.string().uuid(),
      prompt: z.string(),
      temperature: z.number().min(0).max(1).default(0.5),
    });

    const { contentId, prompt } = bodySchema.parse(request.body);

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

    let openaiMessages: ChatCompletionMessageParam[] = [];

    messages.forEach((message) => {
      if (message.resultText) {
        openaiMessages.push({
          role: "system",
          content: message.resultText,
        });
        openaiMessages.push({
          role: "user",
          content: message.promptText,
        });
      }
    });

    openaiMessages.push({
      role: "user",
      content:
        prompt +
        "''' Note: Forget the template that was defined in the start of the messages '''",
    });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k-0613",
      temperature: 0.5,
      messages: openaiMessages,
      max_tokens: 400,
      stream: true,
    });

    const stream = OpenAIStream(response);

    return streamRes(stream, reply);
  });
};
