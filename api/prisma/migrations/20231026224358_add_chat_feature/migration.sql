-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
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
