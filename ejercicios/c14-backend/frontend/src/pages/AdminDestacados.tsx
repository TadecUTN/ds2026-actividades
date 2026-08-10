import { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Form, InputGroup, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch';
import { libroService } from '../services/libroService';
import type { Libro } from '../types/libro';
import '../assets/admin-destacados/AdminDestacados.css';

export default function AdminDestacados() {
    const { data: libros, loading: loadingLibros, error: errorLibros } = useFetch<Libro[]>(libroService.getLibros, []);
    const { data: destacadosIds, loading: loadingDestacados, error: errorDestacados } = useFetch<number[]>(libroService.getDestacados, []);

    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [busqueda, setBusqueda] = useState('');
    const [saving, setSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Carga los destacados guardados
    useEffect(() => {
        if (destacadosIds) {
            setSelectedIds(destacadosIds);
        }
    }, [destacadosIds]);

    const loading = loadingLibros || loadingDestacados;
    const error = errorLibros || errorDestacados;

    // Filtra los libros según lo que se escriba en el buscador
    const filteredLibros = useMemo(() => {
        if (!libros) return [];
        return libros.filter((libro) =>
            libro.title.toLowerCase().includes(busqueda.toLowerCase()) ||
            libro.author.toLowerCase().includes(busqueda.toLowerCase())
        );
    }, [libros, busqueda]);

    const handleToggle = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id)
                ? prev.filter((x) => x !== id)
                : [...prev, id]
        );
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await libroService.saveDestacados(selectedIds);
            setShowSuccess(true);
            // Oculta el cartel después de tres segundos
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (err) {
            console.error('Error guardando destacados:', err);
        } finally {
            setSaving(false);
        }
    };

    const handleClearAll = () => {
        setSelectedIds([]);
    };

    const handleSelectAll = () => {
        if (libros) {
            setSelectedIds(libros.map((l) => l.id));
        }
    };

    if (loading) {
        return (
            <Container className="my-5 text-center py-5">
                <Spinner animation="border" variant="warning" />
                <p className="mt-3 text-muted">Cargando panel de destacados...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="my-5">
                <Alert variant="danger" className="text-center">
                    Hubo un error al cargar el panel de destacados: {error}
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="my-5 animacion-entrada">
            {/* Título de la página */}
            <div className="text-center admin-header">
                <h1 className="display-4 fw-bold">Gestionar Destacados</h1>
                <p className="admin-subtitle">Seleccioná los libros que se mostrarán en la sección destacada de la Home</p>
            </div>

            {/* Datos informativos */}
            <div className="tarjeta-vidrio stats-card">
                <div className="stat-item">
                    <div className="stat-value">{libros ? libros.length : 0}</div>
                    <div className="stat-label">Libros Totales</div>
                </div>
                <div className="stat-item">
                    <div className="stat-value text-warning">{selectedIds.length}</div>
                    <div className="stat-label">Destacados Seleccionados</div>
                </div>
                <div className="stat-item d-flex gap-2">
                    <Button variant="outline-danger" size="sm" onClick={handleClearAll}>
                        Desmarcar Todos
                    </Button>
                    <Button variant="outline-success" size="sm" onClick={handleSelectAll}>
                        Marcar Todos
                    </Button>
                </div>
            </div>

            {/* Buscador y botón para guardar */}
            <div className="tarjeta-vidrio p-4 mb-4 admin-filter-card">
                <Row className="g-3 align-items-center">
                    <Col md={8}>
                        <Form.Label className="form-label-premium">Buscar Libro</Form.Label>
                        <InputGroup>
                            <Form.Control
                                placeholder="Filtrar por título o autor..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                className="form-control-premium"
                            />
                        </InputGroup>
                    </Col>
                    
                    <Col md={4} className="d-flex align-items-end pt-3 pt-md-0">
                        <Button 
                            className="btn-oro-primario w-100 py-3" 
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving ? (
                                <>
                                    <Spinner animation="border" size="sm" className="me-2" />
                                    Guardando...
                                </>
                            ) : (
                                'Guardar Cambios'
                            )}
                        </Button>
                    </Col>
                </Row>
            </div>

            {/* Lista de libros a elegir */}
            <div className="book-selection-list">
                {filteredLibros.length > 0 ? (
                    filteredLibros.map((libro) => {
                        const isFeatured = selectedIds.includes(libro.id);
                        return (
                            <div 
                                key={libro.id} 
                                className={`book-selection-row ${isFeatured ? 'is-featured' : ''}`}
                            >
                                <img 
                                    src={libro.cover || 'https://placehold.co/300x400?text=Lectura+Inteligente'} 
                                    alt={libro.title} 
                                    className="book-row-cover" 
                                />
                                <div className="book-row-info">
                                    <div className="d-flex align-items-center">
                                        <h5 className="book-row-title mb-0">{libro.title}</h5>
                                        {isFeatured && (
                                            <Badge bg="warning" text="dark" className="book-row-badge ms-2">
                                                ★ Destacado
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="book-row-author">{libro.author}</div>
                                </div>
                                <div className="book-row-action">
                                    <Form.Check 
                                        type="switch"
                                        id={`switch-${libro.id}`}
                                        checked={isFeatured}
                                        onChange={() => handleToggle(libro.id)}
                                        className="custom-switch"
                                        aria-label={`Destacar ${libro.title}`}
                                    />
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-5 tarjeta-vidrio p-4">
                        <p className="mb-0 text-white-50">No se encontraron libros que coincidan con la búsqueda.</p>
                    </div>
                )}
            </div>

            {/* Cartel flotante de éxito */}
            {showSuccess && (
                <Alert variant="success" className="save-alert text-center py-3">
                    <strong className="text-white">¡Destacados guardados con éxito!</strong>
                    <div className="text-white-50 small mt-1">Los cambios se verán reflejados en la Home.</div>
                </Alert>
            )}
        </Container>
    );
}
