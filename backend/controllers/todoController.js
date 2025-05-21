import supabase from "../config/supabaseConfig.js";
import AppError from "../middlewares/appError.js";

const getTodos = async (req, res, next) => {
  const { data, error } = await supabase.from("todos").select("*");
  if (error) {
    return next(new AppError(error.message, 500));
  }
  res.json(data);
};

const addTodos = async (req, res, next) => {
  const { description } = req.body;
  if (!description) {
    return next(new AppError("Description is required", 400));
  }
  const { data, error } = await supabase
    .from("todos")
    .insert([{ description }])
    .select();
  if (error) return next(new AppError(error.message, 500));
  res.status(201).json(data[0]);
};

const deleteTodos = async (req, res, next) => {
  const { id } = req.params;
  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) return next(new AppError(error.message, 500));
  res.status(204).send();
};

export { getTodos, addTodos, deleteTodos };
