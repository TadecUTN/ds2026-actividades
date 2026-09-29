import { prisma } from "../config/prisma";
import { Libro, Prisma } from "../generated/prisma/client";

export type LibroConAutor = Prisma.LibroGetPayload<{
  include: { autor: true; categorias: true };
}>;
export type LibroDetalle = Prisma.LibroGetPayload<{
  include: { autor: true; categorias: true };
}>;

export async function findAll(disponible?: boolean): Promise<LibroConAutor[]> {
  return prisma.libro.findMany({ 
    where: { disponible },
    include: { autor: true, categorias: true } 
  });
}

export async function findById(id: number): Promise<LibroDetalle | null> {
  return prisma.libro.findUnique({
    where: { id },
    include: { autor: true, categorias: true }
  });
}

const DEFAULT_IMAGEN = "https://placehold.co/300x400?text=Lectura+Inteligente";

export interface CrearLibroInput {
  titulo: string;
  precio: number;
  imagen?: string | null;
  disponible?: boolean;
  autorId: number;
  categorias?: string[];
  categoria?: string;
}

export async function create(datos: CrearLibroInput): Promise<LibroConAutor> {
  const nombresCategorias: string[] = [];

  if (Array.isArray(datos.categorias)) {
    for (const cat of datos.categorias) {
      const normalizado = typeof cat === "string" ? cat.trim() : "";
      if (normalizado && !nombresCategorias.includes(normalizado)) {
        nombresCategorias.push(normalizado);
      }
    }
  }

  if (typeof datos.categoria === "string" && datos.categoria.trim()) {
    const normalizado = datos.categoria.trim();
    if (!nombresCategorias.includes(normalizado)) {
      nombresCategorias.push(normalizado);
    }
  }

  const imagenFinal = datos.imagen && datos.imagen.trim() !== ""
    ? datos.imagen.trim()
    : DEFAULT_IMAGEN;

  const connectOrCreateCategorias = nombresCategorias.map((nombre) => ({
    where: { nombre },
    create: { nombre },
  }));

  return prisma.libro.create({
    data: {
      titulo: datos.titulo,
      precio: datos.precio,
      imagen: imagenFinal,
      disponible: datos.disponible ?? true,
      autor: {
        connect: { id: datos.autorId },
      },
      ...(connectOrCreateCategorias.length > 0
        ? {
            categorias: {
              connectOrCreate: connectOrCreateCategorias,
            },
          }
        : {}),
    },
    include: { autor: true, categorias: true },
  });
}

export async function update(id: number, datos: Omit<Libro, "id">): Promise<LibroConAutor> {
  return prisma.libro.update({ 
    where: { id }, 
    data: datos,
    include: { autor: true, categorias: true }
  });
}

export async function remove(id: number): Promise<void> {
  await prisma.libro.delete({ where: { id } });
}