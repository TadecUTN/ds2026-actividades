import { useParams, Link } from 'react-router-dom';
import { Container, Button, Row, Col, Badge, Spinner, Alert } from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch';
import { libroService } from '../services/libroService';
import '../assets/libro-detalle/LibroDetalle.css';

function LibroDetalle() {
    const { id } = useParams<{ id: string }>();
    const libroId = id ? parseInt(id, 10) : null;

    const { data: libro, loading, error } = useFetch(
        () => libroId ? libroService.getLibroById(libroId) : Promise.resolve(undefined),
        [libroId]
    );

    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" variant="warning" />
                <p className="mt-3 text-muted">Cargando detalles del libro...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="my-5">
                <Alert variant="danger" className="text-center">
                    Hubo un error al cargar el libro: {error}
                </Alert>
            </Container>
        );
    }

    if (!libro) {
        return (
            <Container className="text-center py-5 animacion-entrada">
                <div className="mb-4 libro-no-encontrado-icon">🔍</div>
                <h2 className="fw-bold">Libro no encontrado</h2>
                <p className="libro-no-encontrado-text">El libro con ID "{id}" no existe en nuestro catálogo actual.</p>
                <Link to="/catalogo" className="btn btn-oro-primario mt-3">Volver al Catálogo</Link>
            </Container>
        );
    }

    const sinopsisFicticia = `Una pieza literaria excepcional de ${libro.author}. Esta obra maestra cautiva desde la primera página con una narrativa envolvente, personajes profundamente delineados y giros reflexivos sobre la condición humana. Una lectura imprescindible para expandir la mente y enriquecer la biblioteca de todo lector exigente.`;

    return (
        <Container className="my-5 animacion-entrada">
            <div className="tarjeta-vidrio overflow-hidden detalle-tarjeta">
                <Row className="g-0">
                    {/* Columna Portada */}
                    <Col lg={5} md={12} className="d-flex align-items-center justify-content-center p-5 detalle-col-portada">
                        {libro.cover ? (
                            <img
                                src={libro.cover}
                                alt={libro.title}
                                className="img-fluid rounded detalle-portada-img"
                            />
                        ) : (
                            <div className="text-muted text-center py-5">Sin portada disponible</div>
                        )}
                    </Col>

                    {/* Columna Detalles */}
                    <Col lg={7} md={12}>
                        <div className="p-5 d-flex flex-column h-100 justify-content-between detalle-col-info">
                            <div>
                                <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap mb-3">
                                    <Badge className={`detalle-badge ${libro.disponible !== false ? 'detalle-badge-disponible' : 'detalle-badge-agotado'}`}>
                                        {libro.disponible !== false ? 'Disponible' : 'Agotado'}
                                    </Badge>
                                    
                                    {/* Rating premium simulado */}
                                    <div className="d-flex gap-1 detalle-rating">
                                        ★ ★ ★ ★ ★ <span className="text-muted ms-1">(4.9)</span>
                                    </div>
                                </div>

                                <h1 className="display-5 fw-bold mb-2 text-white detalle-titulo">{libro.title}</h1>
                                <h4 className="mb-4 detalle-autor">
                                    por {libro.author}
                                </h4>
                                
                                <hr className="detalle-divider" />
                                
                                <h6 className="form-label-premium mb-2">Sinopsis</h6>
                                <p className="mb-4 detalle-sinopsis">
                                    {sinopsisFicticia}
                                </p>
                            </div>

                            <div>
                                <div className="d-flex align-items-center gap-3 mb-4">
                                    <span className="detalle-precio-label">Precio de Venta:</span>
                                    <span className="fw-bold detalle-precio-valor">
                                        ${libro.precio ? libro.precio.toLocaleString('es-AR') : '3.800'}
                                    </span>
                                </div>
                                
                                <div className="d-flex gap-3 flex-wrap">
                                    <Button className="btn-oro-primario px-4 py-3 flex-grow-1 flex-md-grow-0" disabled={libro.disponible === false}>
                                        Comprar Copia
                                    </Button>
                                    <Link to="/catalogo" className="btn btn-oro-esquema px-4 py-3 text-center flex-grow-1 flex-md-grow-0">
                                        Volver al Catálogo
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default LibroDetalle;
