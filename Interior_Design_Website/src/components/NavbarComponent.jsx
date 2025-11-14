import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { getRole, removeRole } from "../services/RoleServices";
import { removeToken } from "../services/TokenServices";

const NavbarComponent = () => {
  const navigate = useNavigate();

  const role = getRole();

  const handleLogOut = () => {
    removeToken();
    removeRole();
    navigate("/");
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="px-4 py-3 shadow-sm"
    >
      <Navbar.Brand as={NavLink} to="/" className="fw-bold fs-5">
        Inspire Interior Designer
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="ms-auto my-2 my-lg-0" navbarScroll>
          <Nav.Link as={NavLink} to="/" end>
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/about">
            About Us
          </Nav.Link>
          {role === "admin" ? 
            <>
              <Nav.Link as={NavLink} to="/admin">
                Book Consulation
              </Nav.Link>
              <Nav.Link as={NavLink} to="/registered-customer">
                Our Customers
              </Nav.Link>
            </>
             : 
            <>
              <Nav.Link as={NavLink} to="/gallery">
                Gallery
              </Nav.Link>
              <Nav.Link as={NavLink} to="/blog">
                Blogs
              </Nav.Link>
              <Nav.Link as={NavLink} to="/contact">
                Contact Us
              </Nav.Link>
              <Nav.Link as={NavLink} to="/book-consultation">
                Book Consultation
              </Nav.Link>
            </>
            }

          {/* <Nav.Link as={NavLink} to="/registration">
            Register
          </Nav.Link> */}
          <Nav.Link as={NavLink} to="/login">
            Log in
          </Nav.Link>
            <Nav.Link as={NavLink} to="/login" onClick={handleLogOut}>
            Log out
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
