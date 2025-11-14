import { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { Bounce, toast } from "react-toastify";
import {
  deleteCustomers,
  getAllCustomer,
  getAllQueries,
  deleteQueries,
  updateCustomer, // ✅ Added update API
} from "../services/Customerservices";

const RegisteredCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState(null);

  const [queries, setQueries] = useState([]);
  const [showQueriesConfirmation, setShowQueriesConfirmation] = useState(false);
  const [selectedQuerries, setSelectedQueries] = useState(null);

  // ✅ Update modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const fetchCustomers = async () => {
    try {
      const response = await getAllCustomer();
      setCustomers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchQueries = async () => {
    try {
      const response = await getAllQueries();
      setQueries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchQueries();
  }, []);

  const hideConfirmation = () => setShowConfirmation(false);
  const hideQueriesConfirmation = () => setShowQueriesConfirmation(false);

  const showSuccessToast = (msg) =>
    toast.success(msg, {
      position: "top-right",
      autoClose: 4000,
      theme: "colored",
      transition: Bounce,
    });

  const showErrorToast = (msg) =>
    toast.error(msg, {
      position: "top-right",
      autoClose: 4000,
      theme: "colored",
      transition: Bounce,
    });

  // ✅ Delete Customer
  const handleCustomersDelete = async () => {
    try {
      if (selectedCustomers) {
        const response = await deleteCustomers(selectedCustomers.id);
        if (response.status === 200) {
          showSuccessToast("Customer deleted successfully");
          setCustomers(customers.filter((b) => b.id !== selectedCustomers.id));
        }
      }
    } catch (error) {
      console.log(error);
      showErrorToast("Failed to delete customer");
    } finally {
      setShowConfirmation(false);
    }
  };

  // ✅ Delete Query
  const handleCustomersQueryDelete = async () => {
    try {
      if (selectedQuerries) {
        const response = await deleteQueries(selectedQuerries.id);
        if (response.status === 200) {
          showSuccessToast("Query deleted successfully");
          setQueries(queries.filter((b) => b.id !== selectedQuerries.id));
        }
      }
    } catch (error) {
      console.log(error);
      showErrorToast("Failed to delete query");
    } finally {
      setShowQueriesConfirmation(false);
    }
  };

  // ✅ Edit Handlers
  const handleEditClick = (customer) => {
    setSelectedCustomers(customer);
    setEditForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdateCustomer = async () => {
    try {
      const response = await updateCustomer(selectedCustomers.id, editForm);
      if (response.status === 200) {
        showSuccessToast("Customer updated successfully");
        // Refresh list after update
        fetchCustomers();
        setShowEditModal(false);
      }
    } catch (error) {
      console.log(error);
      showErrorToast("Failed to update customer");
    }
  };

  return (
    <div>
      {/* ------------------- Customers Table ------------------- */}
      <div className="container mt-5">
        <h2>Our Customers</h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer.id}>
                <td>{index + 1}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEditClick(customer)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      setShowConfirmation(true);
                      setSelectedCustomers(customer);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Delete Modal */}
        <Modal show={showConfirmation} onHide={hideConfirmation}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete{" "}
            {selectedCustomers ? selectedCustomers.name : ""}?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hideConfirmation}>
              No
            </Button>
            <Button variant="danger" onClick={handleCustomersDelete}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* ✅ Edit Modal */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={editForm.address}
                  onChange={handleEditChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </Button>
            <Button variant="success" onClick={handleUpdateCustomer}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/* ------------------- Queries Table ------------------- */}
      <div className="container mt-5">
        <h2>Customer Queries</h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Query</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((query, index) => (
              <tr key={query.id}>
                <td>{index + 1}</td>
                <td>{query.name}</td>
                <td>{query.email}</td>
                <td>{query.phone}</td>
                <td>{query.query}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      setShowQueriesConfirmation(true);
                      setSelectedQueries(query);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal
          show={showQueriesConfirmation}
          onHide={hideQueriesConfirmation}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete{" "}
            {selectedQuerries ? selectedQuerries.name : ""}?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hideQueriesConfirmation}>
              No
            </Button>
            <Button variant="danger" onClick={handleCustomersQueryDelete}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default RegisteredCustomer;
