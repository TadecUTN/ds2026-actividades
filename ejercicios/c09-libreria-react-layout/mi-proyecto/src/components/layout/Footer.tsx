import { Container, Row, Col, InputGroup, Form, Button, Card } from "react-bootstrap";

function Footer() {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="border border-2">
                        <h6>Suscribite y recibi las ultimas novedades!</h6>
                        <InputGroup size="sm" className="mb-3">
                            <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="tucorreo@dominio.com" />
                            <Button variant="secondary" className="btn-secundario">Suscribirse</Button>
                        </InputGroup>
                    </Col>
                    <Col className="border-top border-2">
                        <p>Seguinos en redes sociales</p>
                        <Row>
                            <a href="#" style={{ textDecoration: 'none' }}><img src="src/assets/Facebook.svg" alt="Logo Facebook" width={30} height={30} />  Facebook</a>
                        </Row>
                        <Row>
                            <a href="#" style={{ textDecoration: 'none' }}><img src="src/assets/Instagram.svg" alt="Logo Instagram" width={30} height={30} />  Instagram</a>
                        </Row>
                    </Col>
                    <Col className="border border-2">
                        <Card.Text>Link de interes</Card.Text>
                        <p>Politicas de privacidad</p>
                        <p>Terminos y condiciones</p>
                        <p>Ayuda</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;