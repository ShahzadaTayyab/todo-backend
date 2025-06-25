const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

// ✅ Trust proxy to allow secure cookies (important for Railway)
app.set("trust proxy", 1);

// ✅ CORS middleware with localhost and Vercel allowed
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://your-frontend.vercel.app", // 🔁 Replace with your actual Vercel frontend URL
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

// ✅ Connect to DB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => console.error(err));
