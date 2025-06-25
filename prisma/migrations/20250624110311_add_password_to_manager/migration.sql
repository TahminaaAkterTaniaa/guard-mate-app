/*
  Warnings:

  - Added the required column `password` to the `Manager` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Manager" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profilePictureUrl" TEXT,
    "role" TEXT NOT NULL DEFAULT 'MANAGER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Manager_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Manager" ("companyId", "createdAt", "email", "id", "name", "phone", "profilePictureUrl", "role", "updatedAt") SELECT "companyId", "createdAt", "email", "id", "name", "phone", "profilePictureUrl", "role", "updatedAt" FROM "Manager";
DROP TABLE "Manager";
ALTER TABLE "new_Manager" RENAME TO "Manager";
CREATE UNIQUE INDEX "Manager_email_key" ON "Manager"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
