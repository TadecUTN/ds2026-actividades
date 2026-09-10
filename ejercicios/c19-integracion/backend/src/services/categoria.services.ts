import { prisma } from "../config/prisma";
import { Categoria } from "../types/categoria.types";

export async function findAll(): Promise<Categoria[]> {
  return prisma.categoria.findMany({
    orderBy: { nombre: "asc" },
  });
}
