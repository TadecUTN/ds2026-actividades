import type { Libro } from '../types/libro';
import defaultLibrosData from '../mock/libros.json';

const CUSTOM_LIBROS_STORAGE_KEY = 'lectura_inteligente_custom_libros';
const DESTACADOS_STORAGE_KEY = 'lectura_inteligente_destacados';

export const libroService = {
    // Obtiene todos los libros guardados o los carga del archivo original
    async getLibros(): Promise<Libro[]> {
        // Simula una pequeña espera
        await new Promise((resolve) => setTimeout(resolve, 150));

        let originalLibros: Libro[] = defaultLibrosData as Libro[];
        try {
            const response = await fetch('/mock/libros.json');
            if (response.ok) {
                const fetched = await response.json();
                if (Array.isArray(fetched) && fetched.length > 0) {
                    originalLibros = fetched;
                }
            }
        } catch {
            // Usa defaultLibrosData si fetch falla
        }
        
        // Obtiene los libros creados por el usuario
        const customCached = localStorage.getItem(CUSTOM_LIBROS_STORAGE_KEY);
        const customLibros: Libro[] = customCached ? JSON.parse(customCached) : [];

        // Retorna la combinación de ambos
        return [...originalLibros, ...customLibros];
    },

    // Busca un libro por su identificador
    async getLibroById(id: number): Promise<Libro | undefined> {
        const libros = await this.getLibros();
        return libros.find((l) => l.id === id);
    },

    // Agrega un libro nuevo a la lista
    async addLibro(nuevo: Libro): Promise<Libro> {
        const customCached = localStorage.getItem(CUSTOM_LIBROS_STORAGE_KEY);
        const customLibros: Libro[] = customCached ? JSON.parse(customCached) : [];
        const updated = [...customLibros, nuevo];
        localStorage.setItem(CUSTOM_LIBROS_STORAGE_KEY, JSON.stringify(updated));
        return nuevo;
    },

    // Guarda la lista completa de libros (filtrando y persistiendo solo los creados por el usuario)
    async saveLibros(libros: Libro[]): Promise<void> {
        try {
            const response = await fetch('/mock/libros.json');
            const originalLibros: Libro[] = response.ok ? await response.json() : [];
            const originalIds = new Set(originalLibros.map((l) => l.id));
            const customLibros = libros.filter((l) => !originalIds.has(l.id));
            localStorage.setItem(CUSTOM_LIBROS_STORAGE_KEY, JSON.stringify(customLibros));
        } catch (error) {
            console.error('Error al guardar la lista de libros:', error);
        }
    },

    // Obtiene los identificadores de los libros destacados
    async getDestacados(): Promise<number[]> {
        const cached = localStorage.getItem(DESTACADOS_STORAGE_KEY);
        if (cached) {
            return JSON.parse(cached);
        }

        // Por defecto destaca los primeros tres libros
        const defaultDestacados = [1, 2, 3];
        localStorage.setItem(DESTACADOS_STORAGE_KEY, JSON.stringify(defaultDestacados));
        return defaultDestacados;
    },

    // Guarda cuáles libros son destacados
    async saveDestacados(ids: number[]): Promise<void> {
        localStorage.setItem(DESTACADOS_STORAGE_KEY, JSON.stringify(ids));
    }
};
