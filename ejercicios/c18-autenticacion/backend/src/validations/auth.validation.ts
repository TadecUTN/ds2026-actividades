import { z } from "zod";

const email = z.string().trim().toLowerCase().pipe(z.email("Email invalido"));

export const registroSchema = z.object({
  nombre:     z.string().trim().min(1, "El nombre es obligatorio").max(50),
  email,
  password:   z.string()
              .min(8, "La contraseña necesita al menos 8 caracteres")
              .regex(/[A-Z]/, "La contraseña debe tener al menos una mayuscula")
              .regex(/[0-9]/, "La contraseña debe tener al menos un numero"),
});

export const loginSchema = z.object({
  email,
  password:   z.string().min(1, "La contraseña es obligatoria"), // <-- No es necesario validad fortaleza
});

export type Registro = z.infer<typeof registroSchema>;
export type Login    = z.infer<typeof loginSchema>;