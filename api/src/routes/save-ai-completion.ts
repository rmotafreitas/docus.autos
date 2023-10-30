import { FastifyInstance } from "fastify";
import { z } from "zod";
import { videoCompletionSave } from "./completion/save/video";
import { websiteCompletionSave } from "./completion/save/website";
import { articleCompletionSave } from "./completion/save/article";
import { audioCompletionSave } from "./completion/save/audio";

export const saveAIVideoCompletion = async (app: FastifyInstance) => {
  app.post("/ai/complete/:type/save", async (request, reply) => {
    // @ts-expect-error
    const userId = request.userID;
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const paramsSchema = z.object({
      type: z.string(),
    });

    const { type } = paramsSchema.parse(request.params);

    switch (type) {
      case "videos":
        return await videoCompletionSave(request, reply, userId);
      case "websites":
        return await websiteCompletionSave(request, reply, userId);
      case "articles":
        return await articleCompletionSave(request, reply, userId);
      case "audios":
        return await audioCompletionSave(request, reply, userId);
      default:
        return reply.status(400).send({ error: "Invalid type" });
    }
  });
};
