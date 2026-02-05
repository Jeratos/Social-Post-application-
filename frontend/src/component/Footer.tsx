import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row className="text-center">
          <Col>
            <p className="mb-2 small">
              &copy; {new Date().getFullYear()} Task Management. All rights reserved.
            </p>

            <div className="d-flex justify-content-center gap-4 small">
              <a href="#" className="text-light text-decoration-none">
                Privacy Policy
              </a>
              <a href="#" className="text-light text-decoration-none">
                Terms of Service
              </a>
              <a href="#" className="text-light text-decoration-none">
                Contact Us
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
