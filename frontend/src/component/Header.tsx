import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Button } from "react-bootstrap";
import { useCont } from "../Context/Context";

export default function Header() {
  const { isLogin } = useCont();
  const navigate = useNavigate();

  const navToHome = () => {
    navigate("/");
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      fixed="top"
      className="shadow-sm py-2"
    >
      <Container>
        <Navbar.Brand
          onClick={navToHome}
          style={{ cursor: "pointer", fontWeight: "bold" }}
        >
          Social Post
        </Navbar.Brand>

        {isLogin ? (
          <Button as={Link} to="/logout" variant="primary">
            Logout
          </Button>
        ) : (
          <Button as={Link} to="/login" variant="primary">
            Login
          </Button>
        )}
      </Container>
    </Navbar>
  );
}
