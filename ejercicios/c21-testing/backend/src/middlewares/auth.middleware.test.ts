import { describe, it, expect, vi } from "vitest";
import type { Request, Response, NextFunction } from "express";
import { authenticate, authorize } from "./auth.middleware";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

function mocks(req: Partial<Request> = {}) {
  const res = { status: vi.fn().mockReturnThis (), json: vi.fn().mockReturnThis () } as unknown as Response;
  const next = vi.fn() as unknown as NextFunction;
  return { req: req as Request, res, next };
}

it("responde 403 a un CLIENTE cuando la ruta pide ADMIN", () => {
  const { req, res, next } = mocks({ usuario: { id: 2, rol: "CLIENTE" } });
  authorize("ADMIN") (req, res, next);
  expect(res.status).toHaveBeenCalledWith (403);
  expect(next).not.toHaveBeenCalled ();
});

it("con un token valido llena req.usuario y llama a next", () => {
  const token = jwt.sign({ id: 7, rol: "CLIENTE" }, JWT_SECRET, { expiresIn: "1h" });
  const { req, res, next } = mocks({ headers: { authorization: `Bearer ${token}` }
  });
  authenticate (req, res, next);
  expect(next).toHaveBeenCalledTimes (1);
  expect(req.usuario).toEqual({ id: 7, rol: "CLIENTE" });
});

it("401 'token expirado' con un token vencido", () => {
  const token = jwt.sign({ id: 7, rol: "CLIENTE"}, JWT_SECRET, { expiresIn: "-1s" });
  const { req, res, next } = mocks({ headers: { authorization: `Bearer ${token}` }
  });
  authenticate (req, res, next);
  expect(res.json).toHaveBeenCalledWith ({ error: "Token expirado" });
});

it("401 'token invalido' con un secret falso", () => {
  const token = jwt.sign({ id: 7, rol: "CLIENTE"}, "secretInvalido", { expiresIn: "-1s" });
  const { req, res, next } = mocks({ headers: { authorization: `Bearer ${token}` }
  });
  authenticate (req, res, next);
  expect(res.json).toHaveBeenCalledWith ({ error: "Token invalido" });
});