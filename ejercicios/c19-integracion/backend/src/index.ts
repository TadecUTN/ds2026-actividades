import express from "express";
import cors from "cors";
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";
import { errorHandler } from "./middlewares/error.middleware";
import authRoutes from "./routes/auth.routes";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const corsOptions = {
  origin: [process.env.FRONTEND_URL ?? "http://localhost:5173"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ mensaje: "API de la Librería — ¡hola desde un container! 🐳" });
});

app.use("/api/auth", authRoutes);

app.use("/api/libros", libroRoutes);

app.use("/api/autores", autorRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});