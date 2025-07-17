const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Default error
  let error = {
    success: false,
    message: 'Internal server error'
  };

  // Validation errors
  if (err.name === 'ValidationError') {
    error.message = Object.values(err.errors).map(val => val.message).join(', ');
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error.message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    error.message = 'Token expired';
  }

  // MySQL errors
  if (err.code === 'ER_DUP_ENTRY') {
    error.message = 'Duplicate entry';
  }

  // Custom errors
  if (err.statusCode) {
    error.message = err.message;
    return res.status(err.statusCode).json(error);
  }

  res.status(500).json(error);
};

module.exports = { errorHandler };