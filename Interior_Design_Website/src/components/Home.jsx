import { Container, Row, Col, Carousel, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <section className="Home-slider">
        <Carousel fade interval={3500} pause="hover">
          <Carousel.Item>
            <img
              className="d-block w-100 hero-img"
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600"
              alt="Luxury Interior"
            />
            <div className="hero-overlay">
              <h1 className="hero-heading">Design Your Dream Home</h1>
              <p className="hero-subtext">
                Where creativity meets comfort — and elegance feels like home.
              </p>
              <Link to="/book-Consultation">
                <Button variant="light" className="hero-btn">
                  Book Consultation
                </Button>
              </Link>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 hero-img"
              src="https://media.istockphoto.com/id/2204355895/photo/contemporary-interior-with-sofa-brown-wood-wall-panels-plants-floor-lamp-carpet-coffee-table.webp?a=1&b=1&s=612x612&w=0&k=20&c=D3cVh-ZFeGbyHgvPKzeysO_ANi-HzLVGhPRQ5mTGXZk="
              alt="Living Space"
            />
            <div className="hero-overlay">
              <h1 className="hero-heading">Timeless Living Spaces</h1>
              <p className="hero-subtext">
                Interiors that inspire — elegance in every detail.
              </p>
              <Link to="/book-Consultation">
                <Button variant="light" className="hero-btn">
                  Book Consultation
                </Button>
              </Link>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 hero-img"
              src="https://plus.unsplash.com/premium_photo-1661962739798-0af59dc30d14?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bHV4dXJ5JTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600"
              alt="Bedroom Design"
            />
            <div className="hero-overlay">
              <h1 className="hero-heading">Bedrooms That Breathe Calm</h1>
              <p className="hero-subtext">
                Minimal. Peaceful. Perfectly you.
              </p>
              <Link to="/book-Consultation">
                <Button variant="light" className="hero-btn">
                  Book Consultation
                </Button>
              </Link>
            </div>
          </Carousel.Item>
        </Carousel>
      </section>

      <section className="about-section py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <img
                src="https://bonito.in/wp-content/themes/bonito-cms/assets/new-images/bedroom.jpg"
                alt="About Interior Design"
                className="about-img"
              />
            </Col>
            <Col md={6}>
              <h2 className="section-heading">We Create Homes That Tell Stories</h2>
              <p className="about-text"><br/>
                Every home is more than walls and ceilings — <br/>it’s a reflection of your story. 
                Our designers blend modern aesthetics with soulful detail to transform your 
                vision into reality.
              </p>
              <Link to="/book-Consultation">
                <Button variant="dark" className="about-btn">
                  Let’s Design Together
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="consultation-section py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0 text-center">
              <video
                className="consultation-video"
                controls
                autoPlay
                muted
                loop>
                  
                <source
                  src="src\\assets\\Video&Photos\\video1.mp4"
                  type="video/mp4"
                />
              </video>
            </Col>
            <Col md={6} className="consultation-text">
              <h3>Book a Free Consultation</h3>
              <p>
                Let’s discuss your dream home ideas. Our experts guide you 
                every step — from concepts to cozy corners.
              </p>
              <Link to="/book-Consultation" className="consultation-link">
                Schedule Appointment Now
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      
      <section className="home-promo-section">
        <div className="container d-flex flex-column flex-lg-row align-items-center justify-content-between">
          <div className="text-section mb-5 mb-lg-0 me-lg-5">
            <h1 className="display-5">
              This Season, Your Home <br /> Deserves a Gift.
            </h1>
            <p className="mt-4 fs-5">
              Celebrate the art of living. Special festive offers on 
              custom interiors designed uniquely for you.
            </p>
            <p className="footer-text">Live Beautiful — Inside Out.</p>
          </div>
          <div className="image-section">
            <img
              src="https://super.homelane.com/Showroom/Nagpur-17200803372033ab735219e15.jpg"
              alt="Promo Home Decor"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
