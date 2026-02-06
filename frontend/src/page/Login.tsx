import React, { useState } from "react";
import { useCont } from "../context/context";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";

export default function login() {
  const { login, register } = useCont();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [show, setShow] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await login(form.email, form.password);
    if (res) navigate("/");
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await register(
      registerForm.name,
      registerForm.email,
      registerForm.password,
    );
    if (res) {
      setIsRegister(false);
      setRegisterForm({ name: "", email: "", password: "" });
    }
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center bg-light"
    >
      <Row className="w-100">
        <Col md={5} lg={4} className="mx-auto">
          <Card className="shadow-lg p-4">
            <Card.Body>
              <h3 className="text-center mb-4 fw-bold">
                {isRegister ? "Register" : "Login"}
              </h3>

              <Form onSubmit={isRegister ? handleRegister : handleLogin}>
                {/* Name (Register only) */}
                {isRegister && (
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={registerForm.name}
                      onChange={handleRegisterChange}
                      required
                    />
                  </Form.Group>
                )}

                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={isRegister ? registerForm.email : form.email}
                    onChange={isRegister ? handleRegisterChange : handleChange}
                    required
                  />
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={show ? "text" : "password"}
                      name="password"
                      placeholder="Enter password"
                      value={isRegister ? registerForm.password : form.password}
                      onChange={
                        isRegister ? handleRegisterChange : handleChange
                      }
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShow(!show)}
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputGroup>
                </Form.Group>

                {/* Submit */}
                <Button type="submit" className="w-100">
                  {isRegister ? "Register" : "Login"}
                </Button>
              </Form>

              {/* Toggle */}
              <div className="text-center mt-3 small">
                {isRegister ? (
                  <>
                    Already have an account?{" "}
                    <span
                      className="text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => setIsRegister(false)}
                    >
                      Login
                    </span>
                  </>
                ) : (
                  <>
                    Don’t have an account?{" "}
                    <span
                      className="text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => setIsRegister(true)}
                    >
                      Register
                    </span>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
