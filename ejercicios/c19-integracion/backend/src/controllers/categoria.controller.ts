import { Request, Response } from "express";
import * as categoriaService from "../services/categoria.services";

export async function getAll(_req: Request, res: Response) {
  return res.json(await categoriaService.findAll());
}
