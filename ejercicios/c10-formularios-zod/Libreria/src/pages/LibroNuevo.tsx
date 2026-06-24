import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import type { Libro } from '../types/libro';
import { libroSchema } from '../schemas/libroSchema';

const IMG_PLACEHOLDER = 'https://placehold.co/300x400?text=Libro';

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
            title: form.titulo,
            author: form.autor,
            precio: Number(form.precio),
            cover: IMG_PLACEHOLDER,
            disponible: form.disponible,
        });
        navigate('/catalogo');
    };

    return (
        <Form onSubmit={handleSubmit} className="container py-4" style={{ maxWidth: 480 }}>
            <h2>Nuevo libro</h2>
            <Form.Group className="mb-3">
                <Form.Label>Título</Form.Label>
                <Form.Control
                    name="titulo"
                    value={form.titulo}
                    onChange={handleChange}
                    isInvalid={!!errores.titulo}
                />
                <Form.Control.Feedback type="invalid">
                    {errores.titulo}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Autor</Form.Label>
                <Form.Control
                    name="autor"
                    value={form.autor}
                    onChange={handleChange}
                    isInvalid={!!errores.autor}
                />
                <Form.Control.Feedback type="invalid">
                    {errores.autor}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                    type="number"
                    name="precio"
                    value={form.precio}
                    onChange={handleChange}
                    isInvalid={!!errores.precio}
                />
                <Form.Control.Feedback type="invalid">
                    {errores.precio}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Check
                className="mb-3"
                label="Disponible"
                name="disponible"
                checked={form.disponible}
                onChange={handleChange}
            />

            <Button type="submit">Agregar libro</Button>
        </Form>
    );
}

export default LibroNuevo;