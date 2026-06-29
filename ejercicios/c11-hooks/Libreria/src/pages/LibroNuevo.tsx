import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import type { Libro } from '../types/libro';
import { libroSchema } from '../schemas/libroSchema';
import '../assets/libro-nuevo/LibroNuevo.css';

const IMG_PLACEHOLDER = 'https://placehold.co/300x400?text=Lectura+Inteligente';

interface LibroNuevoProps {
    onAgregar: (libro: Libro) => void;
}

function LibroNuevo({ onAgregar }: LibroNuevoProps) {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        titulo: '',
        autor: '',
        precio: '',
        disponible: true
    });
    const [errores, setErrores] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        } as typeof prev));
    };

    const validar = () => {
        const resultado = libroSchema.safeParse({
            titulo: form.titulo,
            autor: form.autor,
            precio: form.precio === '' ? undefined : Number(form.precio),
            disponible: form.disponible,
        });

        const nuevosErrores: Record<string, string> = {};
        if (!resultado.success) {
            for (const issue of resultado.error.issues) {
                const campo = String(issue.path[0]);
                if (!nuevosErrores[campo]) nuevosErrores[campo] = issue.message;
            }
        }
        return nuevosErrores;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const err = validar();
        setErrores(err);
        if (Object.keys(err).length > 0) {
            return;
        }
        onAgregar({
            id: Date.now(),
            title: form.titulo.toUpperCase(), // Mantenemos coherencia con los títulos en mayúsculas de los datos iniciales
            author: form.autor.toUpperCase(),
            precio: Number(form.precio),
            cover: IMG_PLACEHOLDER,
            disponible: form.disponible,
        });
        navigate('/catalogo');
    };

    return (
        <Container className="my-5 d-flex justify-content-center animacion-entrada">
            <div className="tarjeta-vidrio p-5 w-100 nuevo-libro-card">
                <h2 className="text-center mb-4 pb-3 nuevo-libro-titulo">Agregar Nuevo Libro</h2>
                
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                        <Form.Label className="form-label-premium">Título del Libro</Form.Label>
                        <Form.Control
                            name="titulo"
                            value={form.titulo}
                            onChange={handleChange}
                            isInvalid={!!errores.titulo}
                            className="form-control-premium"
                            placeholder="Ej. El Alquimista"
                        />
                        <Form.Control.Feedback type="invalid" className="nuevo-libro-feedback-error">
                            {errores.titulo}
                        </Form.Control.Feedback>
                    </Form.Group>
 
                    <Form.Group className="mb-4">
                        <Form.Label className="form-label-premium">Autor</Form.Label>
                        <Form.Control
                            name="autor"
                            value={form.autor}
                            onChange={handleChange}
                            isInvalid={!!errores.autor}
                            className="form-control-premium"
                            placeholder="Ej. Paulo Coelho"
                        />
                        <Form.Control.Feedback type="invalid" className="nuevo-libro-feedback-error">
                            {errores.autor}
                        </Form.Control.Feedback>
                    </Form.Group>
 
                    <Form.Group className="mb-4">
                        <Form.Label className="form-label-premium">Precio ($)</Form.Label>
                        <Form.Control
                            type="number"
                            name="precio"
                            value={form.precio}
                            onChange={handleChange}
                            isInvalid={!!errores.precio}
                            className="form-control-premium"
                            placeholder="Ej. 4500"
                        />
                        <Form.Control.Feedback type="invalid" className="nuevo-libro-feedback-error">
                            {errores.precio}
                        </Form.Control.Feedback>
                    </Form.Group>
 
                    <Form.Group className="mb-4">
                        <Form.Check
                            type="checkbox"
                            id="disponible-check"
                            label="Disponible para Venta"
                            name="disponible"
                            checked={form.disponible}
                            onChange={handleChange}
                            className="text-white-50 nuevo-libro-checkbox"
                        />
                    </Form.Group>
 
                    <Button type="submit" className="btn-oro-primario w-100 py-3 mt-2">
                        Registrar Libro
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

export default LibroNuevo;