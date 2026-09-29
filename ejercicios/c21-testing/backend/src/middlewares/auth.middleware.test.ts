import { describe, it, expect, vi } from "vitest";
import type { Request, Response, NextFunction } from "express";
import { authorize } from "./auth.middleware";

function mocks(req: Partial<Request> = {}) {
  const res = { status: vi.fn().mockReturnThis(), json: vi.fn().mockReturnThis() } as unknown as Response;
  const next = vi.fn() as unknown as NextFunction;
  return { req: req as Request, res, next };
}

it("responde 403 a un CLIENTE cuando la ruta pide ADMIN", () => {
  const { req, res, next } = mocks({ usuario: { id: 2, rol: "CLIENTE" } });
  authorize("ADMIN") (req, res, next);
  expect(res.status).toHaveBeenCalledWith (403);
  expect(next).not.toHaveBeenCalled ();
});