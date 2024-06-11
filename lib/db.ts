import { PrismaClient } from "@prisma/client";

declare global {
  var conmeo: PrismaClient | undefined;
};

export const db = globalThis.conmeo || new PrismaClient();

globalThis.conmeo = db;
