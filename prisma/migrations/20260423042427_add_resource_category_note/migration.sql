-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Resource" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT '节目时段广告',
    "channel" TEXT NOT NULL,
    "program" TEXT NOT NULL,
    "timeSlot" TEXT,
    "description" TEXT,
    "price" TEXT,
    "note" TEXT,
    "isHot" BOOLEAN NOT NULL DEFAULT false,
    "sort" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Resource" ("channel", "createdAt", "description", "id", "isHot", "name", "price", "program", "sort", "timeSlot", "updatedAt") SELECT "channel", "createdAt", "description", "id", "isHot", "name", "price", "program", "sort", "timeSlot", "updatedAt" FROM "Resource";
DROP TABLE "Resource";
ALTER TABLE "new_Resource" RENAME TO "Resource";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
