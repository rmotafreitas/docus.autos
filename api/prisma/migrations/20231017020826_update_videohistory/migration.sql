-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VideoHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "promptText" TEXT NOT NULL,
    "reusltText" TEXT,
    CONSTRAINT "VideoHistory_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_VideoHistory" ("id", "promptText", "reusltText", "userId", "videoId") SELECT "id", "promptText", "reusltText", "userId", "videoId" FROM "VideoHistory";
DROP TABLE "VideoHistory";
ALTER TABLE "new_VideoHistory" RENAME TO "VideoHistory";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
