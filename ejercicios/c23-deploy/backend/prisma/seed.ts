import bcrypt from "bcrypt";
import { prisma } from "../src/config/prisma";

const categorias = [
  { nombre: "Ficción" },
  { nombre: "Ciencia Ficción" },
  { nombre: "Clásicos" },
  { nombre: "Tecnología" },
  { nombre: "Historia" },
  { nombre: "Misterio" },
  { nombre: "Filosofía" },
  { nombre: "Drama" },
];

const autores = [
  { nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francia" },
  { nombre: "Alexander Shvets", nacionalidad: "Ucrania" },
  { nombre: "Ray Bradbury", nacionalidad: "Estados Unidos" },
  { nombre: "Gabriel García Márquez", nacionalidad: "Colombia" },
  { nombre: "George Orwell", nacionalidad: "Reino Unido" },
  { nombre: "Paulo Coelho", nacionalidad: "Brasil" },
  { nombre: "Yuval Noah Harari", nacionalidad: "Israel" },
  { nombre: "Dan Brown", nacionalidad: "Estados Unidos" },
  { nombre: "Harper Lee", nacionalidad: "Estados Unidos" },
  { nombre: "Carlos Ruiz Zafón", nacionalidad: "España" },
  { nombre: "Ernesto Sabato", nacionalidad: "Argentina" },
];

const libros = [
  {
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    sinopsis:
      "Un piloto varado en el desierto del Sahara conoce a un pequeño príncipe proveniente del asteroide B-612. A través de los relatos de sus viajes por distintos planetas y su entrañable vínculo con una rosa y un zorro, la obra ofrece una profunda reflexión poética y filosófica sobre la amistad, el amor, la pérdida y el sentido de la vida frente a la mirada rígida del mundo adulto.",
    precio: 4500,
    imagen: "https://covers.openlibrary.org/b/id/12642764-M.jpg",
    disponible: true,
    categorias: ["Ficción", "Clásicos", "Filosofía"],
  },
  {
    titulo: "Patrones de diseño",
    autor: "Alexander Shvets",
    sinopsis:
      "Una guía clara y práctica sobre los patrones de diseño de software orientados a objetos. Explica paso a paso cómo resolver problemas recurrentes de arquitectura mediante soluciones probadas —creacionales, estructurales y de comportamiento—, acompañadas de ejemplos visuales, casos reales y buenas prácticas de refactorización para escribir código limpio, flexible y mantenible.",
    precio: 8500,
    imagen: "https://covers.openlibrary.org/b/id/12941546-M.jpg",
    disponible: true,
    categorias: ["Tecnología"],
  },
  {
    titulo: "Farenheit 451",
    autor: "Ray Bradbury",
    sinopsis:
      "En una sociedad distópica donde los libros están prohibidos y el pensamiento crítico es perseguido, Guy Montag trabaja como bombero encargado de quemar cualquier ejemplar clandestino. El encuentro con la joven Clarisse y el descubrimiento del valor de la literatura despiertan su conciencia, llevándolo a cuestionar el régimen y a luchar por preservar la memoria de la humanidad.",
    precio: 5200,
    imagen: "https://covers.openlibrary.org/b/id/10720584-M.jpg",
    disponible: false,
    categorias: ["Ficción", "Ciencia Ficción"],
  },
  {
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    sinopsis:
      "La obra cumbre del realismo mágico narra la historia de siete generaciones de la familia Buendía en el mítico pueblo de Macondo, desde su fundación por José Arcadio Buendía y Úrsula Iguarán hasta su inevitable ocaso. Entre pasiones, guerras civiles, prodigios y profecías, retrata la condición humana y el destino cíclico de toda una estirpe marcada por la soledad.",
    precio: 6200,
    imagen: "https://covers.openlibrary.org/b/id/15219095-L.jpg",
    disponible: true,
    categorias: ["Ficción", "Clásicos"],
  },
  {
    titulo: "1984",
    autor: "George Orwell",
    sinopsis:
      "En la sombría Oceanía totalitaria gobernada por el Gran Hermano, la Policía del Pensamiento vigila cada acto y reescribe el pasado sin descanso. Winston Smith, empleado del Ministerio de la Verdad, comienza a cuestionar la doctrina oficial y vive un amor prohibido con Julia, enfrentándose a un aparato de control absoluto que busca doblegar hasta la última chispa de libertad individual.",
    precio: 5400,
    imagen: "https://covers.openlibrary.org/b/id/15256133-L.jpg",
    disponible: true,
    categorias: ["Ficción", "Ciencia Ficción"],
  },
  {
    titulo: "El alquimista",
    autor: "Paulo Coelho",
    sinopsis:
      "Santiago, un joven pastor andaluz, emprende un viaje desde España hasta las pirámides de Egipto tras un sueño recurrente que le revela la existencia de un tesoro oculto. En su travesía por el desierto conoce a un sabio alquimista y descubre que la verdadera riqueza reside en escuchar al corazón, reconocer las señales del camino y perseguir la propia Leyenda Personal.",
    precio: 4300,
    imagen: "https://covers.openlibrary.org/b/id/1054120-M.jpg",
    disponible: true,
    categorias: ["Ficción", "Filosofía"],
  },
  {
    titulo: "Sapiens: De animales a dioses",
    autor: "Yuval Noah Harari",
    sinopsis:
      "Un fascinante recorrido por la historia de la humanidad, desde la aparición del Homo sapiens en África hasta las grandes revoluciones —cognitiva, agrícola y científica— que transformaron nuestra especie en dueña del planeta. Yuval Noah Harari analiza cómo los mitos compartidos, el dinero, los imperios, la religión y la ciencia moldearon nuestras sociedades y qué desafíos nos depara el futuro.",
    precio: 7800,
    imagen: "https://covers.openlibrary.org/b/id/7387235-M.jpg",
    disponible: false,
    categorias: ["Historia"],
  },
  {
    titulo: "El código Da Vinci",
    autor: "Dan Brown",
    sinopsis:
      "El asesinato del conservador del Museo del Louvre en París arrastra al experto en simbología Robert Langdon y a la criptógrafa Sophie Neveu a una trepidante investigación. Ocultas en las obras de Leonardo da Vinci, una serie de pistas cifradas conduce a una antigua sociedad secreta y a un misterio histórico guardado durante dos milenios que podría sacudir los cimientos del cristianismo.",
    precio: 5100,
    imagen: "https://covers.openlibrary.org/b/id/15171890-M.jpg",
    disponible: true,
    categorias: ["Ficción", "Misterio"],
  },
  {
    titulo: "Matar a un ruiseñor",
    autor: "Harper Lee",
    sinopsis:
      "En un pequeño pueblo del sur de Estados Unidos durante la Gran Depresión, la pequeña Scout Finch observa cómo su padre, el íntegro abogado Atticus Finch, asume la defensa de Tom Robinson, un hombre negro acusado injustamente de un crimen. Con sensibilidad e ironía, la novela aborda el racismo, la pérdida de la inocencia, la empatía y la lucha por la justicia frente a los prejuicios sociales.",
    precio: 4700,
    imagen: "https://covers.openlibrary.org/b/id/15129917-M.jpg",
    disponible: true,
    categorias: ["Ficción", "Clásicos", "Drama"],
  },
  {
    titulo: "La sombra del viento",
    autor: "Carlos Ruiz Zafón",
    sinopsis:
      "En la Barcelona de posguerra de 1945, el joven Daniel Sempere es llevado por su padre al misterioso Cementerio de los Libros Olvidados, donde elige una novela de Julián Carax que cambiará su vida. Fascinado por la obra, emprende la búsqueda de su enigmático autor mientras descubre una trama de amores imposibles, secretos familiares y venganzas ocultas en las sombras de la ciudad.",
    precio: 6900,
    imagen: "https://covers.openlibrary.org/b/id/15156378-M.jpg",
    disponible: false,
    categorias: ["Ficción", "Misterio"],
  },
];

const usuarios = [
  {
    nombre: "Admin",
    email: "admin@libreria.test",
    password: "Admin1234",
    rol: "ADMIN",
  },
  {
    nombre: "Cliente",
    email: "cliente@libreria.test",
    password: "Cliente1234",
    rol: "CLIENTE",
  },
] as const;

async function main() {
  for (const { password, ...datos } of usuarios) {
    await prisma.usuario.upsert({
      where: { email: datos.email },
      update: {
        nombre: datos.nombre,
        rol: datos.rol,
        passwordHash: await bcrypt.hash(password, 10),
      },
      create: { ...datos, passwordHash: await bcrypt.hash(password, 10) },
    });
  }

  await prisma.categoria.createMany({ data: categorias, skipDuplicates: true });
  await prisma.autor.createMany({ data: autores, skipDuplicates: true });

  for (const { autor, categorias: cats, ...datos } of libros) {
    const existente = await prisma.libro.findFirst({
      where: { titulo: datos.titulo },
    });

    if (existente) {
      await prisma.libro.update({
        where: { id: existente.id },
        data: {
          ...datos,
          autor: {
            connect: { nombre: autor },
          },
          categorias: {
            set: cats.map((nombre) => ({ nombre })),
          },
        },
      });
    } else {
      await prisma.libro.create({
        data: {
          ...datos,
          autor: {
            connect: { nombre: autor },
          },
          categorias: {
            connect: cats.map((nombre) => ({ nombre })),
          },
        },
      });
    }
  }

  await prisma.$disconnect();
}

main();
