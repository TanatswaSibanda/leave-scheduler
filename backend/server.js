const express = require("express");
const connectDB = require("./database/database");

const app = express();
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("Backend is working");
});


app.get("/employees", async (req, res) => {
    try {
        const db = await connectDB();
        const employees = await db.all("SELECT * FROM employees");
        await db.close();

        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post("/leave-requests", async (req, res) => {
    try {
        const { employee_id, start_date, end_date } = req.body;

        const db = await connectDB();

        await db.run(
            `INSERT INTO leave_requests
    (employee_id, start_date, end_date, status)
    VALUES (?, ?, ?, ?)`,
            [
                employee_id,
                start_date,
                end_date,
                "pending"
            ]
        );

        await db.close();

        res.json({ message: "Leave request submitted successfully " });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/leave-requests", async (req, res) => {
    try {
        const db = await connectDB();

        const requests = await db.all(`
            SELECT * FROM leave_requests
        `);

        await db.close();

        res.json(requests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.patch("/leave-requests/:id/approve", async (req, res) => {
    try {
        const db = await connectDB();

        const { id } = req.params;

        const request = await db.get(
            "SELECT * FROM leave_requests WHERE id = ?",
            [id]
        );
        if (!request) {
            await db.close();

            return res.status(404).json({
                error: "Leave request not found."
            });
        }
        const overlappingLeave = await db.get(
            `SELECT *
     FROM leave_requests
     WHERE employee_id = ?
     AND status = 'approved'
     AND id != ?
     AND start_date <= ?
     AND end_date >= ?`,
            [
                request.employee_id,
                request.id,
                request.end_date,
                request.start_date
            ]
        );
        if (overlappingLeave) {
            await db.close();

            return res.status(400).json({
                error: "Employee already has approved leave during this period."
            });
        }
        await db.run(
            `UPDATE leave_requests
     SET status = 'approved'
     WHERE id = ?`,
            [id]
        );

        await db.close();

        res.json({ message: "Leave approved " });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.patch("/leave-requests/:id/reject", async (req, res) => {
    try {
        const db = await connectDB();

        const { id } = req.params;

        await db.run(
            `UPDATE leave_requests
             SET status = 'rejected'
             WHERE id = ?`,
            [id]
        );

        await db.close();

        res.json({ message: "Leave rejected " });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 2000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});