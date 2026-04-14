const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4001;
const Db = require("./modal/db");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: [
    "https://metricsfullprojectclient-am6workku-vganapathirajas-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB not connected", err));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("hello world, backend is ready to receive the front end datas");
});

// ✅ API
app.post("/sign", async (req, res) => {
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

// ✅ IMPORTANT (THIS WAS MISSING)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
