import axios from "axios";
import { prisma } from "../lib/prisma";
import { load } from "cheerio";

import { FastifyInstance } from "fastify";
import { z } from "zod";

export const getWebsiteContentRoute = async (app: FastifyInstance) => {
  app.post("/websites", async (request, reply) => {
    // @ts-expect-error
    const userId = request.userID;
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const { url } = z
      .object({
        url: z.string().url(),
      })
      .parse(request.body);

    const info = await axios.get(url);
    const pageContent = info.data;
    const $ = load(pageContent);
    const textSelector = "p,li";
    let paragraphs: string = "";

    $(textSelector).each((index, element) => {
      const paragraphText = $(element).text();
      paragraphs += paragraphText.trim().replace(/[\t\n]/g, "");
    });

    if (!info) {
      return reply.status(400).send({ error: "Invalid URL" });
    }

    const existingWebsite = await prisma.website.findUnique({
      where: {
        url: url,
      },
    });
    let res;
    if (existingWebsite) {
      res = await prisma.website.update({
        where: {
          url: url,
        },
        data: {
          title: $("title").text(),
          content: paragraphs,
        },
      });
    } else {
      res = await prisma.website.create({
        data: {
          url: url,
          title: $("title").text(),
          content: paragraphs,
        },
      });
    }

    return res;
  });
};
