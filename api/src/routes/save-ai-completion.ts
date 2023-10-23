import { FastifyInstance } from "fastify";
import { z } from "zod";
import { videoCompletionSave } from "./completion/save/video";

export const saveAIVideoCompletion = async (app: FastifyInstance) => {
  app.post("/ai/complete/:type/save", async (request, reply) => {
    const paramsSchema = z.object({
      type: z.string(),
    });

    const { type } = paramsSchema.parse(request.params);

    switch (type) {
      case "videos":
        await videoCompletionSave(request, reply);
        break;
      default:
        return reply.status(400).send({ error: "Invalid type" });
    }
  });
};
