const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

// ✅ CORS
const allowedOrigins = [
  "http://localhost:3000",
  "https://todo-frontend-h9ve.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ✅ JSON + Cookie parser
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

// ✅ Connect to DB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(8000, () => {
      console.log("Server running on http://localhost:8000");
    });
  })
  .catch((err) => console.error(err));
