/*
  Warnings:

  - You are about to drop the `PrompTypes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `typeId` on the `Prompt` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "PrompTypes_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PrompTypes";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Prompt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "template" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'video'
);
INSERT INTO "new_Prompt" ("id", "template", "title") SELECT "id", "template", "title" FROM "Prompt";
DROP TABLE "Prompt";
ALTER TABLE "new_Prompt" RENAME TO "Prompt";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
