import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { Libro } from '../types/libro';
import '../assets/shared/LibroCard.css';

function LibroCard({ id, title, author, cover }: Libro) {
    const DEFAULT_COVER = 'https://placehold.co/300x400?text=Lectura+Inteligente';

    return (
        <Card className="tarjeta-libro h-100">
            <div className="contenedor-portada">
                <img 
                    src={cover || DEFAULT_COVER} 
                    alt={title} 
                    className="portada-imagen" 
                />
            </div>
            <Card.Body className="d-flex flex-column justify-content-between p-4 tarjeta-libro-body">
                <div className="mb-3">
                    <Card.Title className="fw-bold text-white mb-2 tarjeta-libro-title">
                        {title}
                    </Card.Title>
                    <Card.Text className="tarjeta-libro-author">
                        {author}
                    </Card.Text>
                </div>
                <Link 
                    to={`/libros/${id}`}
                    className="btn btn-oro-primario text-center w-100"
                >
                    Ver Más
                </Link>
            </Card.Body>
        </Card>
    );
}

export default LibroCard;