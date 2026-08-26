import { Router } from "express";
import * as autorController from "../controllers/autor.controller";
import { validate, validateParams } from "../middlewares/validate.middleware";
import { idParamSchema, autorCreateSchema, autorUpdateSchema } from "../validations/autor.validation";

const router = Router();

router.get("/", autorController.getAll);
router.get("/:id", validateParams(idParamSchema), autorController.getById);
router.post("/", validate(autorCreateSchema), autorController.create);
router.put("/:id", validateParams(idParamSchema), validate(autorUpdateSchema), autorController.update);
router.delete("/:id", validateParams(idParamSchema), autorController.remove);

export default router;