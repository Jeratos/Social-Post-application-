import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Button } from "react-bootstrap";
import { useCont } from "../context/Context";

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
          <Button variant="primary">
            <Link to="/logout" className="nav-link" style={{ color: "white" }}>Logout</Link>
          </Button>
        ) : (
          <Button variant="primary">
           <Link to="/login" className="nav-link" style={{ color: "white" }}>Login</Link>
          </Button>
        )}
      </Container>
    </Navbar>
  );
}
