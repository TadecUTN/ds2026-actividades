// Este archivo contiene tests que requieren la base de datos de Docker corriendo con seed
import { prisma } from "../config/prisma";
import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";
import app from "../app";

afterAll(() => prisma.$disconnect()); // cerrar la conexión al terminar

describe("rutas de auth con DB", () => {
  it("credenciales del seed → 200 con token y usuario sin passwordHash", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "cliente@libreria.test", password: "Cliente1234" });

    expect(res.status).toBe(200);
    expect(res.body.token).toEqual(expect.any(String));
    expect(res.body.usuario).toMatchObject({
      email: "cliente@libreria.test",
      rol: "CLIENTE",
    });
    expect(res.body.usuario).not.toHaveProperty("passwordHash");
  });

  it("mail que no existe → el MISMO 401 (no revela si el mail existe)", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "nadie@libreria.test", password: "Cliente1234" });

    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Credenciales inválidas" });
  });
});
