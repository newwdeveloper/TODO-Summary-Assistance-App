import React, { useEffect } from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "./api/api";
import { ClipLoader } from "react-spinners";

const App = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    try {
      const response = await api.get("/todos");
      setTodos(response.data);
    } catch (error) {
      toast.error("Failed to fetch Todos", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (newTodo.trim() === "") return;
    try {
      setLoading(true);
      await api.post("/todos", { description: newTodo });
      setNewTodo("");
      fetchTodos();
      toast.success("Todo Added");
    } catch (error) {
      toast.error("Failed to add todo", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      setLoading(true);
      await api.delete(`/todos/${id}`);
      fetchTodos();
      toast.info("Todo deleted");
    } catch (error) {
      toast.error("Failed to delete todo", error);
    } finally {
      setLoading(false);
    }
  };

  const summerizedAndSend = async () => {
    try {
      setLoading(true);
      const response = await api.post("/summarize");
      toast.success(response.data.message || "summary sent");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to summarize");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {loading && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-[9999]">
          <ClipLoader color="#22c55e" size={80} />
        </div>
      )}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Todo Summary Assistance
        </h1>
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new Todo"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 "
            onClick={addTodo}
            disabled={loading}
          >
            Add
          </button>
        </div>
        <ul className="space-y-2 mb-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center p-2 border border-gray-200 rounded-md"
            >
              <span className="text-gray-800 text-sm">
                {todo.description}
                <span className="text-xs text-gray-500">({todo.status})</span>
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 text-sm"
                disabled={loading}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={summerizedAndSend}
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
          disabled={loading}
        >
          Summarize and Send to Slack
        </button>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
