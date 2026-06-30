const connectDB = require("./database");

async function setupDatabase() {
    const db = await connectDB();

    console.log("Connected to database");
}

setupDatabase();