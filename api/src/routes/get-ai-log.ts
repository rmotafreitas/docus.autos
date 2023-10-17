import { FastifyInstance } from "fastify";
import { z } from "zod";

export const saveAIVideoCompletion = async (app: FastifyInstance) => {
  app.post("/ai/complete/:type/log", async (request, reply) => {
    const paramsSchema = z.object({
      type: z.string(),
      userId: z.string().uuid(),
      contentId: z.string().uuid().optional(),
    });

    const { type, userId } = paramsSchema.parse(request.params);

    const res = {
      videos: [],
      websites: [],
      audios: [],
      files: [],
    };

    switch (type) {
      case "all":
      case "videos":
        break;
      case "all":
      case "websites":
        break;
      case "all":
      case "audios":
        break;
      case "all":
      case "files":
        break;
      default:
        return reply.status(400).send({ error: "Invalid type" });
    }

    if (type === "all") {
      return res;
    }
    return res[type];
  });
};
