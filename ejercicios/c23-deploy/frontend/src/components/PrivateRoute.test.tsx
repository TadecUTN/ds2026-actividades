import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { AuthContext, type AuthContextType } from '../context/AuthContext';
import type { Usuario, Rol } from '../types/sesionType';

function renderPrivateRoute(usuario: Usuario | null, rolRequerido?: Rol) {
  const auth: AuthContextType = {
    token: usuario ? 'fake-token' : null,
    usuario,
    cargando: false,
    estaAutenticado: usuario !== null,
    esAdmin: usuario?.rol === 'ADMIN',
    tieneRol: (rol: Rol) => usuario?.rol === rol,
    login: vi.fn(),
    logout: vi.fn(),
  };

  return render(
    <AuthContext.Provider value={auth}>
      <MemoryRouter initialEntries={['/libros/nuevo']}>
        <Routes>
          <Route element={<PrivateRoute rol={rolRequerido} />}>
            <Route path="/libros/nuevo" element={<div>Contenido Protegido (Outlet)</div>} />
          </Route>
          <Route path="/login" element={<div>Página de Login</div>} />
          <Route path="/sin-permiso" element={<div>Página Sin Permiso</div>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>,
  );
}

describe('PrivateRoute con MemoryRouter', () => {
  it('con usuario: null → redirige a /login y aparece la página de login', () => {
    renderPrivateRoute(null, 'ADMIN');
    expect(screen.getByText('Página de Login')).toBeInTheDocument();
    expect(screen.queryByText('Contenido Protegido (Outlet)')).not.toBeInTheDocument();
  });

  it('con usuario ADMIN → permite el acceso y aparece el Outlet', () => {
    renderPrivateRoute({ id: 1, email: 'admin@libreria.test', nombre: 'Admin', rol: 'ADMIN' }, 'ADMIN');
    expect(screen.getByText('Contenido Protegido (Outlet)')).toBeInTheDocument();
    expect(screen.queryByText('Página de Login')).not.toBeInTheDocument();
  });

  it('con usuario CLIENTE intentando entrar a ruta ADMIN → redirige a /sin-permiso', () => {
    renderPrivateRoute({ id: 2, email: 'cliente@libreria.test', nombre: 'Cliente', rol: 'CLIENTE' }, 'ADMIN');
    expect(screen.getByText('Página Sin Permiso')).toBeInTheDocument();
    expect(screen.queryByText('Contenido Protegido (Outlet)')).not.toBeInTheDocument();
  });
});
