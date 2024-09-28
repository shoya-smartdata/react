// Login.js
import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import './Login.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

 
    if (!email || !password) {
      setError('Both fields are required!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4001/api/login', { email, password });

      localStorage.setItem('token', response.data.token);

      console.log('Login successful:', response.data.message);
      navigate('/getdata'); 
    } catch (err) {
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('An error occurred during login');
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
        <Card.Body>
          <h2 className="text-center">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Login
            </Button>
          </Form>

          <div className="text-center mt-3">
            <p>
              Don't have an account? <Link to="/adduser">Sign Up</Link>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
