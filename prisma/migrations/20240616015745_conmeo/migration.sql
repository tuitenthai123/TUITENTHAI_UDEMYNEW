/*
  Warnings:

  - Added the required column `userId` to the `code` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "code" ADD COLUMN     "userId" TEXT NOT NULL;
