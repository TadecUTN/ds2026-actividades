import { describe, it, expect, vi } from "vitest";
import { findAll } from "./libro.services";
import { prisma } from "../config/prisma";

vi.mock("../config/prisma", () => ({
  prisma: {
    libro: {
      findMany: vi.fn(),
    },
  },
}));

describe("libroService.findAll con Prisma mockeado (sin DB)", () => {
  it("devuelve los libros y llama a prisma.libro.findMany con filtro", async () => {
    const librosMock = [
      { id: 1, titulo: "Rayuela", precio: 7000, disponible: true, autor: { nombre: "Cortázar" }, categorias: [] },
      { id: 2, titulo: "Ficciones", precio: 6500, disponible: true, autor: { nombre: "Borges" }, categorias: [] },
    ];

    vi.mocked(prisma.libro.findMany).mockResolvedValue(librosMock as any);

    const resultado = await findAll(true);

    expect(prisma.libro.findMany).toHaveBeenCalledWith({
      where: { disponible: true },
      include: { autor: true, categorias: true },
    });
    expect(resultado).toEqual(librosMock);
  });
});
