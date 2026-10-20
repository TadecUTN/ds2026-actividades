import { email, success } from "zod";
import { loginSchema, registroSchema } from "./auth.validation";
import { describe, it, expect } from "vitest";

describe("loginSchema", () => {
  it("normaliza el email: saca espacios y pasa a minusculas", () => {
    const r = loginSchema.safeParse({ email: " Admin@Libreria.TESt ", password: "p" });
    expect(r.success).toEqual(true);
    if (r.success) expect(r.data.email).toBe("admin@libreria.test");
  });
});

describe("registroSchema", () => {
  it("una contraseña debil acumula los 3 errores", () => {
    const r = registroSchema.safeParse({ nombre: "pepe", email: "pepe@libreria.test", password: "corta" });
    if (!r.success) expect(r.error.issues.map(i => i.message)).toHaveLength(3);
  });
});