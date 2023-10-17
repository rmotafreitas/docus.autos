/*
  Warnings:

  - The primary key for the `VideoHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `VideoHistory` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VideoHistory" (
    "userId" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "promptText" TEXT NOT NULL,
    "reusltText" TEXT,

    PRIMARY KEY ("userId", "videoId"),
    CONSTRAINT "VideoHistory_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_VideoHistory" ("promptText", "reusltText", "userId", "videoId") SELECT "promptText", "reusltText", "userId", "videoId" FROM "VideoHistory";
DROP TABLE "VideoHistory";
ALTER TABLE "new_VideoHistory" RENAME TO "VideoHistory";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
