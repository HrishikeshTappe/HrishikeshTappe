import { getConnectionObject } from "../configs/DbConfig.js";
import jwt from "jsonwebtoken";

// ✅ Register new query
export async function registerQuery(request, response) {
    try {
        const connection = getConnectionObject();
        const { name, phone, email, query } = request.body;

        const qry = `INSERT INTO queries (name, phone, email, query) VALUES (?, ?, ?, ?)`;
        const [resultSet] = await connection.query(qry, [name, phone, email, query]);

        if (resultSet.affectedRows === 1) {
            response.status(200).send({ message: 'Query successfully submitted' });
        } else {
            response.status(500).send({ message: 'Query submission failed' });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}

// ✅ Update existing query
export async function updateQueryById(request, response) {
    try {
        const connection = getConnectionObject();
        const { name, phone, email, query } = request.body;
        const id = request.params.id;

        // Check if the record exists
        const [rows] = await connection.query(`SELECT * FROM queries WHERE id = ?`, [id]);
        if (rows.length === 0) {
            return response.status(404).send({ message: "Query not found" });
        }

        const updateQry = `
            UPDATE queries 
            SET name = ?, phone = ?, email = ?, query = ? 
            WHERE id = ?`;
        const [result] = await connection.query(updateQry, [name, phone, email, query, id]);

        if (result.affectedRows === 1) {
            response.status(200).send({ message: "Query updated successfully" });
        } else {
            response.status(500).send({ message: "Failed to update query" });
        }
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Error updating query" });
    }
}
