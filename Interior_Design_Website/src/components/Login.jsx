import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, storeToken } from '../services/TokenServices';
import { login } from '../services/LoginServices';
import { storeRole } from '../services/RoleServices';
import { toast, Slide } from 'react-toastify';

export function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '', 
  });

  const navigate = useNavigate();

 useEffect(() => {
    const token = getToken();
    if (token) {
      toast.info('You are already logged in!', {
        position: 'top-right',
        autoClose: 1000,
        theme: 'colored',
        transition: Slide,
      });

      
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  }, [navigate]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

 
    if (!formData.email.trim()) {
      toast.error('Email is required!', { position: 'top-right', autoClose: 2000, theme: 'colored', transition: Slide });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Enter a valid email address!', { position: 'top-right', autoClose: 2000, theme: 'colored', transition: Slide });
      return;
    }

    if (!formData.password.trim()) {
      toast.error('Password cannot be empty!', { position: 'top-right', autoClose: 2000, theme: 'colored', transition: Slide });
      return;
    }

    if (!formData.role) {
      toast.error('Please select your role (Admin or Customer)!', { position: 'top-right', autoClose: 2000, theme: 'colored', transition: Slide });
      return;
    }

    try {
      console.log('Login request:', formData);
      const response = await login(formData);
      console.log('Response:', response.data);

      if (response.status === 200) {
        storeToken(response.data.token);
        storeRole(formData.role);


        toast.success('Login successful!', {
          position: 'top-right',
          autoClose: 2000,
          theme: 'colored',
          transition: Slide,
        });

        setTimeout(() => {
          if (formData.role === 'admin') {
            navigate('/admin');
          } else if (formData.role === 'customer') {
            navigate('/');
          } else {
            toast.error('Unknown user type!', {
              position: 'top-right',
              autoClose: 2000,
              theme: 'colored',
              transition: Slide,
            });
          }
        }, 1500);
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error(
        error.response?.data?.message || 'Invalid credentials or server error.',
        {
          position: 'top-right',
          autoClose: 3000,
          theme: 'colored',
          transition: Slide,
        }
      );
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        backgroundColor: '#FCECEC',
        margin: '0',
        padding: '0',
      }}
    >
      <Card
        style={{
          width: '25rem',
          padding: '30px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderRadius: '10px',
        }}
      >
        <Card.Title
          className="text-center text-danger mb-4"
          style={{ fontSize: '1.8rem', fontWeight: 'bold' }}
        >
          Login
        </Card.Title>

        <Form onSubmit={handleSubmit}>
          {/* Email */}
          <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3">
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
            />
          </FloatingLabel>

          
          <FloatingLabel controlId="floatingPassword" label="Password" className="mb-4">
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </FloatingLabel>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">Select Type</Form.Label>
            <div>
              <Form.Check
                inline
                label="customer"
                name="role"
                type="radio"
                value="customer"
                checked={formData.role === 'customer'}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Admin"
                name="role"
                type="radio"
                value="admin"
                checked={formData.role === 'admin'}
                onChange={handleChange}
              />
            </div>
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="danger" type="submit" style={{ fontSize: '18px' }}>
              Log In
            </Button>
            <p
              className="text-center mt-3"
              style={{ fontSize: '14px', cursor: 'pointer' }}
              onClick={() => navigate('/registration')}
            >
              Don’t have an account?{' '}
              <span className="text-decoration-underline">Register here</span>
            </p>
          </div>
        </Form>
      </Card>
    </Container>
  );
}
