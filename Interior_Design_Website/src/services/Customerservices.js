import axios from "axios";
import { getToken } from "./TokenServices";

export function getAuthHeader() {
    const token = getToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export async function getAllclients() {
    return axios.get("http://localhost:5000/currentUsers", getAuthHeader());
}

export async function registerCustomer(formData) {
    return axios.post("http://localhost:5000/customers", formData);
}

export async function registerQuery(formData) {
    return axios.post("http://localhost:5000/query", formData);
}

export async function getAllCustomer() {
    return axios.get("http://localhost:5000/getAllCustomers", getAuthHeader());
}

export async function deleteCustomers(id) {
    return axios.delete(`http://localhost:5000/deleteCustomers/${id}`, getAuthHeader());
}

export async function getAllQueries() {
    return axios.get("http://localhost:5000/getAllQueries", getAuthHeader());
}

export async function deleteQueries(id) {
    return axios.delete(`http://localhost:5000/deleteQuery/${id}`, getAuthHeader());
}

// ✅ NEW: Update Customer (Admin Edit)
export async function updateCustomer(id, updatedData) {
    return axios.put(`http://localhost:5000/updateCustomer/${id}`, updatedData, getAuthHeader());
}

// ✅ (Optional) Update Query
export async function updateQuery(id, updatedData) {
    return axios.put(`http://localhost:5000/updateQuery/${id}`, updatedData, getAuthHeader());
}
