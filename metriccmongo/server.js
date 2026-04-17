const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Db = require("./modal/db");

const app = express();
const PORT = 4001;

// ✅ CORS
app.use(cors({
  origin: [
    "http://3.237.50.59",
    "https://metricsfullprojectclient-am6workku-vganapathirajas-projects.vercel.app"
  ],
  methods: ["GET", "POST"],
}));

// ✅ Middleware
app.use(express.json());

// ✅ MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log(err));

// ✅ Test
app.get("/", (req, res) => {
  res.send("Backend running");
});

// ✅ SIGNUP API (FINAL FIXED)
app.post("/signup", async (req, res) => {
  try {
    console.log("BODY:", req.body); // debug

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing data" });
    }

    const data = new Db({
      semail: email,
      spass: password
    });

    await data.save();

    res.status(200).json({ message: "Data stored successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
