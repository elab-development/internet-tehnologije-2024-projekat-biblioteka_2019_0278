import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ onAdminLogin, loginError }) => {
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
      const response = await fetch('http://127.0.0.1:8000/api/admin/login', {
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
        console.error('Admin login failed:', errorData);
        onAdminLogin(null);
        return;
      }

      const data = await response.json();

      if (data.access_token) {
        localStorage.setItem('adminToken', data.access_token);
        onAdminLogin(data.access_token);
        console.log('Admin login successful:', data.access_token);
        navigate('/admin'); 
      } else {
        console.error('Admin login failed:', data);
        onAdminLogin(null);
      }
    } catch (error) {
      console.error('Admin login error:', error);
      onAdminLogin(null);
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <Form onSubmit={login}>
        <Form.Group className="mb-3" controlId="formAdminEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Unesi admin email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAdminPassword">
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
          Uloguj se kao admin
        </Button>
      </Form>
    </div>
  );
};

export default AdminLogin;
