import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin, loginError }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const login = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        onLogin(null);
        return;
      }

      const data = await response.json();

      if (data.access_token) {
        onLogin(data.access_token);
        console.log('Login successful:', data.access_token);
        navigate('/'); // Redirect to home page after successful login
      } else {
        console.error('Login failed:', data);
        onLogin(null);
      }
    } catch (error) {
      console.error('Login error:', error);
      onLogin(null);
    }
  };

  // Redirect to admin login page
  const redirectToAdmin = () => {
    navigate('/admin/login');
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="p-4 shadow">
            <Card.Body>
              <Card.Title className="mb-4 text-center">Prijava korisnika</Card.Title>
              <Form onSubmit={login}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Unesi email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Šifra</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Šifra"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">
                    {loginError && <span className="text-danger">{loginError}</span>}
                  </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Uloguj se
                </Button>
              </Form>

              <hr />

              <Button variant="secondary" onClick={redirectToAdmin} className="w-100 mt-2">
                Admin Login
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
