/*
  Warnings:

  - You are about to drop the column `userId` on the `Package` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `StoreBranch` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserPayment` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Package" DROP CONSTRAINT "Package_userId_fkey";

-- DropForeignKey
ALTER TABLE "StoreBranch" DROP CONSTRAINT "StoreBranch_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserPayment" DROP CONSTRAINT "UserPayment_userId_fkey";

-- AlterTable
ALTER TABLE "Package" DROP COLUMN "userId",
ADD COLUMN     "normalUserId" INTEGER;

-- AlterTable
ALTER TABLE "StoreBranch" DROP COLUMN "userId",
ADD COLUMN     "normalUserId" INTEGER;

-- AlterTable
ALTER TABLE "UserPayment" DROP COLUMN "userId",
ADD COLUMN     "normalUserId" INTEGER;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminUserLogin" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "logintime" TIMESTAMP(3) NOT NULL,
    "logouttime" TIMESTAMP(3),
    "cookie" TEXT NOT NULL,

    CONSTRAINT "AdminUserLogin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NormalUser" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "NormalUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NormalUserLogin" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "logintime" TIMESTAMP(3) NOT NULL,
    "logouttime" TIMESTAMP(3),
    "cookie" TEXT NOT NULL,

    CONSTRAINT "NormalUserLogin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CameraOperaation" (
    "id" SERIAL NOT NULL,
    "cameraID" INTEGER NOT NULL,
    "cameraOperaation" JSONB NOT NULL,
    "cameraOperationCondition" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CameraOperaation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "NormalUser_username_key" ON "NormalUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "NormalUser_email_key" ON "NormalUser"("email");

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_normalUserId_fkey" FOREIGN KEY ("normalUserId") REFERENCES "NormalUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPayment" ADD CONSTRAINT "UserPayment_normalUserId_fkey" FOREIGN KEY ("normalUserId") REFERENCES "NormalUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreBranch" ADD CONSTRAINT "StoreBranch_normalUserId_fkey" FOREIGN KEY ("normalUserId") REFERENCES "NormalUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CameraOperaation" ADD CONSTRAINT "CameraOperaation_cameraID_fkey" FOREIGN KEY ("cameraID") REFERENCES "Camera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
