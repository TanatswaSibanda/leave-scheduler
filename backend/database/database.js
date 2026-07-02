const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

async function connectDB() {
    const db = await open({
        filename: path.join(__dirname, "leave_scheduler.db"),
        driver: sqlite3.Database,
    });

    return db;
}

module.exports = connectDB;