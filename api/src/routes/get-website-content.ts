import puppeteer from "puppeteer";
import axios from "axios";
import { prisma } from "../lib/prisma";
import { load } from "cheerio";

import { FastifyInstance } from "fastify";
import { z } from "zod";

export const getWebsiteContentRoute = async (app: FastifyInstance) => {
  app.post("/websites", async (request, reply) => {
    console.log("request.body", request.body);
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

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.goto(url, { waitUntil: "networkidle0" });
    const screenshot = "tmp/preview-" + Date.now() + ".jpg";
    await page.screenshot({
      path: screenshot,
    });
    await browser.close();

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
          image: screenshot,
          content: paragraphs,
        },
      });
    } else {
      res = await prisma.website.create({
        data: {
          url: url,
          title: $("title").text(),
          image: screenshot,
          content: paragraphs,
        },
      });
    }

    return res;
  });
};
