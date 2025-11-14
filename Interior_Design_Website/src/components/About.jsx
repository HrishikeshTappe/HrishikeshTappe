import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../assets/Css/About.css";

import HrishikeshImg from "../images/Hrishikesh.jpg";
import SachinImg from "../images/Sachin.jpg";
import TusharImg from "../images/Tushar.jpg";

const teamMembers = [
  {
    id: 1,
    name: "Hrishikesh Deepak Tappe",
    title: "Mern Stack Developer",
    bio: "This site was built end-to-end by the Inspire Interior Designs team: a responsive frontend, a secure backend, and a reliable database to manage projects, client inquiries, and our portfolio. The architecture ensures fast page loads, clean APIs for smooth content updates, and secure storage for client contact and project data — all so we can focus on delivering outstanding interior design experiences.",
    imageUrl: HrishikeshImg,
  },
  {
    id: 2,
    name: "Sachin Waghchaure",
    title: "Mern Stack Developer",
    bio: "Built fully in-house, the Inspire Interior Designs website combines a modern frontend, robust backend services, and a secure database to streamline project details, and client communication. Its efficient architecture ensures quick loading, seamless updates, and protection of sensitive data — helping us deliver exceptional design services both online and in person.",
    imageUrl: SachinImg,
  },
  {
    id: 3,
    name: "Tushar Gedam",
    title: "Front-End Developer",
    bio: "This website was thoughtfully developed using a complete end-to-end approach, featuring an intuitive user interface, and a well-structured database to organize our projects, portfolio, and client messages. With reliable security, optimized performance, and smooth content management, the platform ensures a seamless digital experience that reflects our passion for exceptional interior design.",
    imageUrl: TusharImg,
  },
];

const About = () => {      
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4 about-us-heading">
        About Us — Inspire Interior Designs
      </h2>
      <p>
        Welcome to Inspire Interior Designer where creativity meets purpose. We
        specialize in crafting beautiful, functional spaces that reflect your
        personality, lifestyle, and vision. Our team believes that every space
        has a story to tell — and we are here to bring that story to life with
        thoughtful design and exceptional craftsmanship.
      </p>

      <h3 className="mt-5 mb-4 about-us-heading">Our Mission</h3>
      <p>
        We elevate everyday spaces with thoughtful, creative design.
        <br />
        We focus on exceptional quality and lasting beauty.
        <br />
        We listen closely to understand your vision.
        <br />
        We collaborate to shape spaces that reflect your lifestyle.
        <br />
        We strive to exceed expectations, every time.
      </p>

      <h2 className="text-center mt-5 mb-4 about-us-heading">Meet Our Team</h2>

      {teamMembers.map((member, index) => (
        <Row
          key={member.id}
          className={`align-items-center mb-5 team-row ${
            index % 2 === 0 ? "" : "flex-row-reverse"
          }`}
        >
          <Col md={4} className="text-center mb-3 mb-md-0">
            <img
              src={member.imageUrl}
              alt={member.name}
              className="member-photo-vertical"
            />
          </Col>
          <Col md={8}>
            <h4 className="member-name">{member.name}</h4>
            <h6 className="member-title">{member.title}</h6>
            <p className="member-bio">{member.bio}</p>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default About;
