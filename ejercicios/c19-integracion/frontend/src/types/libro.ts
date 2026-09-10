import type { Autor } from './autor';
import type { Categoria } from './categoria';

export type Libro = {
    id: number;
    titulo: string;
    autor: Autor;
    precio: number;
    imagen: string;
    disponible: boolean;
    autorId?: number;
    categorias?: Categoria[];
};