const mysql2 = require("mysql2");

const pool = mysql2.createPool({
    host: process.env.DB_HOST || "mysql",
    user: process.env.DB_USER || "myuser",
    password: process.env.DB_PASSWORD || "Root@123",
    database: process.env.DB_NAME || "metrics",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 🔥 TEST CONNECTION PROPERLY
const checkConnection = () => {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log("⏳ MySQL not ready, retrying in 5 sec...");
            setTimeout(checkConnection, 5000);
        } else {
            console.log("✅ MySQL connected successfully!");
            conn.release();
        }
    });
};

checkConnection();

module.exports = pool;
