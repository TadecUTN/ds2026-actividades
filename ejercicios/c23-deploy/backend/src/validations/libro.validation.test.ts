import { describe, it, expect } from "vitest";
import { libroCreateSchema, idParamSchema } from "./libro.validation";

const libroValido = { titulo: "Rayuela", precio: 2000, imagen: "img", autorId: 1 };

describe("libroCreateSchema", () => {
  it("rechaza precio negativo", () => {
    const r = libroCreateSchema.safeParse({ ...libroValido, precio: -5 });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues[0].path).toEqual(["precio"]);
  });
  it("recorta espacios del titulo", () => {
    const r = libroCreateSchema.safeParse({ ...libroValido, titulo: " Rayuela "});
    if (r.success) expect(r.data.titulo).toBe("Rayuela");
  });
});

describe("idParamSchema", () => {
  it("convierte string a number", () => {
    const r = idParamSchema.safeParse({ ...libroValido, id:"42" });
    if (r.success) expect(r.data.id).toBe(42);
  });
});