-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Videohistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "promptText" TEXT,
    "resultText" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Videohistory_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Videohistory" ("id", "promptText", "resultText", "userId", "videoId") SELECT "id", "promptText", "resultText", "userId", "videoId" FROM "Videohistory";
DROP TABLE "Videohistory";
ALTER TABLE "new_Videohistory" RENAME TO "Videohistory";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
