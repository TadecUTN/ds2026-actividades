import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import '../../assets/shared/Header.css';

function MyNavbar() {
    const { usuario, estaAutenticado, esAdmin, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
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
                        {esAdmin && (
                            <>
                                <NavLink to='/libros/nuevo' className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`}>
                                    Nuevo Libro
                                </NavLink>
                                <NavLink to='/admin/destacados' className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`}>
                                    Gestionar Destacados
                                </NavLink>
                            </>
                        )}
                        <NavLink to='/contacto' className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`}>Contacto</NavLink>
                        {estaAutenticado ? (
                            <div className="d-flex align-items-center ms-lg-3 my-2 my-lg-0 navbar-auth-info">
                                <span className="navbar-user-badge">
                                    {usuario?.nombre || 'Usuario'}
                                    <span className="navbar-role-pill">{usuario?.rol || 'USER'}</span>
                                </span>
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={handleLogout}
                                    className="navbar-btn-logout ms-2"
                                >
                                    Cerrar Sesión
                                </Button>
                            </div>
                        ) : (
                            <NavLink to='/login' className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`}>
                                Iniciar Sesión
                            </NavLink>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;