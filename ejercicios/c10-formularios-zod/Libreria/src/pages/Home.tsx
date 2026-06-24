import '../App.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import LibroCard from '../components/LibroCard';
import { libros } from '../data/libros';

function MyMain() {
    return (
        <main>
            <Container className='text-center'>
                <Row>
                    <Col className="seccion-bienvenida">
                        <h1 className="display-5">Bienvenido a <b>Lectura Inteligente</b></h1>
                    </Col>
                    <Card className="text-center card-catalogo">
                        <Card.Body style={{ backgroundImage: "url(/src/assets/fondoParaBotonCatalogo.jpg)" }}>
                            <Card.Title className="card-title display-6">Revisá nuestro catálogo</Card.Title>
                            <Card.Text>Encontrá el libro que buscás</Card.Text>
                            <Card.Link as={Link} to="/catalogo" className="btn btn-primary">Catálogo</Card.Link>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </main>
    );
}

function PromoBanner() {
    const [ver, setVer] = useState(true);

    if (!ver) {
        return null;
    }

    return (
        <Container className="mt-3">
            <Alert onClose={() => setVer(false)} dismissible className="text-center shadow-sm promo-banner">
                <Alert.Heading>¡Solo por hoy!</Alert.Heading>
                <p className="mb-0">
                    Aprovechá un <strong>20% de descuento</strong> en todas las novelas de ficción usando el código <strong>ELPRINCIPITO20</strong>.
                </p>
            </Alert>
        </Container>
    );
}

export default function Home() {
    // Mostramos los primeros 3 libros como destacados en la Home
    const destacados = libros.slice(0, 3);

    return (
        <>
            <PromoBanner />
            <MyMain />
            <Container className="my-5">
                <h2 className="text-center mb-4">Libros Destacados</h2>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
                    {destacados.map((libro) => (
                        <div key={libro.id} className="col d-flex justify-content-center">
                            <LibroCard {...libro} />
                        </div>
                    ))}
                </div>
            </Container>
        </>
    );
}
