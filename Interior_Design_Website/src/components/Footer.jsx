import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer text-center text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-3 mb-md-0">
            <h4 className="fw-bold">Interior Designing Website</h4>
            <h3>
              India’s leading interior <br /> design voice.
            </h3>
          </Col>

          <Col md={4} className="mb-3 mb-md-0">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled small">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/about" className="footer-link">About</a></li>
              <li><a href="/gallery" className="footer-link">Gallery</a></li>
              <li><a href="/contact" className="footer-link">Contact</a></li>
            </ul>
          </Col>

          <Col md={4}>
            <h6 className="fw-bold">Follow Us</h6>
            <div className="social-icons d-flex justify-content-center gap-3 mt-2">
              <a href="https://www.facebook.com/" className="footer-icon"><i className="bi bi-facebook"></i></a>
              <a href="https://www.instagram.com/" className="footer-icon"><i className="bi bi-instagram"></i></a>
              <a href="https://x.com/" className="footer-icon"><i className="bi bi-twitter-x"></i></a>
              <a href="https://in.linkedin.com/" className="footer-icon"><i className="bi bi-linkedin"></i></a>
            </div>
          </Col>
        </Row>

        <hr className="my-3" />
        <p className="small mb-0">
          © {new Date().getFullYear()} Interior Designing Website. All Rights Reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
