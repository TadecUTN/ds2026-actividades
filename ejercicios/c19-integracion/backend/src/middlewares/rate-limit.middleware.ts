import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  limit: 10, // máximo 10 intentos por IP en esa ventana
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    error: "Demasiados intentos desde esta IP, por favor intente nuevamente en 15 minutos",
  },
});
