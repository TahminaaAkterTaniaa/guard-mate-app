/*
  Warnings:

  - Made the column `email` on table `Guard` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profilePictureUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Guard_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Guard" ("companyId", "createdAt", "email", "id", "name", "password", "phone", "profilePictureUrl", "status", "updatedAt") SELECT "companyId", "createdAt", "email", "id", "name", "password", "phone", "profilePictureUrl", "status", "updatedAt" FROM "Guard";
DROP TABLE "Guard";
ALTER TABLE "new_Guard" RENAME TO "Guard";
CREATE UNIQUE INDEX "Guard_email_key" ON "Guard"("email");
CREATE UNIQUE INDEX "Guard_phone_key" ON "Guard"("phone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
