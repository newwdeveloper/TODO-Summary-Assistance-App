const errorHandler = (req, res, next) => {
  console.error("❌ Error:", err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : "something went wrong";

  res.status(statusCode).json({
    status: "error",
    message,
  });
};

export default errorHandler;
