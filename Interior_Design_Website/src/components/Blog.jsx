import React from "react";
import { Container, Row, Col, Card, Button, Form, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/Css//Blog.css";

function Blog() {
  const blogPosts = [
    {
      date: "20 Oct, 2025",
      title: "Designing Modern Kitchen That Speak Style",
      img: "https://bonito.in/wp-content/uploads/2025/07/5-Common-Storage-Mistakes_Desktop.jpg",
      category: "Living Room",
      author: "Priya Jadhav",
      excerpt:
        "Modern Kitchen balance functionality with personal expression. Discover color palettes, textures, and furniture arrangements that make every corner inviting and chic.",
    },
    {
      date: "10 Oct, 2025",
      title: "The Magic of Minimalist Bedrooms",
      img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60",
      category: "Bedroom",
      author: "Rohit Pawar",
      excerpt:
        "Minimalism is not about less; it’s about clarity and comfort. Learn how thoughtful choices in layout and design can turn your bedroom into a serene retreat.",
    },
    {
      date: "05 Oct, 2025",
      title: "Creating an Inspiring things at Home",
      img: "https://bonito.in/wp-content/uploads/2025/06/9b.png",
      category: "Office",
      author: "Sneha Kulkarni",
      excerpt:
        "Home setups deserve more than just a desk and chair. Explore ideas for productive, aesthetic, and well-lit workspaces that boost focus and creativity.",
    },
    {
      date: "25 Sep, 2025",
      title: "Textures that Transform: The Power of Touch in Design",
      img: "https://bonito.in/wp-content/uploads/2024/09/Untitled-design-2024-09-12T134006.694.jpg",
      category: "Design Tips",
      author: "Amit Gajbhiye",
      excerpt:
        "Texture plays a vital role in interior design—it brings warmth, depth, and emotion to your space. Here’s how to layer materials for that designer finish.",
    },
    {
      date: "12 Sep, 2025",
      title: "Lighting That Changes Everything",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
      category: "Lighting",
      author: "Shweta Bhere",
      excerpt:
        "The right lighting elevates any room. From ambient glows to accent highlights, explore ways to make illumination your secret design weapon.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="blog-banner-wrap text-light d-flex align-items-center">
        <Container>
          <Col md={8}>
            <h1>Blog's Site</h1>
            <h3 className="banner-heading">
              Explore Design Ideas, Trends, and Inspirations
            </h3>
          </Col>
        </Container>
      </section>

      {/* Intro Section */}
      <section className="intro-wrap text-center py-5">
        <Container>
          <h3 className="fw-bold">Inspiration for Every Space</h3>
          <p className="text-muted mt-3 intro-text">
            Discover timeless design stories, expert tips, and creative ideas
            that help you transform your house into a home. Every post is crafted
            to inspire your next big interior move.
          </p>
        </Container>
      </section>

      {/* Blog Cards */}
      <section className="py-5">
        <Container>
          <Row className="justify-content-center">
            {blogPosts.map((post, index) => (
              <Col key={index} xs={12} md={4} className="d-flex justify-content-center mb-4">
                <Card className="blog-card shadow-sm border-0">
                  <Card.Img
                    variant="top"
                    src={post.img}
                    className="blogImg"
                    style={{ width: "100%", height: "230px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <small className="text-muted">{post.date}</small>
                    <h5 className="fw-semibold mt-2">{post.title}</h5>
                    <p className="text-danger mb-1 fw-semibold">{post.author}</p>
                    <p className="text-muted">{post.excerpt}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Blog;
