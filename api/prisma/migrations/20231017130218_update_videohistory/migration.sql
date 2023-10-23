/*
  Warnings:

  - The primary key for the `Videohistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `Videohistory` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Videohistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "promptText" TEXT NOT NULL,
    "resultText" TEXT,
    CONSTRAINT "Videohistory_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Videohistory" ("promptText", "resultText", "userId", "videoId") SELECT "promptText", "resultText", "userId", "videoId" FROM "Videohistory";
DROP TABLE "Videohistory";
ALTER TABLE "new_Videohistory" RENAME TO "Videohistory";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
