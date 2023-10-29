import { FastifyInstance } from "fastify";
import { z } from "zod";
import { videoCompletionSave } from "./completion/save/video";
import { websiteCompletionSave } from "./completion/save/website";
import { articleCompletionSave } from "./completion/save/article";
import { audioCompletionSave } from "./completion/save/audio";

export const saveAIVideoCompletion = async (app: FastifyInstance) => {
  app.post("/ai/complete/:type/save", async (request, reply) => {
    const paramsSchema = z.object({
      type: z.string(),
    });

    const { type } = paramsSchema.parse(request.params);

    switch (type) {
      case "videos":
        return await videoCompletionSave(request, reply);
      case "websites":
        return await websiteCompletionSave(request, reply);
      case "articles":
        return await articleCompletionSave(request, reply);
      case "audios":
        return await audioCompletionSave(request, reply);
      default:
        return reply.status(400).send({ error: "Invalid type" });
    }
  });
};
