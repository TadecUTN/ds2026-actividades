import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, Link } from 'react-router-dom';
import '../../assets/shared/Header.css';

function MyNavbar() {
    return (
        <Navbar expand="lg" className="navbar-personalizada" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
                    <img
                        alt="Logo Lectura Inteligente"
                        src="/src/assets/shared/pila-de-libros-de-tres.png"
                        width="35"
                        height="35"
                        className="d-inline-block align-middle navbar-logo"
                    />
                    <span className="align-middle fw-bold navbar-brand-text">
                        Lectura Inteligente
                    </span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggle-custom" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <NavLink to='/' className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`}>Home</NavLink>
                        <NavLink to='/catalogo' className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`}>Catálogo</NavLink>
                        <NavLink to='/libros/nuevo' className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`}>Nuevo Libro</NavLink>
                        <NavLink to='/admin/destacados' className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`}>Gestionar Destacados</NavLink>
                        <NavLink to='/contacto' className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`}>Contacto</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;