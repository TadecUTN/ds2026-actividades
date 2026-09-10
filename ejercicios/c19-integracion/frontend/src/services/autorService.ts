import { apiFetch } from './api';
import type { Autor } from '../types/autor';

export const autorService = {
    // Obtiene todos los autores disponibles desde la API
    async getAutores(): Promise<Autor[]> {
        return apiFetch<Autor[]>('/autores');
    },

    // Crea un nuevo autor en la API
    async createAutor(datos: { nombre: string; nacionalidad?: string }): Promise<Autor> {
        return apiFetch<Autor>('/autores', {
            method: 'POST',
            body: JSON.stringify(datos),
        });
    },
};
