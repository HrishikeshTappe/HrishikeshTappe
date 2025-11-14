import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/Css/interior.css";
import "./assets/Css/Gallery.css";
import "./assets/Css/BookConsultation.css";
import "./assets/Css/Blog.css";
import "./assets/Css/About.css";
import NavbarComponent from "./components/NavbarComponent";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Gallery from "./components/Gallery";
import { RegisterClient } from "./components/RegisterClient";
import BookConsultation from "./components/BookConsultation";
import { Login } from "./components/Login";
import Blog from "./components/Blog";
import { ToastContainer } from "react-toastify";
import About from "./components/About";
import AdminBookings from "./components/Admin";
import RegisteredCustomer from "./components/RegisteredCustomer";
import ProtectedRoute from "./components/ProtectedRoute";
import { Contact } from "./components/Contact";

const App = () => {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<RegisterClient />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<AdminBookings />} />
        <Route path="/registered-customer" element={<RegisteredCustomer />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/book-consultation"
          element={<ProtectedRoute element={<BookConsultation />} />}
        />
        <Route
          path="/gallery"
          element={<ProtectedRoute element={<Gallery />} />}
        />
        <Route path="/blog" element={<ProtectedRoute element={<Blog />} />} />
        <Route
          path="/contact"
          element={<ProtectedRoute element={<About />} />}
        />
      </Routes>
      <ToastContainer />
      <Footer />
    </Router>
  );
};

export default App;
