import { Request, Response } from "express";
import * as libroService from "../services/libro.services";

// El controller traduce HTTP <-> dominio y elige el status code.
// No busca ni guarda datos: eso es del service.

export function getAll(req: Request, res: Response) {
  // req.query siempre trae strings. La traducción a boolean es trabajo de esta capa.
  const { disponible } = req.query;
  const filtro = disponible === undefined ? undefined : disponible === "true";
  return res.json(libroService.findAll(filtro));
}

export function getById(req: Request, res: Response) {
  const libro = libroService.findById(Number(req.params.id));
  if (!libro) return res.status(404).json({ error: "Libro no encontrado" });
  return res.json(libro);
}

export function create(req: Request, res: Response) {
  const nuevo = libroService.create(req.body);
  return res.status(201).json(nuevo);
}

export function update(req: Request, res: Response) {
  const actualizado = libroService.update(Number(req.params.id), req.body);
  if (!actualizado) return res.status(404).json({ error: "Libro no encontrado" });
  return res.json(actualizado);
}

export function remove(req: Request, res: Response) {
  const borrado = libroService.remove(Number(req.params.id));
  if (!borrado) return res.status(404).json({ error: "Libro no encontrado" });
  return res.status(204).send(); // 204 = sin body. No lleva .json()
}