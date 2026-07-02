const express = require("express");
const cors = require("cors");
const connectDB = require("./database/database");



const app = express();

app.use(express.json());
app.use(cors());
function getDatesBetween(start, end) {
    const dates = [];
    const current = new Date(start);
    const last = new Date(end);

    while (current <= last) {
        dates.push(current.toISOString().split("T")[0]);
        current.setDate(current.getDate() + 1);
    }

    return dates;
}

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

        const employee = await db.get(
            "SELECT * FROM employees WHERE id = ?",
            [request.employee_id]
        );

        const teamSize = await db.get(
            `SELECT COUNT(*) AS total
             FROM employees
             WHERE team = ?`,
            [employee.team]
        );

        const maxAllowed = Math.floor(teamSize.total * 0.3);

        //  get all days in leave range
        const dates = getDatesBetween(request.start_date, request.end_date);

        // check EACH day
        for (const date of dates) {
            const result = await db.get(
                `SELECT COUNT(*) AS total
                 FROM leave_requests lr
                 JOIN employees e ON lr.employee_id = e.id
                 WHERE e.team = ?
                 AND lr.status = 'approved'
                 AND lr.start_date <= ?
                 AND lr.end_date >= ?`,
                [employee.team, date, date]
            );

            if (result.total >= maxAllowed) {
                await db.close();

                return res.status(400).json({
                    error: `30% team leave limit reached on ${date}`
                });
            }
        }


        await db.run(
            `UPDATE leave_requests
             SET status = 'approved'
             WHERE id = ?`,
            [id]
        );

        await db.close();

        res.json({ message: "Leave approved 💛" });

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
module.exports = app;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}