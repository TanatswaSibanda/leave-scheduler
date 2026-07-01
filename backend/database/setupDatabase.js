const connectDB = require("./database");

async function setupDatabase() {
    const db = await connectDB();
    await db.exec(`
    CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        team TEXT NOT NULL
    )
`);

    console.log("Employees table created");
}

setupDatabase();