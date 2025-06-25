-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "logoUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Guard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profilePictureUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Guard_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Manager" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profilePictureUrl" TEXT,
    "role" TEXT NOT NULL DEFAULT 'MANAGER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Manager_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Site" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" REAL,
    "longitude" REAL,
    "qrCodeUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "managerId" TEXT,
    CONSTRAINT "Site_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Site_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Deployment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "guardId" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'SCHEDULED',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Deployment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Deployment_guardId_fkey" FOREIGN KEY ("guardId") REFERENCES "Guard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Deployment_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CheckIn" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "guardId" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "checkInTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkOutTime" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'CHECKED_IN',
    "faceMatchScore" REAL,
    "latitude" REAL,
    "longitude" REAL,
    "qrCodeVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CheckIn_guardId_fkey" FOREIGN KEY ("guardId") REFERENCES "Guard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CheckIn_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Incident" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "guardId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "severity" TEXT NOT NULL DEFAULT 'LOW',
    "status" TEXT NOT NULL DEFAULT 'REPORTED',
    "imageUrls" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "managerId" TEXT,
    CONSTRAINT "Incident_guardId_fkey" FOREIGN KEY ("guardId") REFERENCES "Guard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Incident_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Leave" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "guardId" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "reason" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "documentUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "managerId" TEXT,
    CONSTRAINT "Leave_guardId_fkey" FOREIGN KEY ("guardId") REFERENCES "Guard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Leave_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Guard_phone_key" ON "Guard"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Manager_email_key" ON "Manager"("email");
