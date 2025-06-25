const Todo = require("../models/Todo");

// Create new todo
exports.createTodo = async (req, res) => {
  try {
    const { text } = req.body;
    const todo = new Todo({
      text,
      user: req.user._id,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get all todos for the logged-in user
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

// Toggle completion status
exports.toggleComplete = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!todo) return res.status(404).json({ error: "Todo not found" });

    todo.completed = !todo.completed;
    await todo.save();

    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: "Failed to update completion status" });
  }
};

// Update todo text
exports.updateTodo = async (req, res) => {
  try {
    const { text } = req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { text },
      { new: true }
    );

    if (!todo) return res.status(404).json({ error: "Todo not found" });

    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: "Failed to update todo" });
  }
};

// Delete todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!todo) return res.status(404).json({ error: "Todo not found" });

    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
};
