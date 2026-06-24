import Container from 'react-bootstrap/Container';
import LibroCard from '../components/LibroCard';
import type { Libro } from '../types/libro';

function Catalogo({ libros }: { libros: Libro[] }) {
    return (
        <Container className="my-4">
            <h1 className="text-center mb-4">Nuestro Catálogo</h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
                {libros.map((libro) => (
                    <div key={libro.id} className="col d-flex justify-content-center">
                        <LibroCard {...libro} />
                    </div>
                ))}
            </div>
        </Container>
    );
}

export default Catalogo;
