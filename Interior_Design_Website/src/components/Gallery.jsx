import "../assets/Css/Gallery.css";
import hall1 from "../images/hall1.jpg";
import hall2 from "../images/hall2.jpg";
import hall3 from "../images/hall3.jpg";
import hall4 from "../images/hall4.jpg";
import kitchen1 from "../images/kitchen-morocco.jpg";
import kitchen2 from "../images/kitchen-colorful.jpeg";
import kitchen3 from "../images/kitchen-elegant.jpeg";
import bed1 from "../images/bedroom1.webp";
import bed2 from "../images/bedroom2.jpg";
import bed3 from "../images/bedroom3.jpg";
import bath1 from "../images/bath1.webp";
import bath2 from "../images/bath2.jpg";
import bath3 from "../images/bath3.webp";
import study1 from "../images/study1.jpg";
import study2 from "../images/study2.webp";


const Gallery = () => {
  const galleryItems = [
    { img: hall1, title: "Balcony Area" },
    { img: hall2, title: "Luxury Hall" },
    { img: hall3, title: "Artistic Hall" },
    { img: hall4, title: "Elegant Hall" },
    { img: kitchen1, title: "Moroccan Kitchen" },
    { img: kitchen2, title: "Classic Kitchen" },
    { img: kitchen3, title: "Modular Kitchen" },
    { img: bed1, title: "Luxury Bedroom" },
    { img: bed2, title: "Cozy Bedroom" },
    { img: bed3, title: "Urban Bedroom" },
    { img: bath1, title: "Luxury Bathroom" },
    { img: bath2, title: "Spa-inspired Bathroom" },
    { img: bath3, title: "Elegant Bathroom" },
    { img: study1, title: "Shared Study" },
    { img: study2, title: "Luxury Office" },
  ];

  return (
    <>
      <div className="gallery-bg">
        <div className="gallery-page container">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-dark">Our Gallery</h1>
            <p className="lead text-muted">
              Explore our stunning interior transformations and designs.
            </p>
          </div>

          <div className="row g-4">
            {galleryItems.map((item, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <div className="gallery-card position-relative shadow-lg">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="img-fluid gallery-img"
                  />
                  <div className="gallery-overlay">
                    <h3>{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
