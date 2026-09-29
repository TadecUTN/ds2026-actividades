import { Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function SinPermiso() {
    return (
        <Container className="my-5 animacion-entrada">
            <Alert variant="warning" className="text-center p-4">
                <Alert.Heading>Acceso Denegado</Alert.Heading>
                <p>No tenés los permisos necesarios para acceder a esta página.</p>
                <hr />
                <div className="d-flex justify-content-center">
                    <Link to="/catalogo" className="btn btn-outline-warning">
                        Volver al catálogo
                    </Link>
                </div>
            </Alert>
        </Container>
    );
}
