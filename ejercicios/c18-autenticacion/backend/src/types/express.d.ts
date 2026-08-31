import { PayloadToken } from "./usuario.types";

declare global {
  namespace Express {
    interface Request {
      usuario?: PayloadToken;
    }
  }
}