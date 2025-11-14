import axios from "axios";
import { getAuthHeader } from "./Customerservices";

export function book_consultation(formData) {
  return axios.post("http://localhost:5000/bookConsultation", formData, getAuthHeader());
}

export function getAllBookings() {
  return axios.get("http://localhost:5000/bookings", getAuthHeader());
}

export function deleteBooking(id) {
  return axios.delete(`http://localhost:5000/bookings/${id}`, getAuthHeader());
}

// ✅ NEW: Update Booking (for Admin)
export function updateBooking(id, updatedData) {
  return axios.put(`http://localhost:5000/bookings/${id}`, updatedData, getAuthHeader());
}
