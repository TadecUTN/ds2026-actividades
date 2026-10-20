import { apiFetch } from './api';
import type { Categoria } from '../types/categoria';

export const categoriaService = {
    // Obtiene todas las categorias disponibles desde la API
    async getCategorias(): Promise<Categoria[]> {
        return apiFetch<Categoria[]>('/categorias');
    },
};
