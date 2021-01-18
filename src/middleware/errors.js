import logger from "../config/logger";

const joiErrors = (error) =>
  error.details.map((detail) => detail.message).join(",");

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  logger.error({
    message: err.message,
    status: err.statusCode,
    stack: err.stack,
  });

  // Handling Joi Validation Error
  if (err.details) {
    const errors = joiErrors(err);
    return res.status(400).json({
      code: 1,
      msg: errors,
    });
  }

  let error = { ...err };
  error.message = err.message;
  res.status(error.statusCode).json({
    code: 2,
    msg: error.message || "Internal Server Error.",
  });
};
