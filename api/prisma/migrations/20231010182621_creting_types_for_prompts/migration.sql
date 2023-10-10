/*
  Warnings:

  - Added the required column `typeId` to the `Prompt` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "PrompTypes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Prompt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "template" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    CONSTRAINT "Prompt_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "PrompTypes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Prompt" ("id", "template", "title") SELECT "id", "template", "title" FROM "Prompt";
DROP TABLE "Prompt";
ALTER TABLE "new_Prompt" RENAME TO "Prompt";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "PrompTypes_name_key" ON "PrompTypes"("name");
