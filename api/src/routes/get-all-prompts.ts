import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import * as jose from "jose";

export const getAllPromptsRoute = async (app: FastifyInstance) => {
  app.get("/prompts/:type", async (request, reply) => {
    // @ts-expect-error
    const userId = request.userID;
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const paramsSchema = z.object({
      type: z.string(),
    });

    const { type } = paramsSchema.parse(request.params);

    const prompts = await prisma.prompt.findMany({
      where: {
        type,
      },
    });

    return prompts;
  });
};
