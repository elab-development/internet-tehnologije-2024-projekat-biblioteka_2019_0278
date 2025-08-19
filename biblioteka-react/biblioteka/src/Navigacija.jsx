import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router";

function Navigacija({}) {
  const loggedIn = localStorage.getItem("token") !== null;
  const loggedInAdmin = localStorage.getItem("adminToken") !== null;
  const navigate = useNavigate();

  const izloguj = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const izlogujAdmin = () => {
    localStorage.removeItem("tokenAdmin");
    navigate("/admin/login");
  };

  if (!loggedInAdmin) {
    return (
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Biblioteka</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Početna stranica</Nav.Link>
              {loggedIn ? (
                <Nav.Link href="/pozajmice">Pozajmice</Nav.Link>
              ) : null}
              {!loggedIn ? (
                <Nav.Link href="/login">Login</Nav.Link>
              ) : (
                <Nav.Link onClick={izloguj}>Logout</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/admin/">Biblioteka Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/admin/">Početna stranica</Nav.Link>
            {loggedInAdmin ? (
              <Nav.Link href="/admin/pozajmice">Pozajmice</Nav.Link>
            ) : null}

            <Nav.Link onClick={izlogujAdmin}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigacija;
