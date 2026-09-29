import { Router } from "express";
import * as libroController from "../controllers/libro.controller";
import { validate, validateParams } from "../middlewares/validate.middleware";
import { idParamSchema } from "../validations/libro.validation";
import { libroCreateSchema, libroUpdateSchema } from "../validations/libro.validation";
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = Router();
// Las rutas van RELATIVAS: el prefijo /api/libros lo monta index.ts.
router.get("/", libroController.getAll);
router.get("/:id", validateParams(idParamSchema), libroController.getById);
router.post("/", authenticate, authorize("ADMIN"), validate(libroCreateSchema), libroController.create);
router.put("/:id",authenticate, authorize("ADMIN"), validateParams(idParamSchema), validate(libroUpdateSchema), libroController.update);
router.delete("/:id", authenticate, authorize("ADMIN"), validateParams(idParamSchema), libroController.remove);

export default router;