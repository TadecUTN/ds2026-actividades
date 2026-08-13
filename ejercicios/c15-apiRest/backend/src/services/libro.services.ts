import Libro from "../types/libro.types";

const libros: Libro[] = [
  {
    "id": 1,
    "titulo": "El principito",
    "autor": "Antoine de Saint-Exupéry",
    "precio": 4500,
    "imagen": "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
    "disponible": true
  },
  {
    "id": 2,
    "titulo": "Patrones de diseño",
    "autor": "Alexander Shvets",
    "precio": 8500,
    "imagen": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80",
    "disponible": true
  },
  {
    "id": 3,
    "titulo": "Farenheit 451",
    "autor": "Ray Bradbury",
    "precio": 5200,
    "imagen": "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80",
    "disponible": false
  },
  {
    "id": 4,
    "titulo": "Cien años de soledad",
    "autor": "Gabriel García Márquez",
    "precio": 6200,
    "imagen": "https://images.unsplash.com/photo-1473187983305-f615310e7daa?auto=format&fit=crop&w=400&q=80",
    "disponible": true
  },
  {
    "id": 5,
    "titulo": "1984",
    "autor": "George Orwell",
    "precio": 5400,
    "imagen": "https://images.unsplash.com/photo-1473755504818-b72b6dfdc0a1?auto=format&fit=crop&w=400&q=80",
    "disponible": true
  },
  {
    "id": 6,
    "titulo": "El alquimista",
    "autor": "Paulo Coelho",
    "precio": 4300,
    "imagen": "https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=400&q=80",
    "disponible": true
  },
  {
    "id": 7,
    "titulo": "Sapiens: De animales a dioses",
    "autor": "Yuval Noah Harari",
    "precio": 7800,
    "imagen": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80",
    "disponible": false
  },
  {
    "id": 8,
    "titulo": "El código Da Vinci",
    "autor": "Dan Brown",
    "precio": 5100,
    "imagen": "https://images.unsplash.com/photo-1496104679561-38b73d6fcdf0?auto=format&fit=crop&w=400&q=80",
    "disponible": true
  },
  {
    "id": 9,
    "titulo": "Matar a un ruiseñor",
    "autor": "Harper Lee",
    "precio": 4700,
    "imagen": "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80",
    "disponible": true
  },
  {
    "id": 10,
    "titulo": "La sombra del viento",
    "autor": "Carlos Ruiz Zafón",
    "precio": 6900,
    "imagen": "https://images.unsplash.com/photo-1529480821492-a27f2b0b4b79?auto=format&fit=crop&w=400&q=80",
    "disponible": false
  }
];

let proximoId = 11;

// Este service no sabe que existe HTTP: no ve req ni res, y no devuelve status codes.
// Si "disponible" viene undefined, devuelve todo.
export function findAll(disponible?: boolean): Libro[] {
  if (disponible === undefined) return libros;
  return libros.filter(libro => libro.disponible === disponible);
}

export function findById(id: number): Libro | undefined {
  return libros.find(libro => libro.id === id);
}
// Omit<Libro, "id"> = un Libro sin el id. El id lo pone el servidor, no el cliente.
export function create(datos: Omit<Libro, "id">): Libro {
  const nuevo: Libro = { id: proximoId++, ...datos };
  libros.push(nuevo);
  return nuevo;
}

export function update(id: number, datos: Omit<Libro, "id">): Libro | undefined {
  const i = libros.findIndex(libro => libro.id === id);
  if (i === -1) return undefined;
  libros[i] = { id, ...datos };
  return libros[i];
}

export function remove(id: number): boolean {
  const i = libros.findIndex(libro => libro.id === id);
  if (i === -1) return false;
  libros.splice(i, 1);
  return true;
}