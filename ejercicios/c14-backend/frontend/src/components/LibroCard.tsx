import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { Libro } from '../types/libro';
import '../assets/shared/LibroCard.css';

function LibroCard({ id, title, author, cover }: Libro) {
    const [imgError, setImgError] = useState(false);

    const hasCover = cover && cover.trim() !== '' && !imgError;

    return (
        <Card className="tarjeta-libro h-100 w-100">
            <div className="contenedor-portada">
                {hasCover ? (
                    <>
                        <img 
                            src={cover} 
                            alt="" 
                            className="portada-bg" 
                            aria-hidden="true"
                        />
                        <img 
                            src={cover} 
                            alt={title} 
                            className="portada-imagen" 
                            onError={() => setImgError(true)}
                        />
                    </>
                ) : (
                    <div className="portada-fallback d-flex flex-column align-items-center justify-content-center p-4 text-center">
                        <div className="portada-fallback-icon mb-2">📖</div>
                        <div className="portada-fallback-title fw-bold text-white mb-1">{title}</div>
                        <div className="portada-fallback-author small text-white-50">{author}</div>
                    </div>
                )}
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