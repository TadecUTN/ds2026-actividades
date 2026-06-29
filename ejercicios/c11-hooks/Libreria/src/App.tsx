import type { Libro } from './types/libro';
import Home from './pages/Home';
import Layout from './components/Layout/Layout';
import './App.css';
import Catalogo from './pages/Catalogo';
import LibroDetalle from './pages/LibroDetalle';
import Contacto from './pages/Contacto';
import LibroNuevo from './pages/LibroNuevo';
import { Routes, Route, useLocation } from 'react-router-dom';
import { librosIniciales } from './data/libros';
import { useState, useEffect } from 'react';

export default function App() {
  const [libros, setLibros] = useState<Libro[]>(librosIniciales);
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const agregarLibro = (nuevo: Libro) => setLibros([...libros, nuevo]);

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/catalogo' element={<Catalogo libros={libros} />} />
        <Route path='/libros/nuevo' element={<LibroNuevo onAgregar={agregarLibro} />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/libros/:id' element={<LibroDetalle libros={libros} />} />
      </Routes>
    </Layout>
  );
}