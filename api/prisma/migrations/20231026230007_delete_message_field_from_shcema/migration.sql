/*
  Warnings:

  - You are about to drop the column `message` on the `Message` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "promptText" TEXT,
    "resultText" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "articlehistoryId" TEXT,
    "websitehistoryId" TEXT,
    "videohistoryId" TEXT,
    "audiohistoryId" TEXT,
    CONSTRAINT "Message_articlehistoryId_fkey" FOREIGN KEY ("articlehistoryId") REFERENCES "Articlehistory" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Message_websitehistoryId_fkey" FOREIGN KEY ("websitehistoryId") REFERENCES "Websitehistory" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Message_videohistoryId_fkey" FOREIGN KEY ("videohistoryId") REFERENCES "Videohistory" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Message_audiohistoryId_fkey" FOREIGN KEY ("audiohistoryId") REFERENCES "Audiohistory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("articlehistoryId", "audiohistoryId", "createdAt", "id", "promptText", "resultText", "userId", "videohistoryId", "websitehistoryId") SELECT "articlehistoryId", "audiohistoryId", "createdAt", "id", "promptText", "resultText", "userId", "videohistoryId", "websitehistoryId" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
