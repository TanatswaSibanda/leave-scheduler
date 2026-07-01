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

const PORT = 2000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});