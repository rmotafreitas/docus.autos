import { FastifyInstance } from "fastify";
import { z } from "zod";

import ytdl from "@distube/ytdl-core";

import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { prisma } from "../lib/prisma";
import { pipeline } from "node:stream/promises";

export const downloadYtAudioRoute = async (app: FastifyInstance) => {
  app.post("/videos/yt/download", async (request, reply) => {
    // @ts-expect-error
    const userID = request.userID;
    if (!userID) {
      throw new Error("Not authenticated");
    }

    const { url } = z
      .object({
        url: z.string().url(),
      })
      .parse(request.body);

    if (!url) return;

    const extension = path.extname("audio.mp3");
    const fileBaseName = path.basename("output-yt", extension);
    const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`;
    const uploadDir = path.resolve(
      __dirname,
      "..",
      "..",
      "tmp",
      fileUploadName
    );

    try {
      const info = await ytdl.getInfo(url);
      const seconds = info.videoDetails.lengthSeconds;

      if (+seconds > 60 * 15) {
        return reply.status(400).send({ error: "Video too long, max 15min" });
      }

      try {
        await pipeline(
          ytdl(url, { quality: "lowest", filter: "audioonly" }),
          fs.createWriteStream(uploadDir)
        );
      } catch (error) {
        reply
          .status(400)
          .send({ error: "An error occurred while downloading the video." });
        return;
      }

      const video = await prisma.video.create({
        data: {
          name: url,
          path: uploadDir,
        },
      });

      return reply.status(200).send({ video });
    } catch (error) {
      reply
        .status(400)
        .send({ error: "An error occurred while downloading the video." });
    }
  });
};
