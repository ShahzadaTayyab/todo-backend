const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  createTodo,
  getTodos,
  toggleComplete,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

// All routes require the user to be authenticated
router.post("/", protect, createTodo);
router.get("/", protect, getTodos);
router.put("/:id/complete", protect, toggleComplete);
router.put("/:id", protect, updateTodo);
router.delete("/:id", protect, deleteTodo);

module.exports = router;
