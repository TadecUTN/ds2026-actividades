import { obtenerToken } from './sesion';

const BASE = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export async function apiFetch<T>(ruta: string, opciones: RequestInit = {}): Promise<T> {
    const token = obtenerToken();
    const url = ruta.startsWith('http://') || ruta.startsWith('https://')
        ? ruta
        : `${BASE}${ruta.startsWith('/') ? ruta : `/${ruta}`}`;

    const res = await fetch(url, {
        ...opciones,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...opciones.headers,
        },
    });

    const cuerpo = await res.json().catch(() => null);

    // Había una sesión y el backend dice que ya no es válida
    if (res.status === 401 && token) {
        window.dispatchEvent(new Event('sesion-expirada'));
    }

    if (!res.ok) {
        throw new ApiError(res.status, cuerpo?.error ?? `Error ${res.status}`);
    }

    return cuerpo as T;
}
