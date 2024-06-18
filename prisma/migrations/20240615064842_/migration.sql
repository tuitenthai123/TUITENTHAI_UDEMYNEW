-- CreateTable
CREATE TABLE "code" (
    "id" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "baiId" TEXT NOT NULL,
    "codeuser" TEXT NOT NULL DEFAULT '',
    "gemini" TEXT NOT NULL DEFAULT '',
    "checkcode" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "code_pkey" PRIMARY KEY ("id")
);
