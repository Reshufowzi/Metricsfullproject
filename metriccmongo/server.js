const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Db = require("./modal/db");

const app = express();
const PORT = 4001;

// ✅ CORS FIX (allow EC2 + Vercel)
app.use(cors({
  origin: [
    "http://3.237.50.59",
    "https://metricsfullprojectclient-am6workku-vganapathirajas-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB not connected", err));

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("hello world, backend is ready to receive the front end datas");
});

// ✅ API Route
app.post("/signup", async (req, res) => {
  try {
    const { semail, spass } = req.body;

    if (!semail || !spass) {
      return res.status(400).json({ error: "Missing data" });
    }

    const data = new Db({ semail, spass });
    await data.save();

    res.status(200).json({ message: "Data stored successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ IMPORTANT: start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
