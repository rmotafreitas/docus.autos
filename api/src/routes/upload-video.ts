import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { fastifyMultipart } from "@fastify/multipart";

import path from "node:path";
import fs from "node:fs";
import { promisify } from "node:util";
import { pipeline } from "node:stream";
import { randomUUID } from "node:crypto";

const pump = promisify(pipeline);

export const uploadVideoRoute = async (app: FastifyInstance) => {
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 1_048_556 * 25, // 25MB
    },
  });
  app.post("/videos", async (request, reply) => {
    // @ts-expect-error
    const userId = request.userID;
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const data = await request.file();

    if (!data) {
      return reply.status(400).send({ error: "No file uploaded" });
    }

    const extension = path.extname(data.filename);

    if (extension !== ".mp3") {
      return reply
        .status(400)
        .send({ error: "Invalid file type, only (.mp3)" });
    }

    const fileBaseName = path.basename(data.filename, extension);
    const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`;

    const uploadDir = path.resolve(
      __dirname,
      "..",
      "..",
      "tmp",
      fileUploadName
    );

    await pump(data.file, fs.createWriteStream(uploadDir));

    const video = await prisma.video.create({
      data: {
        name: fileBaseName + ".mp4",
        path: uploadDir,
      },
    });

    return reply.send({ video });
  });
};
