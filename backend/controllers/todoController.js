import Todo from "../models/todo.js";

// GET all todos
export const getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

// CREATE todo
export const createTodo = async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
  });

  const createdTodo = await todo.save();
  res.status(201).json(createdTodo);
};

// UPDATE todo
export const updateTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (todo) {
    todo.completed = !todo.completed;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
};

// DELETE todo
export const deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
};
