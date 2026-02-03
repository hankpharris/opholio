import { prisma as dbPrisma, PrismaClient } from "database";

const prisma: PrismaClient = dbPrisma;

export { prisma };
