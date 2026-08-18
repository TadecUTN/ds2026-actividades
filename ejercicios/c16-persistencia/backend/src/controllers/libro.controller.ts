import { Request, Response } from "express";
import * as libroService from "../services/libro.services";

// El controller traduce HTTP <-> dominio y elige el status code.
// No busca ni guarda datos: eso es del service.

export async function getAll(req: Request, res: Response) {
  // req.query siempre trae strings. La traducción a boolean es trabajo de esta capa.
  const { disponible } = req.query;
  const filtro = disponible === undefined ? undefined : disponible === "true";
  return res.json(await libroService.findAll(filtro));
}

export async function getById(req: Request, res: Response) {
  try {
  const libro = await libroService.findById(Number(req.params.id));
  if (!libro) return res.status(404).json({ error: "Libro no encontrado" });
  return res.json(libro);
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function create(req: Request, res: Response) {
  try {
    const nuevo = await libroService.create(req.body);
    return res.status(201).json(nuevo);
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const actualizado = await libroService.update(Number(req.params.id), req.body);
    if (!actualizado) return res.status(404).json({ error: "Libro no encontrado" });
    return res.json(actualizado);
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const borrado = await libroService.remove(Number(req.params.id));
    if (!borrado) return res.status(404).json({ error: "Libro no encontrado" });
    return res.status(204).send(); // 204 = sin body. No lleva .json()
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}