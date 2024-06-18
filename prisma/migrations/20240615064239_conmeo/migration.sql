/*
  Warnings:

  - You are about to drop the column `inproess` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "inproess",
ADD COLUMN     "hoanthanhchuong" TEXT[] DEFAULT ARRAY['0', '0', '0', '0', '0', '0']::TEXT[],
ADD COLUMN     "hoanthanhkhoa" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Course";

-- CreateTable
CREATE TABLE "khoahoc" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "khoahoc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" TEXT NOT NULL,
    "tenchuong" TEXT NOT NULL DEFAULT '',
    "sumbaitap" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lythuyet" TEXT NOT NULL DEFAULT 'nội dung trống',

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Baitap" (
    "id" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "debai" TEXT NOT NULL,
    "codemau" TEXT NOT NULL,

    CONSTRAINT "Baitap_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Baitap" ADD CONSTRAINT "Baitap_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
