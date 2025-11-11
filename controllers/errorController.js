/* eslint-disable import/prefer-default-export */
export const globalErrorHandler = (err, req, res, next) => {
  console.error("🔥 ERROR OCCURRED:");
  console.error(err);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);

    return res.status(400).json({
      status: "fail",
      message: "Validation error",
      errors: messages,
    });
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
