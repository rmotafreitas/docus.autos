import { FastifyInstance } from "fastify";
import { z } from "zod";

import { getInfo, chooseFormat } from "ytdl-core";

export const getYTVideoInfoRoute = async (app: FastifyInstance) => {
  app.post("/videos/yt", async (request, reply) => {
    console.log("request.body", request.body);
    const { url } = z
      .object({
        url: z.string().url(),
      })
      .parse(request.body);

    if (!url || !url.includes("youtube.com")) {
      return reply.status(400).send({ error: "Invalid URL" });
    }

    const info = await getInfo(url, {
      requestOptions: {
        maxRetries: 5,
        backoff: { inc: 2000, max: 2000 },
      },
    });

    if (!info) {
      return reply.status(400).send({ error: "Invalid URL" });
    }

    const audioFile = chooseFormat(info.formats, {
      filter: "audioonly",
      quality: "lowestaudio",
    });

    const res = {
      audioFileURL: audioFile?.url || "404",
      title: info.videoDetails.title,
      thumbnail:
        info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1]
          .url,
    };

    return res;
  });
};
