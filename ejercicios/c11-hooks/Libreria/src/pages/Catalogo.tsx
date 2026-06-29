import { useState, useMemo } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import LibroCard from '../components/LibroCard';
import type { Libro } from '../types/libro';
import '../assets/catalogo/Catalogo.css';

function Catalogo({ libros }: { libros: Libro[] }) {
    const [busqueda, setBusqueda] = useState('');
    const [soloDisponibles, setSoloDisponibles] = useState(false);
    const [ordenarPor, setOrdenarPor] = useState('titulo-asc');

    // Filtrar y ordenar los libros
    const librosFiltrados = useMemo(() => {
        let resultado = libros.filter((libro) => {
            const coincideBusqueda = 
                libro.title.toLowerCase().includes(busqueda.toLowerCase()) ||
                libro.author.toLowerCase().includes(busqueda.toLowerCase());
            
            const coincideDisponibilidad = !soloDisponibles || libro.disponible !== false;

            return coincideBusqueda && coincideDisponibilidad;
        });

        // Ordenar
        return [...resultado].sort((a, b) => {
            if (ordenarPor === 'titulo-asc') {
                return a.title.localeCompare(b.title);
            }
            if (ordenarPor === 'titulo-desc') {
                return b.title.localeCompare(a.title);
            }
            if (ordenarPor === 'precio-asc') {
                const precioA = a.precio ?? 0;
                const precioB = b.precio ?? 0;
                return precioA - precioB;
            }
            if (ordenarPor === 'precio-desc') {
                const precioA = a.precio ?? 0;
                const precioB = b.precio ?? 0;
                return precioB - precioA;
            }
            return 0;
        });
    }, [libros, busqueda, soloDisponibles, ordenarPor]);

    return (
        <Container className="my-5 animacion-entrada">
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">Nuestro Catálogo</h1>
                <p className="catalogo-subtitle">Explorá nuestras colecciones y encontrá tu próxima lectura</p>
            </div>

            {/* Controles de Filtros y Búsqueda */}
            <div className="tarjeta-vidrio p-4 mb-5 catalogo-filter-card">
                <Row className="g-3 align-items-center">
                    <Col lg={5} md={12}>
                        <Form.Label className="form-label-premium">Buscar Libro</Form.Label>
                        <InputGroup>
                            <Form.Control
                                placeholder="Título o Autor..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                className="form-control-premium"
                            />
                        </InputGroup>
                    </Col>
                    
                    <Col lg={3} md={6}>
                        <Form.Label className="form-label-premium">Ordenar Por</Form.Label>
                        <Form.Select
                            value={ordenarPor}
                            onChange={(e) => setOrdenarPor(e.target.value)}
                            className="form-control-premium form-select catalogo-select"
                        >
                            <option value="titulo-asc" className="catalogo-option">Título (A-Z)</option>
                            <option value="titulo-desc" className="catalogo-option">Título (Z-A)</option>
                            <option value="precio-asc" className="catalogo-option">Precio (Menor a Mayor)</option>
                            <option value="precio-desc" className="catalogo-option">Precio (Mayor a Menor)</option>
                        </Form.Select>
                    </Col>

                    <Col lg={4} md={6} className="d-flex align-items-end justify-content-lg-end pt-lg-4">
                        <Form.Check
                            type="checkbox"
                            id="check-disponibilidad"
                            label="Mostrar solo disponibles"
                            checked={soloDisponibles}
                            onChange={(e) => setSoloDisponibles(e.target.checked)}
                            className="text-white fw-semibold catalogo-checkbox"
                        />
                    </Col>
                </Row>
            </div>

            {/* Contador de resultados */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="catalogo-results-count">
                    Mostrando <strong>{librosFiltrados.length}</strong> {librosFiltrados.length === 1 ? 'libro' : 'libros'}
                </span>
            </div>

            {/* Grilla de libros */}
            {librosFiltrados.length > 0 ? (
                <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {librosFiltrados.map((libro) => (
                        <Col key={libro.id} className="d-flex justify-content-center">
                            <LibroCard {...libro} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <div className="text-center py-5 tarjeta-vidrio p-5">
                    <div className="mb-3 catalogo-no-results-icon">📖</div>
                    <h3 className="fw-bold mb-2">No se encontraron libros</h3>
                    <p className="mx-auto catalogo-no-results-text">
                        Ajustá los filtros de búsqueda o disponibilidad para ver otros títulos de nuestra colección.
                    </p>
                </div>
            )}
        </Container>
    );
}

export default Catalogo;
