import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';

function MyNavbar() {
    return (
        <Navbar expand="lg" className="border-bottom navbar-custom" data-bs-theme="light">
            <Container fluid>
                <Navbar.Brand className='navbar-brand display-6' href="#home">
                    <img
                        alt="Logo Lectura Inteligente"
                        src="/src/assets/pila-de-libros-de-tres.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-text-top"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="navbarSupportedContent">
                    <Nav className="me-auto mb-2 mb-lg-0">
                        <Nav.Link as={Link} to='/' className='nav-link active' aria-current='page'>Home</Nav.Link>
                        <Nav.Link as={Link} to='/catalogo' className='nav-link'>Catalogo</Nav.Link>
                        <Nav.Link as={Link} to='/contacto' className='nav-link'>Contacto</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;