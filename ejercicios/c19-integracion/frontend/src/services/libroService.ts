import type { Libro } from '../types/libro';

const CUSTOM_LIBROS_STORAGE_KEY = 'lectura_inteligente_custom_libros';
const DESTACADOS_STORAGE_KEY = 'lectura_inteligente_destacados';

export const libroService = {
    // Obtiene todos los libros guardados
    async getLibros(): Promise<Libro[]> {
        await new Promise((resolve) => setTimeout(resolve, 150));

        const customCached = localStorage.getItem(CUSTOM_LIBROS_STORAGE_KEY);
        const customLibros: Libro[] = customCached ? JSON.parse(customCached) : [];

        return customLibros;
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

    // Guarda la lista completa de libros
    async saveLibros(libros: Libro[]): Promise<void> {
        localStorage.setItem(CUSTOM_LIBROS_STORAGE_KEY, JSON.stringify(libros));
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
