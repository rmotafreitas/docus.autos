import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export const getAllPromptsRoute = async (app: FastifyInstance) => {
  app.get("/prompts/:type", async (request, reply) => {
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
