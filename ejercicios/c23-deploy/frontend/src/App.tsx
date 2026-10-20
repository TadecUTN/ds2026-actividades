import Home from './pages/Home';
import Layout from './components/Layout/Layout';
import './App.css';
import Catalogo from './pages/Catalogo';
import LibroDetalle from './pages/LibroDetalle';
import Contacto from './pages/Contacto';
import LibroNuevo from './pages/LibroNuevo';
import AdminDestacados from './pages/AdminDestacados';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import SinPermiso from './pages/SinPermiso';
import PrivateRoute from './components/PrivateRoute';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/catalogo' element={<Catalogo />} />
          <Route path='/sin-permiso' element={<SinPermiso />} />
          <Route element={<PrivateRoute rol="ADMIN" />}>
            <Route path='/libros/nuevo' element={<LibroNuevo />} />
            <Route path='/admin/destacados' element={<AdminDestacados />} />
          </Route>
          <Route path='/contacto' element={<Contacto />} />
          <Route path='/libros/:id' element={<LibroDetalle />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}