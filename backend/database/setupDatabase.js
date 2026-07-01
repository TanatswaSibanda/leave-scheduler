const connectDB = require("./database");

async function setupDatabase() {
    try {
        const db = await connectDB();
        await db.exec(`
    CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        team TEXT NOT NULL
    )
`);
        await db.exec(`
    CREATE TABLE IF NOT EXISTS leave_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        employee_id INTEGER NOT NULL,
        start_date TEXT NOT NULL,
        end_date TEXT NOT NULL,
        status TEXT NOT NULL,
        FOREIGN KEY (employee_id) REFERENCES employees(id)
    )
`);
        await db.exec(`
    CREATE TABLE IF NOT EXISTS public_holidays (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        holiday_date TEXT NOT NULL,
        holiday_name TEXT NOT NULL
    )
`);
        await db.exec("DELETE FROM leave_requests;");
        await db.exec("DELETE FROM employees;");
        await db.exec("DELETE FROM public_holidays;");

        await db.exec("DELETE FROM sqlite_sequence WHERE name='employees';");
        const employees = [
            ["Alice Johnson", "Engineering"],
            ["Brian Smith", "Engineering"],
            ["Carol Davis", "Engineering"],
            ["David Wilson", "Engineering"],
            ["Emma Brown", "Engineering"],
            ["Faith Moyo", "Operations"],
            ["George Banda", "Operations"],
            ["Helen Ncube", "Operations"],
            ["Ian Dube", "Operations"],
            ["Jane Sibanda", "Operations"],
            ["Kevin Zhou", "Finance"],
            ["Linda Adams", "Finance"],
            ["Michael Jones", "Finance"],
            ["Nancy White", "Finance"],
            ["Oscar Green", "Finance"]
        ];
        for (const employee of employees) {
            await db.run(
                `INSERT INTO employees (name, team)
         VALUES (?, ?)`,
                employee
            );
        }
        console.log("Employees inserted successfully.");
        const holidays = [
            ["2026-07-10", "Heroes Day"],
            ["2026-07-22", "Unity Day"],
            ["2026-08-01", "National Day"],
            ["2026-08-11", "Defense Forces Day"],
            ["2026-08-25", "Labour Day"]
        ];

        for (const holiday of holidays) {
            await db.run(
                `INSERT INTO public_holidays (holiday_date, holiday_name)
         VALUES (?, ?)`,
                holiday
            );
        }


        console.log("Database setup completed!");

        await db.close();
    } catch (error) {
        console.error(error);
    }

}

setupDatabase();