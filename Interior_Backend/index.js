import express from 'express';
import { connectDb } from './src/configs/DbConfig.js';
import {
    deleteCustomersById,
    getAllCustomers,
    registerCustomer,
    getAllQueries,
    deleteQueriesById,
    updateCustomerById
} from './src/controllers/CustomerController.js';
import { registerAdmin } from './src/controllers/AdminController.js';
import cors from 'cors';
import { authorize, verifyToken } from './src/middlewares/VerifyToken.js';
import { login } from './src/controllers/LoginController.js';
import { ROLES } from './src/constants/RoleConstants.js';
import {
    bookConsultation,
    deleteBookingById,
    getAllBookings,
    updateBookingById       // ✅ imported new controller
} from './src/controllers/bookController.js';
import { registerQuery } from './src/controllers/QueryController.js';

const app = express();
app.use(cors());
app.use(express.json());

// ===========================
// Customer Routes
// ===========================
app.post("/customers", registerCustomer);
app.get("/getAllCustomers", verifyToken, authorize([ROLES.ADMIN]), getAllCustomers);
app.delete("/deleteCustomers/:id", verifyToken, authorize([ROLES.ADMIN]), deleteCustomersById);
app.put("/updateCustomer/:id", verifyToken, authorize([ROLES.ADMIN]), updateCustomerById); // ✅ update customer

// ===========================
// Query Routes
// ===========================
app.post("/query", registerQuery);
app.get("/getAllQueries", verifyToken, authorize([ROLES.ADMIN]), getAllQueries);
app.delete("/deleteQuery/:id", verifyToken, authorize([ROLES.ADMIN]), deleteQueriesById);

// ===========================
// Admin & Auth Routes
// ===========================
app.post("/admins", verifyToken, authorize([ROLES.ADMIN]), registerAdmin);
app.post("/login", login);

// ===========================
// Booking Routes
// ===========================
app.post("/bookConsultation", bookConsultation);
app.get("/bookings", verifyToken, authorize([ROLES.ADMIN]), getAllBookings);
app.delete("/bookings/:id", verifyToken, authorize([ROLES.ADMIN]), deleteBookingById);
app.put("/bookings/:id", verifyToken, authorize([ROLES.ADMIN]), updateBookingById); // ✅ new route added

// ===========================
// Start Server & Connect DB
// ===========================
app.listen(5000, () => {
    connectDb();
    console.log("✅ Server running on port 5000");
});
