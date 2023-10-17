/*
  Warnings:

  - You are about to drop the `VideoHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "VideoHistory";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Videohistory" (
    "userId" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "promptText" TEXT NOT NULL,
    "resultText" TEXT,

    PRIMARY KEY ("userId", "videoId"),
    CONSTRAINT "Videohistory_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
