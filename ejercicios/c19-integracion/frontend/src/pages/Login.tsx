import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import { loginSchema } from '../schemas/loginSchema';
import { apiFetch } from '../services/api';
import { guardarToken } from '../services/sesion';
import '../assets/login/Login.css';

interface LoginRespuesta {
    token: string;
    usuario: {
        id: number;
        email: string;
        nombre: string;
        rol: string;
    };
}

function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [errores, setErrores] = useState<Record<string, string>>({});
    const [errorApi, setErrorApi] = useState<string | null>(null);
    const [cargando, setCargando] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validar = () => {
        const resultado = loginSchema.safeParse(form);
        const nuevosErrores: Record<string, string> = {};
        if (!resultado.success) {
            for (const issue of resultado.error.issues) {
                const campo = String(issue.path[0]);
                if (!nuevosErrores[campo]) {
                    nuevosErrores[campo] = issue.message;
                }
            }
        }
        return nuevosErrores;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorApi(null);

        const err = validar();
        setErrores(err);
        if (Object.keys(err).length > 0) {
            return;
        }

        setCargando(true);
        try {
            const respuesta = await apiFetch<LoginRespuesta>('/auth/login', {
                method: 'POST',
                body: JSON.stringify(form),
            });

            guardarToken(respuesta.token);
            navigate('/catalogo');
        } catch (error: unknown) {
            const mensaje = error instanceof Error ? error.message : 'Error al iniciar sesión';
            if (mensaje.toLowerCase().includes('intentos') || mensaje.toLowerCase().includes('ip') || mensaje.includes('429')) {
                setErrorApi('Espere un momento para volver a intentar');
            } else {
                setErrorApi(mensaje);
            }
        } finally {
            setCargando(false);
        }
    };

    return (
        <Container className="my-5 d-flex justify-content-center animacion-entrada">
            <div className="tarjeta-vidrio p-5 w-100 login-card">
                <h2 className="text-center mb-4 pb-3 login-titulo">Iniciar Sesión</h2>

                {errorApi && (
                    <Alert variant="danger" className="mb-4 text-center">
                        {errorApi}
                    </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                        <Form.Label className="form-label-premium">Correo Electrónico</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            isInvalid={!!errores.email}
                            className="form-control-premium"
                            placeholder="ejemplo@libreria.test"
                        />
                        <Form.Control.Feedback type="invalid" className="login-feedback-error">
                            {errores.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="form-label-premium">Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            isInvalid={!!errores.password}
                            className="form-control-premium"
                            placeholder="••••••••"
                        />
                        <Form.Control.Feedback type="invalid" className="login-feedback-error">
                            {errores.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button
                        type="submit"
                        className="btn-oro-primario w-100 py-3 mt-2"
                        disabled={cargando}
                    >
                        {cargando ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    className="me-2"
                                />
                                Ingresando...
                            </>
                        ) : (
                            'Ingresar'
                        )}
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

export default Login;
