import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// El adapter es el driver: el que realmente habla TCP con PostgreSQL.
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

export const prisma = new PrismaClient({
  adapter,
  omit: { usuario: { passwordHash:true } },
})