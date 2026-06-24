import type { Libro } from '../types/libro';

export const librosIniciales: Libro[] = [
    {
        id: 1,
        title: "HARRY POTTER Y LA PIEDRA FILOSOFAL",
        author: "J.K ROWLING",
        cover: "/src/assets/Harry Potter y la piedra filosofal.jpg",
    },
    {
        id: 2,
        title: "EL PRINCIPITO",
        author: "ANTOINE DE SAINT-EXUPÉRY",
        cover: "/src/assets/El Principito.jpeg",
    },
    {
        id: 3,
        title: "BAT PAT EL TESORO DEL CEMENTERIO",
        author: "ROBERTO PAVANELLO",
        cover: "/src/assets/BatPat El tesoro del cementerio.jpg",
    },
    {
        id: 4,
        title: "EL DIARIO DE ANA FRANK",
        author: "ANA FRANK",
        cover: "/src/assets/El diario de ana frank.jpg",
    },
    {
        id: 5,
        title: "HÁBITOS ATÓMICOS",
        author: "JAMES CLEAR",
        cover: "/src/assets/Habitos atomicos.webp",
    },
    {
        id: 6,
        title: "GATURRO 15",
        author: "NIK",
        cover: "/src/assets/Gaturro.jpg",
    }
];

export const libros = librosIniciales;
