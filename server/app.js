const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoutes = require("./routes/userRoutes");
const crawlRoutes = require("./routes/crawlRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Serve static files (e.g., uploaded files) from the 'uploads' directory
app.use("/uploads", express.static("uploads"));

// Define API routes
// Prefix routes with '/api'
app.use("/api", userRoutes);
app.use("/api", crawlRoutes);
app.use("/api", dashboardRoutes);

// Connect to the database
connectDB();

// Export the app for use in other files (e.g., for testing or starting the server)
module.exports = app;
