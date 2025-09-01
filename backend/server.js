require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");


const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));