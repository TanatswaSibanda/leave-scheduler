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
            `INSERT INTO leave_requests (employee_id, start_date, end_date, status)
             VALUES (?, ?, ?, ?)`,
            [employee_id, start_date, end_date, "pending"]
        );

        await db.close();

        res.json({ message: "Leave request submitted successfully 💛" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 2000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});