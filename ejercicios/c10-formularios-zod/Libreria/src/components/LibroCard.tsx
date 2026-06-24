import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { Libro } from '../types/libro';

function LibroCard({ id, title, author, cover }: Libro) {
    return (
        <Card className="card-libro h-100 shadow-sm">
            {cover && <Card.Img variant="top" src={cover} alt={title} />}
            <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text className="text-muted">{author}</Card.Text>
                </div>
                <Link to={`/libros/${id}`}
                    className="btn btn-primary w-100 mt-2"
                >
                    Ver Más
                </Link>
            </Card.Body>
        </Card>
    );
}

export default LibroCard;