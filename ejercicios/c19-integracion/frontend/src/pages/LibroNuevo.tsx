import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import { libroSchema } from '../schemas/libroSchema';
import { libroService } from '../services/libroService';
import { autorService } from '../services/autorService';
import type { Autor } from '../types/autor';
import '../assets/libro-nuevo/LibroNuevo.css';

const IMG_PLACEHOLDER = 'https://placehold.co/300x400?text=Lectura+Inteligente';

const normalizar = (texto: string) =>
    texto
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

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

    const [autores, setAutores] = useState<Autor[]>([]);
    const [autorSeleccionadoId, setAutorSeleccionadoId] = useState<number | null>(null);
    const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
    const contenedorAutorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let montado = true;
        autorService.getAutores()
            .then((data) => {
                if (montado) {
                    setAutores(data);
                }
            })
            .catch(() => {
                // Silencioso si falla la carga inicial de autores
            });
        return () => {
            montado = false;
        };
    }, []);

    useEffect(() => {
        const handleClickAfuera = (event: MouseEvent) => {
            if (contenedorAutorRef.current && !contenedorAutorRef.current.contains(event.target as Node)) {
                setMostrarSugerencias(false);
            }
        };
        document.addEventListener('mousedown', handleClickAfuera);
        return () => document.removeEventListener('mousedown', handleClickAfuera);
    }, []);

    const textoAutorNormalizado = normalizar(form.autor);

    const sugerenciasAutores = useMemo(() => {
        if (!textoAutorNormalizado) return [];
        return autores.filter((a) =>
            normalizar(a.nombre).includes(textoAutorNormalizado)
        );
    }, [autores, textoAutorNormalizado]);

    const coincideExacto = useMemo(() => {
        if (!textoAutorNormalizado) return false;
        return autores.some(
            (a) => normalizar(a.nombre) === textoAutorNormalizado
        );
    }, [autores, textoAutorNormalizado]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const target = e.target;
        const valor = target instanceof HTMLInputElement && target.type === 'checkbox'
            ? target.checked
            : target.value;

        setForm((prev) => ({
            ...prev,
            [target.name]: valor
        }));

        if (target.name === 'autor') {
            const texto = typeof valor === 'string' ? valor : '';
            const norm = normalizar(texto);
            const match = autores.find((a) => normalizar(a.nombre) === norm);
            setAutorSeleccionadoId(match ? match.id : null);
        }
    };

    const handleSeleccionarAutor = (autor: Autor) => {
        setForm((prev) => ({
            ...prev,
            autor: autor.nombre
        }));
        setAutorSeleccionadoId(autor.id);
        setMostrarSugerencias(false);
        setErrores((prev) => {
            const copy = { ...prev };
            delete copy.autor;
            return copy;
        });
    };

    const handleCrearNuevoAutorOpcion = () => {
        setAutorSeleccionadoId(null);
        setMostrarSugerencias(false);
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
        setMostrarSugerencias(false);
        const err = validar();
        setErrores(err);
        if (Object.keys(err).length > 0) {
            return;
        }
        setIsSubmitting(true);
        try {
            let finalAutorId = autorSeleccionadoId;

            if (!finalAutorId) {
                const autorExistente = autores.find(
                    (a) => normalizar(a.nombre) === normalizar(form.autor)
                );
                if (autorExistente) {
                    finalAutorId = autorExistente.id;
                } else {
                    const nuevoAutor = await autorService.createAutor({
                        nombre: form.autor.trim(),
                    });
                    finalAutorId = nuevoAutor.id;
                    setAutores((prev) => [...prev, nuevoAutor]);
                }
            }

            await libroService.addLibro({
                titulo: form.titulo.toUpperCase(),
                precio: Number(form.precio),
                imagen: IMG_PLACEHOLDER,
                disponible: form.disponible,
                autorId: finalAutorId,
                autor: { id: finalAutorId, nombre: form.autor.trim() },
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
                        <div className="autor-input-container" ref={contenedorAutorRef}>
                            <Form.Control
                                name="autor"
                                value={form.autor}
                                onChange={(e) => {
                                    handleChange(e);
                                    setMostrarSugerencias(true);
                                }}
                                onFocus={() => {
                                    if (form.autor.trim().length > 0) {
                                        setMostrarSugerencias(true);
                                    }
                                }}
                                isInvalid={!!errores.autor}
                                className="form-control-premium"
                                placeholder="Ej. Paulo Coelho"
                                autoComplete="off"
                            />
                            <Form.Control.Feedback type="invalid" className="nuevo-libro-feedback-error">
                                {errores.autor}
                            </Form.Control.Feedback>
                            {mostrarSugerencias && form.autor.trim().length > 0 && (
                                <ul className="autor-sugerencias-dropdown">
                                    {sugerenciasAutores.map((autor) => (
                                        <li
                                            key={autor.id}
                                            className={`autor-sugerencia-item ${autorSeleccionadoId === autor.id ? 'activo' : ''}`}
                                            onMouseDown={() => handleSeleccionarAutor(autor)}
                                        >
                                            <span className="autor-sugerencia-nombre">{autor.nombre}</span>
                                            {autor.nacionalidad && autor.nacionalidad !== 'Desconocida' && (
                                                <span className="autor-sugerencia-nacionalidad">{autor.nacionalidad}</span>
                                            )}
                                        </li>
                                    ))}
                                    {!coincideExacto && (
                                        <li
                                            className="autor-sugerencia-item-crear"
                                            onMouseDown={handleCrearNuevoAutorOpcion}
                                        >
                                            <span className="autor-sugerencia-crear-texto">
                                                ✨ Crear nuevo autor: &quot;{form.autor.trim()}&quot;
                                            </span>
                                        </li>
                                    )}
                                </ul>
                            )}
                        </div>
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