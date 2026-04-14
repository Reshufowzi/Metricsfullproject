const mysql2 = require("mysql2");

const myshecma = mysql2.createConnection({
    host: process.env.DB_HOST || "mysql",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    port: 3306,
    database: process.env.DB_NAME || "metrics"
});

// 🔥 RETRY LOGIC
const connectWithRetry = () => {
    myshecma.connect((err) => {
        if (err) {
            console.log("⏳ MySQL not ready, retrying in 5 sec...");
            setTimeout(connectWithRetry, 5000);
        } else {
            console.log("✅ MySQL connected successfully!");
        }
    });
};

connectWithRetry();

module.exports = myshecma;
