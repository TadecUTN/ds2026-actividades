import { useState, type ReactNode } from 'react';
import type { UsuarioSesion } from '../types/usuario';
import {
    obtenerToken,
    guardarToken,
    obtenerUsuario,
    guardarUsuario,
    borrarSesion
} from '../services/sesion';
import { AuthContext } from './AuthContext';

function parsearUsuarioDesdeToken(jwt: string): UsuarioSesion | null {
    try {
        const partes = jwt.split('.');
        if (partes.length !== 3) return null;
        const payloadJson = atob(partes[1]);
        const payload = JSON.parse(payloadJson);
        return {
            id: payload.id ?? 0,
            email: payload.email ?? '',
            nombre: payload.rol === 'ADMIN' ? 'Administrador' : 'Usuario',
            rol: payload.rol ?? 'USER',
        };
    } catch {
        return null;
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(() => obtenerToken());
    const [usuario, setUsuario] = useState<UsuarioSesion | null>(() => {
        const guardado = obtenerUsuario();
        if (guardado) return guardado;
        const actualToken = obtenerToken();
        if (actualToken) return parsearUsuarioDesdeToken(actualToken);
        return null;
    });

    const login = (nuevoToken: string, nuevoUsuario: UsuarioSesion) => {
        guardarToken(nuevoToken);
        guardarUsuario(nuevoUsuario);
        setToken(nuevoToken);
        setUsuario(nuevoUsuario);
    };

    const logout = () => {
        borrarSesion();
        setToken(null);
        setUsuario(null);
    };

    const estaAutenticado = !!token;
    const esAdmin = usuario?.rol === 'ADMIN';

    return (
        <AuthContext.Provider
            value={{
                token,
                usuario,
                estaAutenticado,
                esAdmin,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
