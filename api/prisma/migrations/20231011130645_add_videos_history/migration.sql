-- CreateTable
CREATE TABLE "VideoHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "promptText" TEXT NOT NULL,
    "reusltText" TEXT NOT NULL,
    CONSTRAINT "VideoHistory_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
