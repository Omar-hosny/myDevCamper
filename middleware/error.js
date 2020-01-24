const ErrorResponse = require("../utils/errorResponse");

const errorHandling = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;
  // log to the console for dev
  console.log(err);

  // Mongoose bad ObjectID
  if (err.name === "CastError") {
    const message = `Resourse not found`;
    error = new ErrorResponse(message, 404);
  }

  // Monggose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered...";
    error = new ErrorResponse(message, 400);
  }

  // mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "server error" });
};

module.exports = errorHandling;
