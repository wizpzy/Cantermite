import { PrismaClient } from "@/../generated/prisma/index.js";
// import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma;
}

export default prisma;