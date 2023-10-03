class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // 继承父类 message
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // 可操作性

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;