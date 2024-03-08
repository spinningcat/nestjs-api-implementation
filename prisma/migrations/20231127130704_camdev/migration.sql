/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `firstname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Camera" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "store_branch_id" INTEGER NOT NULL,
    "camera_name" TEXT NOT NULL,
    "storeBranchId" INTEGER,

    CONSTRAINT "Camera_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Package" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "package_name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "cam_size" INTEGER NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPayment" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "payment_method" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "UserPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonCount" (
    "id" SERIAL NOT NULL,
    "personCount" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,
    "processID" INTEGER NOT NULL,
    "ageID" INTEGER NOT NULL,
    "genderID" INTEGER NOT NULL,

    CONSTRAINT "PersonCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreBranch" (
    "id" SERIAL NOT NULL,
    "store_name" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,
    "packageID" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "packageId" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "StoreBranch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gender" (
    "id" SERIAL NOT NULL,
    "personID_" INTEGER NOT NULL,

    CONSTRAINT "Gender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Age" (
    "id" SERIAL NOT NULL,
    "personID_" INTEGER NOT NULL,

    CONSTRAINT "Age_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Process" (
    "id" SERIAL NOT NULL,
    "cameraID" INTEGER NOT NULL,
    "process_name" TEXT NOT NULL,
    "operation_name" TEXT NOT NULL,
    "cameraId" INTEGER,

    CONSTRAINT "Process_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Camera_url_key" ON "Camera"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Camera_camera_name_key" ON "Camera"("camera_name");

-- CreateIndex
CREATE UNIQUE INDEX "Package_package_name_key" ON "Package"("package_name");

-- CreateIndex
CREATE UNIQUE INDEX "PersonCount_personCount_key" ON "PersonCount"("personCount");

-- CreateIndex
CREATE UNIQUE INDEX "StoreBranch_store_name_key" ON "StoreBranch"("store_name");

-- CreateIndex
CREATE UNIQUE INDEX "Gender_personID__key" ON "Gender"("personID_");

-- CreateIndex
CREATE UNIQUE INDEX "Age_personID__key" ON "Age"("personID_");

-- AddForeignKey
ALTER TABLE "Camera" ADD CONSTRAINT "Camera_storeBranchId_fkey" FOREIGN KEY ("storeBranchId") REFERENCES "StoreBranch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPayment" ADD CONSTRAINT "UserPayment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreBranch" ADD CONSTRAINT "StoreBranch_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreBranch" ADD CONSTRAINT "StoreBranch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Process" ADD CONSTRAINT "Process_cameraId_fkey" FOREIGN KEY ("cameraId") REFERENCES "Camera"("id") ON DELETE SET NULL ON UPDATE CASCADE;
