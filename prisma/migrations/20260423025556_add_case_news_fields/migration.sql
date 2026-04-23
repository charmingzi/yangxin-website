-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Case" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT '其他',
    "tags" TEXT,
    "channel" TEXT,
    "year" TEXT,
    "description" TEXT,
    "cover" TEXT,
    "videoUrl" TEXT,
    "content" TEXT,
    "color" TEXT NOT NULL DEFAULT '#1B5FBE',
    "sort" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Case" ("content", "cover", "createdAt", "description", "id", "sort", "title", "updatedAt", "videoUrl") SELECT "content", "cover", "createdAt", "description", "id", "sort", "title", "updatedAt", "videoUrl" FROM "Case";
DROP TABLE "Case";
ALTER TABLE "new_Case" RENAME TO "Case";
CREATE TABLE "new_News" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "cover" TEXT,
    "source" TEXT,
    "type" TEXT NOT NULL DEFAULT 'industry',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_News" ("content", "cover", "createdAt", "id", "source", "title", "updatedAt") SELECT "content", "cover", "createdAt", "id", "source", "title", "updatedAt" FROM "News";
DROP TABLE "News";
ALTER TABLE "new_News" RENAME TO "News";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
