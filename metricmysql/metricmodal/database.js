const mysql2 = require("mysql2");

const myshecma = mysql2.createConnection({
    host: process.env.DB_HOST || "mysql",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    port: 3306,
    database: process.env.DB_NAME || "metrics"
});

myshecma.connect((err) => {
    if (err) {
        console.error("❌ MySQL connection failed:", err);
    } else {
        console.log("✅ MySQL connected successfully!");
    }
});

module.exports = myshecma;
