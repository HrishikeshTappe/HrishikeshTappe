import { Navigate } from "react-router-dom";
import { getToken } from "../services/TokenServices";
import { toast, Slide } from "react-toastify";

const ProtectedRoute = ({ element }) => {
  const token = getToken();

  if (!token) {
    toast.warning("Please login first!", {
      position: "top-right",
      autoClose: 1000,
      theme: "colored",
      transition: Slide,
    });

    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
