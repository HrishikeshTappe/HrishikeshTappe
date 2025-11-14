import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Bounce, toast } from "react-toastify";
import { book_consultation } from "../services/bookConsultationsServices";

function BookConsultation() {

    const [formData, setFormData] = useState({ name: '', email: '', contact: '', bhk: '', package: '' });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.name || !formData.email || !formData.contact || !formData.bhk || !formData.package) {
            toast.warning("All fields are required!", {
                position: "top-right",
                autoClose: 3000,
                theme: "colored",
                transition: Bounce,
            });
            return;
        }

        const namePattern = /^[A-Za-z\s]{3,}$/;
        if (!namePattern.test(formData.name)) {
            toast.warning("Name must contain only letters and be at least 3 characters!", {
                position: "top-right",
                autoClose: 3000,
                theme: "colored",
                transition: Bounce,
            });
            return;
        }


        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            toast.warning("Please enter a valid email address!", {
                position: "top-right",
                autoClose: 3000,
                theme: "colored",
                transition: Bounce,
            });
            return;
        }

        const contactPattern = /^[0-9]{10}$/;
        if (!contactPattern.test(formData.contact)) {
            toast.warning("Contact number must be exactly 10 digits!", {
                position: "top-right",
                autoClose: 3000,
                theme: "colored",
                transition: Bounce,
            });
            return;
        }

        const bhkPattern = /^[1-4]$/;
        if (!bhkPattern.test(formData.bhk)) {
            toast.warning("BHK must be between 1 to 4!", {
                position: "top-right",
                autoClose: 3000,
                theme: "colored",
                transition: Bounce,
            });
            return;
        }

        const validPackages = ["basic", "luxury", "premium"];
        if (!validPackages.includes(formData.package.trim().toLowerCase())) {
            toast.warning("Package must be Basic, Luxury, or Premium!", {
                position: "top-right",
                autoClose: 3000,
                theme: "colored",
                transition: Bounce,
            });
            return;
        }

        try {
            console.log(formData);
            const response = await book_consultation(formData);
            console.log(response);
            if (response.status === 200) {
                toast.success("Your enquiry is registered. Thanks!", {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 500) {
                toast.error("Something went wrong", {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        }
    };

    return (
        <Container className="mt-4 d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Row className="justify-content-center w-100">
                <Col lg={6}>
                    <Alert variant="primary" className="text-center">Book Consultation</Alert>

                    <Form onSubmit={handleSubmit} className="p-4 border rounded shadow">
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" name="name" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Enter Email" name="email" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Contact</Form.Label>
                            <Form.Control type="contact" placeholder="Enter Contact" name="contact" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>BHK</Form.Label>
                            <Form.Control type="text" placeholder="BHK Like 1 2 3 4" name="bhk" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Package</Form.Label>
                            <Form.Control type="text" placeholder="Package Like Basic Luxury Premium" name="package" onChange={handleChange} />
                        </Form.Group>

                        <div className="text-center">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default BookConsultation;
