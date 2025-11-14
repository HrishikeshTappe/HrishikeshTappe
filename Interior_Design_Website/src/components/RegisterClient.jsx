import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { registerCustomer } from "../services/Customerservices.js";
import "../assets/Css/RegisterClient.css";
import { Link } from "react-router-dom";

export function RegisterClient() {
   const [formData, setFormData] = useState({
      name: '',
      phone: '',
      password: '',
      email: '',
      address: ''
   });

   const [errors, setErrors] = useState({});
   const [successMsg, setSuccessMsg] = useState("");

   const handleChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
   };

   const validateForm = () => {
      const newErrors = {};

      if (!formData.name.trim()) {
         newErrors.name = "Name is required";
      } else if (formData.name.length < 3) {
         newErrors.name = "Name must be at least 3 characters";
      }

      if (!/^\d{10}$/.test(formData.phone)) {
         newErrors.phone = "Phone number must be 10 digits";
      }

      if (!formData.password) {
         newErrors.password = "Password is required";
      } 

      else if (
         !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            formData.password
         )
      ) {
         newErrors.password =
            "Password must be at least 8 characters and include uppercase, lowercase, number, and special character";
      }

      if (!/\S+@\S+\.\S+/.test(formData.email)) {
         newErrors.email = "Enter a valid email address";
      }

      if (!formData.address.trim()) {
         newErrors.address = "Address is required";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      setSuccessMsg("");

      if (!validateForm()) return;

      try {
         console.log(formData);
         const response = await registerCustomer(formData);
         console.log(response.data);

         setSuccessMsg("Registered successfully!");

         setFormData({ name: '', phone: '', password: '', email: '', address: '' });
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Container
         className="d-flex justify-content-center align-items-center mt-2"
         style={{ minHeight: "100vh" }}
      >
         <Row className="justify-content-center w-100">
            <Col lg={6}>
               <Alert variant="success" className="text-center">
                  Inspire Interior Register
               </Alert>

               {successMsg && (
                  <Alert variant="success" className="text-center">
                     {successMsg}
                  </Alert>
               )}

               <Form onSubmit={handleSubmit} className="p-4 shadow-lg rounded-4 bg-light">
                  <Form.Group className="mb-3">
                     <Form.Label>Full Name</Form.Label>
                     <Form.Control
                        type="text"
                        placeholder="Enter FullName"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                     />
                     <Form.Control.Feedback type="invalid">
                        {errors.name}
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                     <Form.Label>Contact no</Form.Label>
                     <Form.Control
                        type="text"
                        placeholder="Enter Phone_no"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        isInvalid={!!errors.phone}
                     />
                     <Form.Control.Feedback type="invalid">
                        {errors.phone}
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                     <Form.Label>Password</Form.Label>
                     <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                     />
                     <Form.Control.Feedback type="invalid">
                        {errors.password}
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                     <Form.Label>Email</Form.Label>
                     <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                     />
                     <Form.Control.Feedback type="invalid">
                        {errors.email}
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                     <Form.Label>Address</Form.Label>
                     <Form.Control
                        type="text"
                        placeholder="Enter Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        isInvalid={!!errors.address}
                     />
                     <Form.Control.Feedback type="invalid">
                        {errors.address}
                     </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center">
                     <Button variant="primary" type="submit">
                        Register User
                     </Button>
                     <div>
                        <span>Already Registered? </span>
                        <Button as={Link} to="/login" variant="primary" type="button">
                           Log In
                        </Button>
                     </div>
                  </div>
               </Form>
            </Col>
         </Row>
      </Container>
   );
}
