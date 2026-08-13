import express from "express";     // Importamos el framework de nodejs express
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";

const app = express();             // Inicializamos la aplicacion
const PORT = 3000;   // Puerto en el que se ejecutara el servidor

app.use(express.json());

app.get("/", (_req, res) => {      // Definimos una ruta para la raiz del servidor (endpoint)
  res.json({ mensaje: "API de la Librería — ¡hola desde un contenedor! 🐳" });
});

app.use("/api/libros", libroRoutes);

app.use("/api/autores", autorRoutes);

app.listen(PORT, () => {           // Pone el servidor a escuchar peticiones en el puerto especificado
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});