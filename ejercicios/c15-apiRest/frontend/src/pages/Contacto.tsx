import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../assets/contacto/Contacto.css';

function Contacto() {
    const [enviado, setEnviado] = useState(false);
    const [datos, setDatos] = useState({ nombre: '', email: '', mensaje: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (datos.nombre && datos.email && datos.mensaje) {
            setEnviado(true);
            setTimeout(() => {
                setEnviado(false);
                setDatos({ nombre: '', email: '', mensaje: '' });
            }, 4000);
        }
    };

    return (
        <Container className="my-5 animacion-entrada">
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">Contacto</h1>
                <p className="contacto-subtitle">Estamos aquí para ayudarte. Ponete en contacto con nuestro equipo.</p>
            </div>

            <Row className="g-5">
                {/* Columna Formulario */}
                <Col lg={7} md={12}>
                    <div className="tarjeta-vidrio p-5 contacto-form-card">
                        <h3 className="fw-bold mb-4 contacto-form-title">Envianos un mensaje</h3>
                        
                        {enviado ? (
                            <div className="text-center py-4 animacion-entrada">
                                <div className="mb-3 contacto-enviado-icon">✉</div>
                                <h4 className="fw-bold text-white">¡Mensaje Enviado!</h4>
                                <p className="mb-0 contacto-enviado-text">
                                    Gracias por contactarte con nosotros. Te responderemos a la brevedad.
                                </p>
                            </div>
                        ) : (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-4">
                                    <Form.Label className="form-label-premium">Nombre Completo</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        value={datos.nombre}
                                        onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
                                        className="form-control-premium"
                                        placeholder="Ej. Juan Pérez"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="form-label-premium">Correo Electrónico</Form.Label>
                                    <Form.Control
                                        type="email"
                                        required
                                        value={datos.email}
                                        onChange={(e) => setDatos({ ...datos, email: e.target.value })}
                                        className="form-control-premium"
                                        placeholder="Ej. juan.perez@dominio.com"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="form-label-premium">Mensaje</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        required
                                        value={datos.mensaje}
                                        onChange={(e) => setDatos({ ...datos, mensaje: e.target.value })}
                                        className="form-control-premium"
                                        placeholder="Escribí tu consulta aquí..."
                                    />
                                </Form.Group>

                                <Button type="submit" className="btn-oro-primario w-100 py-3 mt-2">
                                    Enviar Mensaje
                                </Button>
                            </Form>
                        )}
                    </div>
                </Col>

                {/* Columna Info de Tienda */}
                <Col lg={5} md={12} className="d-flex flex-column justify-content-between">
                    <div className="tarjeta-vidrio p-4 mb-4 contacto-info-card">
                        <h3 className="fw-bold mb-4 contacto-info-title">
                            Información de la Boutique
                        </h3>
                        
                        <div className="mb-4">
                            <h6 className="form-label-premium mb-1">Dirección</h6>
                            <p className="mb-0 contacto-info-item-text">
                                Av. Corrientes 1480, CABA, Argentina
                            </p>
                        </div>

                        <div className="mb-4">
                            <h6 className="form-label-premium mb-1">Horarios de Atención</h6>
                            <p className="mb-0 contacto-info-item-text">
                                Lunes a Sábados: 10:00 a 20:00 hs<br />
                                Domingos: Cerrado
                            </p>
                        </div>

                        <div className="mb-4">
                            <h6 className="form-label-premium mb-1">Teléfono</h6>
                            <p className="mb-0 contacto-info-item-text">
                                +54 11 4875-9200
                            </p>
                        </div>

                        <div>
                            <h6 className="form-label-premium mb-1">Correo Electrónico</h6>
                            <p className="mb-0 contacto-info-item-text">
                                boutique@lecturainteligente.com
                            </p>
                        </div>
                    </div>

                    {/* Simulación Mapa */}
                    <div className="tarjeta-vidrio p-2 flex-grow-1 d-flex flex-column overflow-hidden contacto-mapa-container">
                        <div className="w-100 h-100 rounded position-relative d-flex align-items-center justify-content-center contacto-mapa-inner">
                            {/* Grilla abstracta de fondo */}
                            <div className="contacto-mapa-grid" />
                            
                            {/* Anillo de pulso simulando la ubicación */}
                            <div className="d-flex align-items-center justify-content-center contacto-mapa-pin-outer">
                                <div className="contacto-mapa-pin-inner" />
                            </div>

                            <span className="position-absolute bottom-3 end-3 small px-2 py-1 rounded contacto-mapa-label">
                                Ubicación Boutique
                            </span>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Contacto;
