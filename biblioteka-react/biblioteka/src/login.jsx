import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin , loginError}) => {
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
        onLogin(null); // Call onLogin with null if login fails
        return;
      }

      const data = await response.json();

      if (data.access_token) {
        onLogin(data.access_token);
        console.log('Login successful:', data.access_token);
        navigate('/'); // Redirect to home page after successful login
      } else {
        console.error('Login failed:', data);
        onLogin(null); // Call onLogin with null if login fails
      }
    } catch (error) {
      console.error('Login error:', error);
      onLogin(null); // Call onLogin with null if login fails
    }
  };

  return (
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
      <Button variant="primary" type="submit">
        Uloguj se
      </Button>
    </Form>
  );
};

export default Login;