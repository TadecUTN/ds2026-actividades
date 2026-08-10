import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import '../../assets/shared/Footer.css';

function Footer() {
    return (
        <footer className="footer-personalizado">
            <Container>
                <Row className="gy-4">
                    <Col lg={4} md={6}>
                        <h6>Lectura Inteligente</h6>
                        <p className="small mb-4 footer-description">
                            Tu portal premium a mundos infinitos de sabiduría y aventura. Descubrí el placer de leer con nosotros.
                        </p>
                        <p className="small text-muted">&copy; {new Date().getFullYear()} Lectura Inteligente. Todos los derechos reservados.</p>
                    </Col>
                    
                    <Col lg={4} md={6}>
                        <h6>Novedades por Mail</h6>
                        <p className="small mb-3">Suscribite para recibir lanzamientos exclusivos y ofertas especiales.</p>
                        <InputGroup className="mb-3">
                            <Form.Control 
                                aria-label="Correo electrónico" 
                                placeholder="tuemail@dominio.com" 
                                className="form-control-premium"
                            />
                            <Button className="btn-oro-primario">Suscribirme</Button>
                        </InputGroup>
                    </Col>
                    
                    <Col lg={2} md={6}>
                        <h6>Seguinos</h6>
                        <div className="d-flex flex-column">
                            <a href="#" className="footer-link d-flex align-items-center gap-2 mb-2">
                                <img src="/src/assets/shared/Facebook.svg" alt="Facebook" width={18} height={18} className="footer-social-icon" />
                                Facebook
                            </a>
                            <a href="#" className="footer-link d-flex align-items-center gap-2 mb-2">
                                <img src="/src/assets/shared/Instagram.svg" alt="Instagram" width={18} height={18} className="footer-social-icon" />
                                Instagram
                            </a>
                        </div>
                    </Col>
                    
                    <Col lg={2} md={6}>
                        <h6>Explorar</h6>
                        <div className="d-flex flex-column">
                            <a href="#" className="footer-link">Políticas de Privacidad</a>
                            <a href="#" className="footer-link">Términos y Condiciones</a>
                            <a href="#" className="footer-link">Centro de Ayuda</a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;