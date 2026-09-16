import { apiFetch } from './api';
import type { Libro, NuevoLibroDTO } from '../types/libro';

const DESTACADOS_STORAGE_KEY = 'lectura_inteligente_destacados';

export const libroService = {
    // Obtiene todos los libros guardados desde la API
    async getLibros(): Promise<Libro[]> {
        return apiFetch<Libro[]>('/libros');
    },

    // Busca un libro por su identificador desde la API
    async getLibroById(id: number): Promise<Libro> {
        return apiFetch<Libro>(`/libros/${id}`);
    },

    // Agrega un libro nuevo a la API
    async addLibro(nuevo: NuevoLibroDTO | (Omit<Libro, 'id'> & { categorias?: string[]; imagen?: string }) | Partial<Libro>): Promise<Libro> {
        return apiFetch<Libro>('/libros', {
            method: 'POST',
            body: JSON.stringify(nuevo),
        });
    },

    // Obtiene los identificadores de los libros destacados
    async getDestacados(): Promise<number[]> {
        const cached = localStorage.getItem(DESTACADOS_STORAGE_KEY);
        if (cached) {
            return JSON.parse(cached);
        }

        const defaultDestacados = [1, 2, 3];
        localStorage.setItem(DESTACADOS_STORAGE_KEY, JSON.stringify(defaultDestacados));
        return defaultDestacados;
    },

    // Guarda cuáles libros son destacados
    async saveDestacados(ids: number[]): Promise<void> {
        localStorage.setItem(DESTACADOS_STORAGE_KEY, JSON.stringify(ids));
    }
};

