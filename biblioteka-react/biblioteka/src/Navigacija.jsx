import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function BasicExample({}) {
  
  const loggedIn = localStorage.getItem("token") !== null;

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
            ) : (
              null
            )}
             {!loggedIn ? (
              <Nav.Link href="/login">Login</Nav.Link>
            ) : (
              <Nav.Link href="/logout">Logout</Nav.Link>
            )}
             
        
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;