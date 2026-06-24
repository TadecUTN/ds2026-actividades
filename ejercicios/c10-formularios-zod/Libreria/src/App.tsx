import type { Libro } from './types/libro';
import Home from './pages/Home';
import Layout from './components/Layout/Layout';
import Catalogo from './pages/Catalogo';
import LibroDetalle from './pages/LibroDetalle';
import Contacto from './pages/Contacto';
import LibroNuevo from './pages/LibroNuevo';
import { Routes, Route } from 'react-router-dom';
import { librosIniciales } from './data/libros';
import { useState } from 'react';

export default function App() {
  const [libros, setLibros] = useState<Libro[]>(librosIniciales);

  const agregarLibro = (nuevo: Libro) => setLibros([...libros, nuevo]);

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/catalogo' element={<Catalogo libros={libros} />} />
        <Route path='/libros/nuevo' element={<LibroNuevo onAgregar={agregarLibro} />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/libros/:id' element={<LibroDetalle />} />
      </Routes>
    </Layout>
  );
}