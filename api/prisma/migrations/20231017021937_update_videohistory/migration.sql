/*
  Warnings:

  - You are about to drop the column `reusltText` on the `VideoHistory` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VideoHistory" (
    "userId" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "promptText" TEXT NOT NULL,
    "resultText" TEXT,

    PRIMARY KEY ("userId", "videoId"),
    CONSTRAINT "VideoHistory_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_VideoHistory" ("promptText", "userId", "videoId") SELECT "promptText", "userId", "videoId" FROM "VideoHistory";
DROP TABLE "VideoHistory";
ALTER TABLE "new_VideoHistory" RENAME TO "VideoHistory";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
