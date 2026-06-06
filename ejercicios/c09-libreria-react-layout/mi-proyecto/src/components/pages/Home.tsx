import '../../App.css'
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import type { Libro } from '../types/libro';

function MyNavbar() {
    return (
        <Navbar expand="lg" className="border-bottom navbar-custom" data-bs-theme="light">
            <Container fluid>
                <Navbar.Brand className='navbar-brand display-6' href="#home">
                    <img
                        alt="Logo Lectura Inteligente"
                        src="src/assets/pila-de-libros-de-tres.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-text-top"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="navbarSupportedContent">
                    <Nav className="me-auto mb-2 mb-lg-0">
                        <Nav.Link className='nav-link active' aria-current='page' href="#home">Home</Nav.Link>
                        <Nav.Link className='nav-link' href="#Catalogo">Catalogo</Nav.Link>
                        <Nav.Link className='nav-link' href="#Contacto">Contacto</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

function MyMain() {
    return (
        <main>
            <Container className='text-center'>
                <Row>
                    <Col className="seccion-bienvenida">
                        <h1 className="display-5">Bienvenido a <b>Lectura Inteligente</b></h1>
                    </Col>
                    <Card className="text-center card-catalogo">
                        <Card.Body style={{ backgroundImage: "url(src/assets/fondoParaBotonCatalogo.jpg)" }}>
                            <Card.Title className="card-title display-6">Revisá nuestro catálogo</Card.Title>
                            <Card.Text>Encontrá el libro que buscás</Card.Text>
                            <Card.Link href="catalogo.html" className="btn btn-primary">Catálogo</Card.Link>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </main>
    );
}

function Footer() {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="border border-2">
                        <h6>Suscribite y recibi las ultimas novedades!</h6>
                        <InputGroup size="sm" className="mb-3">
                            <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="tucorreo@dominio.com" />
                            <Button variant="secondary" className="btn-secundario">Suscribirse</Button>
                        </InputGroup>
                    </Col>
                    <Col className="border-top border-2">
                        <p>Seguinos en redes sociales</p>
                        <Row>
                            <a href="#" style={{ textDecoration: 'none' }}><img src="src/assets/Facebook.svg" alt="Logo Facebook" width={30} height={30} />  Facebook</a>
                        </Row>
                        <Row>
                            <a href="#" style={{ textDecoration: 'none' }}><img src="src/assets/Instagram.svg" alt="Logo Instagram" width={30} height={30} />  Instagram</a>
                        </Row>
                    </Col>
                    <Col className="border border-2">
                        <Card.Text>Link de interes</Card.Text>
                        <p>Politicas de privacidad</p>
                        <p>Terminos y condiciones</p>
                        <p>Ayuda</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

const libros: Libro[] = [
    {
        title: "HARRY POTTER Y LA PIEDRA FILOSOFAL",
        author: "J.K ROWLING",
        cover: "src/assets/Harry Potter y la piedra filosofal.jpg",
    },
    {
        title: "EL PRINCIPITO",
        author: "ANTOINE DE SAINT-EXUPÉRY",
        cover: "src/assets/El Principito.jpeg",
    },
    {
        title: "BAT PAT EL TESORO DEL CEMENTERIO",
        author: "ROBERTO PAVANELLO",
        cover: "src/assets/BatPat El tesoro del cementerio.jpg",
    },
    {
        title: "EL DIARIO DE ANA FRANK",
        author: "ANA FRANK",
        cover: "src/assets/El diario de ana frank.jpg",
    },
    {
        title: "HÁBITOS ATÓMICOS",
        author: "JAMES CLEAR",
        cover: "src/assets/Habitos atomicos.webp",
    },
    {
        title: "GATURRO 15",
        author: "NIK",
        cover: "src/assets/Gaturro.jpg",
    }
];

function CardLibro({ title, author, cover }: Libro) {
    return (
        <Card className="card-libro h-100 shadow-sm">
            {cover && <Card.Img variant="top" src={cover} alt={title} />}
            <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text className="text-muted">{author}</Card.Text>
                </div>
                <Button
                    variant="primary"
                    href={`libro.html?titulo=${encodeURIComponent(title)}&autor=${encodeURIComponent(author)}&cover=${encodeURIComponent(cover || '')}`}
                    className="btn-libro w-100 mt-2"
                >
                    Ver Más
                </Button>
            </Card.Body>
        </Card>
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
    return (
        <>
            <MyNavbar />
            <PromoBanner />
            <MyMain />
            <Container className="my-5">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
                    {libros.map((libro, index) => (
                        <div key={index} className="col d-flex justify-content-center">
                            <CardLibro {...libro} />
                        </div>
                    ))}
                </div>
            </Container>
            <Footer />
        </>
    );
}