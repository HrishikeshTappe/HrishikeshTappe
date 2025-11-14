import { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { deleteBooking, getAllBookings, updateBooking } from "../services/bookConsultationsServices";
import { Bounce, toast } from "react-toastify";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // 🟢 New states for edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    contact: "",
    bhk: "",
    package: "",
  });

  const fetchBookings = async () => {
    try {
      const response = await getAllBookings();
      setBookings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const hideConfirmation = () => {
    setShowConfirmation(false);
  };

  const showSuccessToast = (msg) => {
    toast.success(msg, {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
      transition: Bounce,
    });
  };

  const showErrorToast = (msg) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
      transition: Bounce,
    });
  };

  const handleBookingDelete = async () => {
    try {
      if (selectedBooking) {
        const response = await deleteBooking(selectedBooking.id);
        if (response.status === 200) {
          showSuccessToast("Booking deleted successfully!");
          setBookings(bookings.filter((b) => b.id !== selectedBooking.id));
        }
      }
    } catch (error) {
      console.log(error);
      showErrorToast("Booking deletion failed!");
    } finally {
      setShowConfirmation(false);
    }
  };

  // =====================
  // 🟡 Edit Booking Logic
  // =====================
  const handleEditClick = (booking) => {
    setSelectedBooking(booking);
    setEditData({
      name: booking.name,
      email: booking.email,
      contact: booking.contact,
      bhk: booking.bhk,
      package: booking.package,
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleUpdateBooking = async () => {
    try {
      const response = await updateBooking(selectedBooking.id, editData);
      if (response.status === 200) {
        showSuccessToast("Booking updated successfully!");
        setShowEditModal(false);
        fetchBookings(); // refresh data
      }
    } catch (error) {
      console.log(error);
      showErrorToast("Booking update failed!");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Customer Bookings</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Serial-No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>BHK</th>
            <th>Package</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.name}</td>
              <td>{booking.email}</td>
              <td>{booking.contact}</td>
              <td>{booking.bhk}</td>
              <td>{booking.package}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEditClick(booking)}
                >
                  Update
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    setShowConfirmation(true);
                    setSelectedBooking(booking);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Delete Confirmation Modal */}
      <Modal show={showConfirmation} onHide={hideConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure, you want to delete{" "}
          <strong>{selectedBooking ? selectedBooking.name : ""}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideConfirmation}>
            No
          </Button>
          <Button variant="danger" onClick={handleBookingDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 🟢 Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editData.name}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editData.email}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                name="contact"
                value={editData.contact}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>BHK</Form.Label>
              <Form.Control
                type="text"
                name="bhk"
                value={editData.bhk}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Package</Form.Label>
              <Form.Control
                type="text"
                name="package"
                value={editData.package}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdateBooking}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminBookings;
