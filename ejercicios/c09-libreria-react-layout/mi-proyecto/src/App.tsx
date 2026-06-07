import Home from './pages/Home';
import Layout from './components/Layout/Layout';
import Catalogo from './pages/Catalogo';
import LibroDetalle from './pages/LibroDetalle';
import Contacto from './pages/Contacto';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/catalogo' element={<Catalogo />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/libros/:id' element={<LibroDetalle />} />
      </Routes>
    </Layout>
  );
}