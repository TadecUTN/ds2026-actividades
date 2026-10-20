import { z } from "zod";

export const autorCreateSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es obligatorio").max(50),
  nacionalidad: z.string().trim().min(1).max(50).default("Desconocida"),
});

export const autorUpdateSchema = autorCreateSchema.partial();

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("El id debe ser un valor positivo"),
});

export type AutorCreate = z.infer<typeof autorCreateSchema>;