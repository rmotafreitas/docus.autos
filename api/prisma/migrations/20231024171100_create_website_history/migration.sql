-- CreateTable
CREATE TABLE "Websitehistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "websiteUrl" TEXT NOT NULL,
    "promptText" TEXT,
    "resultText" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Websitehistory_websiteUrl_fkey" FOREIGN KEY ("websiteUrl") REFERENCES "Website" ("url") ON DELETE RESTRICT ON UPDATE CASCADE
);
