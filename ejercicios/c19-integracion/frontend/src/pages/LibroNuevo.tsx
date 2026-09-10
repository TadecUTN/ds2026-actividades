import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import { libroSchema } from '../schemas/libroSchema';
import { libroService } from '../services/libroService';
import '../assets/libro-nuevo/LibroNuevo.css';

const IMG_PLACEHOLDER = 'https://placehold.co/300x400?text=Lectura+Inteligente';

function LibroNuevo() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        titulo: '',
        autor: '',
        categoria: '',
        precio: '',
        disponible: true
    });
    const [errores, setErrores] = useState<Record<string, string>>({});
    const [errorServidor, setErrorServidor] = useState<string | null>(null);
    const [mensajeExito, setMensajeExito] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const target = e.target;
        const valor = target instanceof HTMLInputElement && target.type === 'checkbox'
            ? target.checked
            : target.value;

        setForm((prev) => ({
            ...prev,
            [target.name]: valor
        }));
    };

    const validar = () => {
        const resultado = libroSchema.safeParse({
            titulo: form.titulo,
            autor: form.autor,
            categoria: form.categoria,
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorServidor(null);
        setMensajeExito(null);
        const err = validar();
        setErrores(err);
        if (Object.keys(err).length > 0) {
            return;
        }
        setIsSubmitting(true);
        try {
            await libroService.addLibro({
                titulo: form.titulo.toUpperCase(),
                autor: { nombre: form.autor.toUpperCase() },
                precio: Number(form.precio),
                imagen: IMG_PLACEHOLDER,
                disponible: form.disponible,
                autorId: 1,
            });
            const tituloConfirmado = form.titulo.toUpperCase();
            setMensajeExito(`¡El libro "${tituloConfirmado}" fue agregado con éxito al catálogo real!`);
            setTimeout(() => {
                navigate('/catalogo', { state: { libroAgregado: tituloConfirmado } });
            }, 1200);
        } catch (error: unknown) {
            const mensaje = error instanceof Error ? error.message : 'Error al registrar el libro';
            setErrorServidor(mensaje);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container className="my-5 d-flex justify-content-center animacion-entrada">
            <div className="tarjeta-vidrio p-5 w-100 nuevo-libro-card">
                <h2 className="text-center mb-4 pb-3 nuevo-libro-titulo">Agregar Nuevo Libro</h2>

                {mensajeExito && (
                    <Alert variant="success" className="mb-4 text-center animacion-entrada">
                        {mensajeExito}
                    </Alert>
                )}
                
                {errorServidor && (
                    <Alert variant="danger" className="mb-4 text-center">
                        {errorServidor}
                    </Alert>
                )}
                
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
                        <Form.Label className="form-label-premium">Categoria</Form.Label>
                        <Form.Select
                            name="categoria"
                            value={form.categoria}
                            onChange={handleChange}
                            isInvalid={!!errores.categoria}
                            className="form-control-premium"
                        >
                            <option value="">Selecciona una opción</option>
                            <option value="Ficcion">Ficcion</option>
                            <option value="Ciencia Ficción">Ciencia Ficción</option>
                            <option value="Clásicos">Clásicos</option>
                            <option value="Tecnología">Tecnología</option>
                            <option value="Historia">Historia</option>
                            <option value="Misterio">Misterio</option>
                            <option value="Filosofía">Filosofía</option>
                            <option value="Drama">Drama</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid" className="nuevo-libro-feedback-error">
                            {errores.categoria}
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
                            className="nuevo-libro-checkbox"
                        />
                    </Form.Group>

                    <Button
                        type="submit"
                        className="btn-oro-primario w-100 py-3 mt-2"
                        disabled={isSubmitting || !!mensajeExito}
                    >
                        {isSubmitting ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    className="me-2"
                                />
                                Registrando...
                            </>
                        ) : (
                            'Registrar Libro'
                        )}
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

export default LibroNuevo;