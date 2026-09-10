import type { UsuarioSesion } from '../types/usuario';

export const obtenerToken = (): string | null => localStorage.getItem('token');
export const guardarToken = (token: string): void => localStorage.setItem('token', token);
export const borrarToken = (): void => localStorage.removeItem('token');

export const obtenerUsuario = (): UsuarioSesion | null => {
    const raw = localStorage.getItem('usuario');
    if (!raw) return null;
    try {
        return JSON.parse(raw) as UsuarioSesion;
    } catch {
        return null;
    }
};

export const guardarUsuario = (usuario: UsuarioSesion): void => {
    localStorage.setItem('usuario', JSON.stringify(usuario));
};

export const borrarSesion = (): void => {
    borrarToken();
    localStorage.removeItem('usuario');
};
