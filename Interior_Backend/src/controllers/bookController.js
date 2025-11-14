import { getConnectionObject } from "../configs/DbConfig.js";

export async function bookConsultation(req, res) {
    try {
        const db = await getConnectionObject();

        const { name, email, contact, bhk, package: pkg } = req.body;

        if (!name || !email || !contact || !bhk || !pkg) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const query = `
            INSERT INTO book_consultation 
            (name, email, contact, bhk, package)
            VALUES (?, ?, ?, ?, ?)
        `;

        const values = [name, email, contact, bhk, pkg];
        const [result] = await db.execute(query, values);

        res.json({
            success: true,
            message: "Consultation booked successfully",
            data: result
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error.message });
    }
}

export async function getAllBookings(request, response) {
    try {
        const connection = getConnectionObject();
        const qry = `SELECT * FROM book_consultation`;
        const [rows] = await connection.query(qry);
        response.status(200).send(rows);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}

export async function deleteBookingById(request, response) {
    try {
        const connection = getConnectionObject();
        const qry = `DELETE FROM book_consultation WHERE id=${request.params.id}`;
        const [resultSet] = await connection.query(qry);
        if (resultSet.affectedRows === 1) {
            response.status(200).send({ message: 'Booking Deleted' });
        } else {
            response.status(404).send({ message: 'Booking not found' });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}

/* ✅ NEW FUNCTION — Update Booking by ID */
export async function updateBookingById(request, response) {
    try {
        const connection = getConnectionObject();
        const { name, email, contact, bhk, package: pkg } = request.body;
        const { id } = request.params;

        if (!name || !email || !contact || !bhk || !pkg) {
            return response.status(400).send({ message: "All fields are required" });
        }

        const qry = `
            UPDATE book_consultation
            SET name='${name}', email='${email}', contact='${contact}', bhk='${bhk}', package='${pkg}'
            WHERE id=${id}
        `;

        const [resultSet] = await connection.query(qry);
        if (resultSet.affectedRows === 1) {
            response.status(200).send({ message: 'Booking updated successfully' });
        } else {
            response.status(404).send({ message: 'Booking not found' });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}
