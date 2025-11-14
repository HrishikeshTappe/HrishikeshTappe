import { compareSync, hashSync } from "bcrypt";
import { getConnectionObject } from "../configs/DbConfig.js";
import jwt from "jsonwebtoken";

export async function registerCustomer(request, response) {
    try {
        const connection = getConnectionObject();
        const { name, phone, password, email, address } = request.body;
        const encryptedPassword = hashSync(password, 12);
        const qry = `INSERT INTO customer(name,phone,password,email,address) VALUES('${name}','${phone}','${encryptedPassword}','${email}', '${address}')`;
        const [resultSet] = await connection.query(qry);
        if (resultSet.affectedRows === 1) {
            response.status(200).send({ message: 'Registration successful, now you can login' });
        }
        else {
            response.status(500).send({ message: 'Customer registration failed' });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}

export async function getAllCustomers(request, response) {
    try {
        const connection = getConnectionObject();
        const qry = `SELECT * FROM customer`;
        const [rows] = await connection.query(qry);
        response.status(200).send(rows);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}

export async function getAllQueries(request, response) {
    try {
        const connection = getConnectionObject();
        const qry = `SELECT * FROM queries`;
        const [rows] = await connection.query(qry);
        response.status(200).send(rows);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}

export async function deleteCustomersById(request, response) {
    try {
        const connection = getConnectionObject();
        const qry = `DELETE FROM customer WHERE id=${request.params.id}`;
        const [resultSet] = await connection.query(qry);
        if (resultSet.affectedRows === 1) {
            response.status(200).send({ message: 'Customer Deleted' });
        } else {
            response.status(404).send({ message: 'Customer not found' });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}

export async function deleteQueriesById(request, response) {
    try {
        const connection = getConnectionObject();
        const qry = `DELETE FROM queries WHERE id=${request.params.id}`;
        const [resultSet] = await connection.query(qry);
        if (resultSet.affectedRows === 1) {
            response.status(200).send({ message: 'Query Deleted' });
        } else {
            response.status(404).send({ message: 'Query not found' });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}

/* ✅ NEW FUNCTION: Update customer details by ID */
export async function updateCustomerById(request, response) {
    try {
        const connection = getConnectionObject();
        const { name, phone, email, address, password } = request.body;
        const { id } = request.params;

        let encryptedPasswordPart = '';
        if (password && password.trim() !== '') {
            const encryptedPassword = hashSync(password, 12);
            encryptedPasswordPart = `, password='${encryptedPassword}'`;
        }

        const qry = `
            UPDATE customer 
            SET name='${name}', phone='${phone}', email='${email}', address='${address}'
            ${encryptedPasswordPart}
            WHERE id=${id}
        `;

        const [resultSet] = await connection.query(qry);
        if (resultSet.affectedRows === 1) {
            response.status(200).send({ message: 'Customer updated successfully' });
        } else {
            response.status(404).send({ message: 'Customer not found' });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}
