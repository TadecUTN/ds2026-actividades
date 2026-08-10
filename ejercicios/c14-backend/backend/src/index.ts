import express from "express";     // Importamos el framework de nodejs express

const app = express();             // Inicializamos la aplicacion
const PORT = 3000;                 // Puerto en el que se ejecutara el servidor

app.get("/", (_req, res) => {      // Definimos una ruta para la raiz del servidor (endpoint)
  res.json({ mensaje: "API de la Librería — ¡hola desde un contenedor! 🐳" });
});

app.listen(PORT, () => {           // Pone el servidor a escuchar peticiones en el puerto especificado
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  precio: number;
  imagen: string;
  disponible: boolean;
}

interface Autor {
  id: number;
  nombre: string;
  nacionalidad: string;
}

const libros: Libro[] = [
  { id: 1, titulo: "El principito", autor: "Antoine de Saint-Exupéry",
    precio: 4500, imagen: "https://...", disponible: false },
  { id: 2, titulo: "100 años de soledad", autor: "Gabriel García Márquez",
    precio: 6000, imagen: "https://...", disponible: true },
  { id: 3, titulo: "Cien años de soledad", autor: "Gabriel García Márquez",
    precio: 6000, imagen: "https://...", disponible: false },
  { id: 4, titulo: "El túnel", autor: "Ernesto Sabato",
    precio: 5000, imagen: "https://...", disponible: true },
];

const autores: Autor[] = [
  { id: 1, nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francia" },
  { id: 2, nombre: "Gabriel García Márquez", nacionalidad: "Colombia" },
  { id: 3, nombre: "Ernesto Sabato", nacionalidad: "Argentina" },
];

app.get("/libros", (req, res) => {
  const { disponible } = req.query;
  if (disponible == undefined) {
    res.json(libros);
    return;
  } else if (disponible || disponible === "false") {
    res.json(libros.filter(libro => libro.disponible === (disponible === "true")));
  } else {
    res.json(libros);
  }
});

app.get("/autores", (_req, res) => {
  res.json(autores);
});