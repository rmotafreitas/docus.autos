import { FastifyInstance } from "fastify";
import { z } from "zod";
import { videoCompletion } from "./completion/gen/video";
import { websiteCompletion } from "./completion/gen/website";
import { articleCompletion } from "./completion/gen/article";

export const generateAICompletionRoute = async (app: FastifyInstance) => {
  app.post("/ai/complete/:type", async (request, reply) => {
    const paramsSchema = z.object({
      type: z.string(),
    });

    const { type } = paramsSchema.parse(request.params);

    switch (type) {
      case "videos":
        await videoCompletion(request, reply);
        break;
      case "websites":
        await websiteCompletion(request, reply);
        break;
      case "articles":
        await articleCompletion(request, reply);
        break;
      default:
        return reply.status(400).send({ error: "Invalid type" });
    }
  });
};
