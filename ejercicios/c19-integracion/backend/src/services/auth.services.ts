import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";
import { JWT_SECRET, JWT_EXPIRES_IN, SALT_ROUNDS } from "../config/env";
import type { Registro, Login } from "../validations/auth.validation";
import type { PayloadToken, UsuarioPublico } from "../types/usuario.types";

export async function registrar(datos: Registro): Promise<UsuarioPublico> {
  const hash = await bcrypt.hash(datos.password, SALT_ROUNDS);
  return prisma.usuario.create({
    data:     { nombre: datos.nombre, email: datos.email, passwordHash: hash },
    select:   { id: true, email: true, nombre: true, rol: true },
  });
}

export async function findById(id: number): Promise<UsuarioPublico | null> {
  return prisma.usuario.findUnique({
    where: { id },
    select: { id: true, email: true, nombre: true, rol: true },
  });
}

export async function login(datos: Login): Promise<{ token: string; usuario: UsuarioPublico } | null> {
  const usuario = await prisma.usuario.findUnique({
    where: { email: datos.email },
    omit: { passwordHash: false },
  });
  if (!usuario) return null;

  const coincide = await bcrypt.compare(datos.password, usuario.passwordHash);
  if (!coincide) return null;

  const payLoad: PayloadToken = { id: usuario.id, rol: usuario.rol };
  const token = jwt.sign(payLoad, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  return {
    token,
    usuario: { id: usuario.id, email: datos.email, nombre: usuario.nombre, rol: usuario.rol },
  };
}