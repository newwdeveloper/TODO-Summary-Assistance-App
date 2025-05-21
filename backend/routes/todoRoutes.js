import express from "express";
import {
  getTodos,
  addTodos,
  deleteTodos,
} from "../controllers/todoController.js";

const router = express.Router();

router.get("/todos", getTodos);
router.post("/todos", addTodos);
router.delete("/todos/:id", deleteTodos);

export default router;
