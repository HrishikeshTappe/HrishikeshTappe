import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { registerQuery, updateQuery } from "../services/Customerservices.js";
import "../assets/Css/contact.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Contact() {
  const [formData, setFormData] = useState({
    id: "",       // ✅ new field for update
    name: "",
    phone: "",
    email: "",
    query: "",
  });

  const [isEditMode, setIsEditMode] = useState(false); // ✅ track add/update mode

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response;
      if (isEditMode) {
        // ✅ Update existing query
        response = await updateQuery(formData.id, formData);
        if (response.status === 200) {
          toast.success("Query updated successfully!");
          setIsEditMode(false);
          setFormData({ id: "", name: "", phone: "", email: "", query: "" });
        }
      } else {
        // ✅ Create new query
        response = await registerQuery(formData);
        if (response.status === 200) {
          toast.success("Query submitted successfully!");
          setFormData({ id: "", name: "", phone: "", email: "", query: "" });
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to process your request. Please try again later.");
    }
  };

  // ✅ Simulate load existing query (you could fetch from DB or pass via props)
  const handleLoadForEdit = () => {
    // Example: Hardcoded data for testing
    const existingQuery = {
      id: 1,
      name: "John Doe",
      phone: "9876543210",
      email: "john@example.com",
      query: "Need help updating my design package.",
    };
    setFormData(existingQuery);
    setIsEditMode(true);
  };

  return (
    <div className="page">
      <ToastContainer position="top-center" autoClose={3000} />
      <Container className="mt-2 contact-form">
        <Row>
          <Col lg={12} className="form-title">
            <h2>{isEditMode ? "Update Your Query" : "Enter Your Query"}</h2>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Form onSubmit={handleSubmit} className="contact-form">
              <Form.Group className="mb-3">
                <Form.Label>Client Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  value={formData.name}
                  pattern="^[A-Za-z\\s]{3,}$"
                  minLength={3}
                  required
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone No</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  name="phone"
                  value={formData.phone}
                  pattern="^\\d{10}$"
                  required
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  required
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Query</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Enter your query"
                  name="query"
                  value={formData.query}
                  required
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button variant="primary" type="submit">
                  {isEditMode ? "Update Query" : "Submit Query"}
                </Button>

                {/* ✅ Example Button to simulate load data for editing */}
                {!isEditMode && (
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={handleLoadForEdit}
                  >
                    Edit Existing Query
                  </Button>
                )}
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
