const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const colors = require("colors");
const PORT = process.env.PORT;
const authRoutes = require("./routes/authRoutes");
const { connectDb } = require("./config/dbConnect");

// App Initilization
const app = express();

// DB Connection
connectDb();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auth Routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hellow World!!",
  });
});

app.use("/api/v0/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.blue.underline);
});
