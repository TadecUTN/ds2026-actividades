import '../assets/home/Home.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import LibroCard from '../components/LibroCard';
import { libros } from '../data/libros';

function MyMain() {
    return (
        <main className="py-4">
            <Container>
                <div className="tarjeta-vidrio p-5 text-center position-relative overflow-hidden home-hero">
                    <div className="home-glow-top" />
                    <div className="home-glow-bottom" />
                    
                    <h1 className="display-4 mb-3 home-title">
                        Bienvenido a <span className="home-brand">Lectura Inteligente</span>
                    </h1>
                    <p className="mx-auto mb-4 home-subtitle">
                        Descubrí nuestro catálogo curado de clásicos inmortales, literatura de ficción cautivadora y guías de desarrollo personal para mentes exigentes.
                    </p>
                    <div className="d-flex gap-3 justify-content-center flex-wrap">
                        <Link to="/catalogo" className="btn btn-oro-primario">
                            Explorar Catálogo
                        </Link>
                        <Link to="/libros/nuevo" className="btn btn-oro-esquema">
                            Agregar Libro
                        </Link>
                    </div>
                </div>
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
        <Container className="mt-4">
            <Alert onClose={() => setVer(false)} dismissible className="banner-promo p-4 text-center border-0">
                <h4 className="fw-bold mb-2 promo-title">
                    ¡Solo por hoy!
                </h4>
                <p className="mb-0 promo-text">
                    Aprovechá un <strong className="text-white">20% de descuento</strong> en todas las novelas de ficción usando el código <strong className="promo-code">ELPRINCIPITO20</strong>.
                </p>
            </Alert>
        </Container>
    );
}

export default function Home() {
    // Mostramos los primeros 3 libros como destacados en la Home
    const destacados = libros.slice(0, 3);

    return (
        <div className="animacion-entrada">
            <PromoBanner />
            <MyMain />
            <Container className="my-5">
                <h2 className="text-center mb-5">Libros Destacados</h2>
                <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
                    {destacados.map((libro) => (
                        <Col key={libro.id} className="d-flex justify-content-center">
                            <LibroCard {...libro} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}
