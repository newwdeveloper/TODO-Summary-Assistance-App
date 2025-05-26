import express from "express";
import PORT from "./config/portConfig.js";
import todoRoutes from "./routes/todoRoutes.js";
import summarizeRoutes from "./routes/summarizeRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import cors from "cors";

const app = express();

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use(cors());
app.use(express.json());

app.use(todoRoutes);
app.use(summarizeRoutes);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
