import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface RutaProtegidaProps {
    children: ReactNode;
    soloAdmin?: boolean;
}

export default function RutaProtegida({ children, soloAdmin = false }: RutaProtegidaProps) {
    const { estaAutenticado, esAdmin } = useAuth();
    const location = useLocation();

    if (!estaAutenticado) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (soloAdmin && !esAdmin) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
