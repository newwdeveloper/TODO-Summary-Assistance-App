import express from "express";
import { summarizedTodos } from "../controllers/summarizedController.js";

const router = express.Router();

router.post("/summarize", summarizedTodos);

export default router;
