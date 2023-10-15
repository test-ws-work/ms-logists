/*
  Warnings:

  - Added the required column `customerType` to the `logists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "logists" ADD COLUMN     "customerType" TEXT NOT NULL;
