import { createContext } from 'react';
import type { UsuarioSesion } from '../types/usuario';

export interface AuthContextType {
    token: string | null;
    usuario: UsuarioSesion | null;
    estaAutenticado: boolean;
    esAdmin: boolean;
    login: (token: string, usuario: UsuarioSesion) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
