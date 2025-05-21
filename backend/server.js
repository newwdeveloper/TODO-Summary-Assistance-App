import express from "express";
import PORT from "./config/portConfig.js";

const app = express();
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
