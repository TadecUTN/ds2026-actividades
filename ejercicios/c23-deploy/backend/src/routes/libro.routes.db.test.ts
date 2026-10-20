// Este archivo contiene tests que requieren la base de datos de Docker corriendo con seed
import { prisma } from "../config/prisma";
import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";
import { JWT_SECRET } from "../config/env";

const tokenAdmin = jwt.sign({ id: 1, rol: "ADMIN" }, JWT_SECRET, { expiresIn: "1h" });
let libroCreadoId: number | null = null;

afterAll(async () => {
  if (libroCreadoId) {
    await prisma.libro.delete({ where: { id: libroCreadoId } }).catch(() => {});
  }
  await prisma.$disconnect();
});

describe("rutas de libros con DB (libro.routes.db)", () => {
  it("GET /api/libros → 200 con autor anidado", async () => {
    const res = await request(app).get("/api/libros");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty("autor");
    expect(res.body[0].autor).toHaveProperty("nombre");
  });

  it("GET /api/libros?disponible=false → 200 filtrando libros no disponibles", async () => {
    const res = await request(app).get("/api/libros?disponible=false");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    for (const libro of res.body) {
      expect(libro.disponible).toBe(false);
    }
  });

  it("GET /api/libros/999999 → 404", async () => {
    const res = await request(app).get("/api/libros/999999");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Libro no encontrado" });
  });

  it("POST /api/libros como ADMIN → 201 y lo borra en afterAll", async () => {
    const nuevoLibro = {
      titulo: "Libro de Prueba C21",
      precio: 4999,
      imagen: "https://img.test/foto.jpg",
      disponible: true,
      autorId: 1,
    };

    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send(nuevoLibro);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.titulo).toBe("Libro de Prueba C21");
    libroCreadoId = res.body.id;
  });
});
