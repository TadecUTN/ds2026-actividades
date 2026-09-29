import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { Libro } from '../types/libro';
import { formatearPrecio } from '../utils/formatearPrecio';
import '../assets/shared/LibroCard.css';

function LibroCard({ id, titulo, autor, imagen, precio }: Libro) {
    const [imgError, setImgError] = useState(false);

    const hasCover = imagen && imagen.trim() !== '' && !imgError;

    return (
        <Card className="tarjeta-libro h-100 w-100">
            <div className="contenedor-portada">
                {hasCover ? (
                    <>
                        <img 
                            src={imagen} 
                            alt="" 
                            className="portada-bg" 
                            aria-hidden="true"
                        />
                        <img 
                            src={imagen} 
                            alt={titulo} 
                            className="portada-imagen" 
                            onError={() => setImgError(true)}
                        />
                    </>
                ) : (
                    <div className="portada-fallback d-flex flex-column align-items-center justify-content-center p-4 text-center">
                        <div className="portada-fallback-icon mb-2">📖</div>
                        <div className="portada-fallback-title fw-bold mb-1">{titulo}</div>
                        <div className="portada-fallback-author small">{autor.nombre}</div>
                    </div>
                )}
            </div>
            <Card.Body className="d-flex flex-column justify-content-between p-4 tarjeta-libro-body">
                <div className="mb-3">
                    <Card.Title className="fw-bold mb-2 tarjeta-libro-title">
                        {titulo}
                    </Card.Title>
                    <Card.Text className="tarjeta-libro-author mb-1">
                        {autor.nombre}
                    </Card.Text>
                    {precio !== undefined && (
                        <div className="tarjeta-libro-precio fw-bold mt-1 text-primary">
                            {formatearPrecio(precio)}
                        </div>
                    )}
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