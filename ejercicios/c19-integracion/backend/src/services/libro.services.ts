import { prisma } from "../config/prisma";
import { Libro, Prisma } from "../generated/prisma/client";

export type LibroConAutor = Prisma.LibroGetPayload<{ include: { autor: true } }>;
export type LibroDetalle = Prisma.LibroGetPayload<{
  include: { autor: true; categorias: true }
}>;

export async function findAll(disponible?: boolean): Promise<LibroConAutor[]> {
  return prisma.libro.findMany({ 
    where: { disponible },
    include: { autor: true } 
  });
}

export async function findById(id: number): Promise<LibroDetalle | null> {
  return prisma.libro.findUnique({
    where: { id },
    include: { autor: true, categorias: true }
  });
}

export async function create(datos: Omit<Libro, "id">): Promise<LibroConAutor> {
  return prisma.libro.create({ 
    data: datos,
    include: { autor: true }
  });
}

export async function update(id: number, datos: Omit<Libro, "id">): Promise<LibroConAutor> {
  return prisma.libro.update({ 
    where: { id }, 
    data: datos,
    include: { autor: true }
  });
}

export async function remove(id: number): Promise<void> {
  await prisma.libro.delete({ where: { id } });
}