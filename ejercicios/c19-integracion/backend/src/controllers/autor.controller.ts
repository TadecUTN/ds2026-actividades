import { Request, Response } from "express";
import * as autoresService from "../services/autor.services";

export async function getAll(req: Request, res: Response) {
    return res.json(await autoresService.findAll());
}

export async function getById(req: Request, res: Response) {
    const autor = await autoresService.findById(Number(req.params.id));
    if (!autor) return res.status(404).json({ error: "Autor no encontrado" });
    return res.json(autor);
}

export async function create(req: Request, res: Response) {
    const nuevo = await autoresService.create(req.body);
    return res.status(201).json(nuevo);
}

export async function update(req: Request, res: Response) {
    const actualizado = await autoresService.update(Number(req.params.id), req.body);
    if (!actualizado) return res.status(404).json({ error: "Autor no encontrado" });
    return res.json(actualizado);
}

export async function remove(req: Request, res: Response) {
    const borrado = await autoresService.remove(Number(req.params.id));
    if (!borrado) return res.status(404).json({ error: "Autor no encontrado" });
    return res.status(204).send();
}