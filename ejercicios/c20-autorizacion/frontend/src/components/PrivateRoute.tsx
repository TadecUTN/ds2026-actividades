import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { Rol } from '../types/sesionType';
import { Spinner } from 'react-bootstrap';

export default function PrivateRoute({ rol }: { rol?: Rol }) {
    const { usuario, cargando } = useAuth();

    // 1. ¿Ya sé quién sos?
    if (cargando) return <Spinner animation="border" />;
    // 2. ¿Sos alguien?
    if (!usuario) return <Navigate to="/login" replace />;
    // 3. ¿Podés?
    if (rol && usuario.rol !== rol) return <Navigate to="/sin-permiso" replace />;

    return <Outlet />;
}
