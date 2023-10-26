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
        await videoCompletionSave(request, reply);
        break;
      case "websites":
        await websiteCompletionSave(request, reply);
      case "articles":
        await articleCompletionSave(request, reply);
        break;
      case "audios":
        await audioCompletionSave(request, reply);
        break;
      default:
        return reply.status(400).send({ error: "Invalid type" });
    }
  });
};
