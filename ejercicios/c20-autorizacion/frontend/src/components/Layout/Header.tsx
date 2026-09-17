import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import '../../assets/shared/Header.css';

function MyNavbar() {
    const { usuario, tieneRol, logout } = useAuth();
    const navigate = useNavigate();

    const manejarSesion = () => {
        if (usuario) {
            logout();
            navigate('/');
        } else {
            navigate('/login');
        }
    };

    return (
        <Navbar expand="lg" className="navbar-personalizada" variant="light">
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
                        {tieneRol('ADMIN') && (
                            <>
                                <NavLink to='/libros/nuevo' className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`}>
                                    Nuevo libro
                                </NavLink>
                                <NavLink to='/admin/destacados' className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`}>
                                    Gestionar Destacados
                                </NavLink>
                            </>
                        )}
                        <NavLink to='/contacto' className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`}>Contacto</NavLink>
                        {usuario && (
                            <Navbar.Text className="ms-lg-3 me-2">
                                Hola, {usuario.nombre}
                            </Navbar.Text>
                        )}
                        <button
                            type="button"
                            className="btn-login btn btn-outline-secondary btn-sm navbar-btn-logout ms-2"
                            onClick={manejarSesion}
                        >
                            {usuario ? 'Salir' : 'Ingresar'}
                        </button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;