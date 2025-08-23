import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router";

function Navigacija({}) {
  const loggedIn = localStorage.getItem("token") !== null;
  const loggedInAdmin = localStorage.getItem("adminToken") !== null;
  const navigate = useNavigate();

  const izloguj = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const izlogujAdmin = () => {
    console.log("remove admin token");
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  if (!loggedInAdmin) {
    return (
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/">Biblioteka</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Početna stranica</Nav.Link>
              {loggedIn ? (
                <Nav.Link as={Link} to="/pozajmice">Pozajmice</Nav.Link>
              ) : null}
              {loggedIn ? (
                <Nav.Link as={Link} to="/rezervacije">Rezervacije</Nav.Link>
              ) : null}
              {!loggedIn ? (
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
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
        <Navbar.Brand as={Link} to="/admin">Biblioteka Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin">Početna stranica</Nav.Link>

            <Nav.Link as={Link} to="/admin/clanovi">Pregled članova</Nav.Link>

            <Nav.Link onClick={izlogujAdmin}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigacija;
