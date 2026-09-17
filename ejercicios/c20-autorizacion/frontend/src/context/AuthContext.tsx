import { createContext, useEffect, useState, type ReactNode } from 'react';
import type { Usuario, Rol, Credenciales, Sesion } from '../types/sesionType';
import { borrarSesion, borrarToken, guardarToken, obtenerToken } from '../services/sesion';
import { apiFetch } from '../services/api';

export interface AuthContextType {
    token: string | null;
    usuario: Usuario | null;
    cargando: boolean;
    estaAutenticado: boolean;
    esAdmin: boolean;
    tieneRol: (rol: Rol) => boolean;
    login: {
        (credenciales: Credenciales): Promise<void>;
        (token: string, usuario: { id: number; email: string; nombre: string; rol: string }): void;
    };
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [token, setToken] = useState<string | null>(obtenerToken());
    const [cargando, setCargando] = useState(obtenerToken() !== null);

    useEffect(() => {
        if (!obtenerToken()) return;
        apiFetch<Usuario>('/auth/yo')
            .then(setUsuario)
            .catch(() => {
                borrarToken();
                setToken(null);
                setUsuario(null);
            })
            .finally(() => setCargando(false));
    }, []);

    const login = async (credencialesOrToken: Credenciales | string, usuarioParam?: Usuario) => {
        if (typeof credencialesOrToken === 'string') {
            guardarToken(credencialesOrToken);
            setToken(credencialesOrToken);
            if (usuarioParam) setUsuario(usuarioParam);
            return;
        }
        const sesion = await apiFetch<Sesion>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credencialesOrToken),
        });
        guardarToken(sesion.token);
        setToken(sesion.token);
        setUsuario(sesion.usuario);
    };

    const logout = () => {
        borrarToken();
        borrarSesion();
        setToken(null);
        setUsuario(null);
    };

    const tieneRol = (rol: Rol): boolean => {
        return usuario?.rol === rol;
    };

    const estaAutenticado = usuario !== null;
    const esAdmin = usuario?.rol === 'ADMIN';

    return (
        <AuthContext.Provider
            value={{
                token,
                usuario,
                cargando,
                estaAutenticado,
                esAdmin,
                tieneRol,
                login: login as AuthContextType['login'],
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}