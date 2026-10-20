import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";
import { JWT_SECRET } from "../config/env";
import { describe, it, expect } from "vitest";

const libroNuevo = { titulo: "Bestiario", precio: 9000, imagen: "https://img/r.jpg", autorId: 1 };

const tokenCliente = jwt.sign({ id: 2, rol: "CLIENTE" }, JWT_SECRET, { expiresIn: "1h" });
const tokenAdmin   = jwt.sign({ id: 1, rol: "ADMIN" },   JWT_SECRET, { expiresIn: "1h" });

describe("matriz de permisos sin DB (libro.routes)", () => {
  it("POST /api/libros sin token → 401 'Falta el token'", async () => {
    const res = await request(app).post("/api/libros").send(libroNuevo);
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Falta el token" });
  });

  it("POST /api/libros con token de CLIENTE → 403", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenCliente}`)
      .send(libroNuevo);
    expect(res.status).toBe(403);
  });

  it("POST /api/libros ADMIN con body inválido → 400, no 403", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({ precio: -5 });
    expect(res.status).toBe(400);
    expect(res.body.detalles).toContainEqual({
      campo: "precio",
      mensaje: "El precio debe ser mayor a 0",
    });
  });

  it("POST /api/libros con token adulterado → 401 'Token invalido'", async () => {
    const tokenInvalido = jwt.sign({ id: 1, rol: "ADMIN" }, "otro-secret", { expiresIn: "1h" });
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenInvalido}`)
      .send(libroNuevo);
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Token invalido" });
  });

  it("DELETE /api/libros/1 con token de CLIENTE → 403", async () => {
    const res = await request(app)
      .delete("/api/libros/1")
      .set("Authorization", `Bearer ${tokenCliente}`);
    expect(res.status).toBe(403);
  });

  it("GET /api/no-existe → 404", async () => {
    const res = await request(app).get("/api/no-existe");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Ruta no encontrada" });
  });
});
