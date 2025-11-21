import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;

if (!url) {
    throw new Error("Missing DATABASE_URL or TURSO_DATABASE_URL");
}

const libsql = createClient({
    url,
    authToken: process.env.TURSO_AUTH_TOKEN, // Optional, for Turso
});

const adapter = new PrismaLibSql(libsql as any);

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        adapter,
        log: ["query"],
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
