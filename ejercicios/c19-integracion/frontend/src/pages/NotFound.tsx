import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <Container className="my-5 d-flex justify-content-center align-items-center animacion-entrada" style={{ minHeight: '60vh' }}>
            <div className="tarjeta-vidrio p-5 text-center" style={{ maxWidth: '560px', width: '100%' }}>
                <div style={{ fontSize: '4.5rem', lineHeight: 1 }} className="mb-3">
                    🧭
                </div>
                <h1 className="display-3 fw-bold mb-2" style={{ color: 'var(--color-primario)' }}>
                    404
                </h1>
                <h2 className="h4 fw-semibold mb-3">Página no encontrada</h2>
                <p className="text-muted mb-4">
                    La página que estás buscando no existe o fue trasladada. Te invitamos a regresar a nuestra colección principal.
                </p>
                <Link
                    to="/"
                    className="btn btn-oro-primario py-2 px-4"
                >
                    Volver al Inicio
                </Link>
            </div>
        </Container>
    );
}

export default NotFound;
