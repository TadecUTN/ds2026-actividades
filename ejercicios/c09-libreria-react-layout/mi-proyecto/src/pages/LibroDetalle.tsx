import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { libros } from '../data/libros';

function LibroDetalle() {
    const { id } = useParams<{ id: string }>();
    const libroId = id ? parseInt(id, 10) : null;
    const libro = libros.find((l) => l.id === libroId);

    if (!libro) {
        return (
            <Container className="text-center mt-5">
                <h2>Libro no encontrado</h2>
                <p>El libro con ID {id} no existe en nuestro catálogo.</p>
                <Link to="/catalogo" className="btn btn-primary mt-3">Volver al Catálogo</Link>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <Card className="shadow-lg border-0 overflow-hidden" style={{ borderRadius: '15px' }}>
                <Row className="g-0">
                    <Col md={4} className="d-flex align-items-center justify-content-center bg-light p-4">
                        {libro.cover ? (
                            <img
                                src={libro.cover}
                                alt={libro.title}
                                className="img-fluid rounded shadow-sm"
                                style={{ maxHeight: '400px', objectFit: 'contain' }}
                            />
                        ) : (
                            <div className="text-muted text-center py-5">Sin portada disponible</div>
                        )}
                    </Col>
                    <Col md={8}>
                        <Card.Body className="p-5 d-flex flex-column h-100 justify-content-center">
                            <h1 className="display-4 fw-bold mb-3">{libro.title}</h1>
                            <h3 className="text-muted mb-4">Autor: {libro.author}</h3>
                            <hr className="my-4" />
                            <p className="text-secondary mb-4">
                                descripcion
                            </p>
                            <div className="d-flex gap-3 mt-auto">
                                <Button variant="primary" size="lg" className="px-4">Comprar o Alquilar</Button>
                                <Link to="/catalogo" className="btn btn-outline-secondary btn-lg px-4">Volver al Catálogo</Link>
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
}

export default LibroDetalle;
