/*
  Warnings:

  - Added the required column `password` to the `Guard` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profilePictureUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Guard_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Guard" ("companyId", "createdAt", "email", "id", "name", "phone", "profilePictureUrl", "status", "updatedAt") SELECT "companyId", "createdAt", "email", "id", "name", "phone", "profilePictureUrl", "status", "updatedAt" FROM "Guard";
DROP TABLE "Guard";
ALTER TABLE "new_Guard" RENAME TO "Guard";
CREATE UNIQUE INDEX "Guard_phone_key" ON "Guard"("phone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
