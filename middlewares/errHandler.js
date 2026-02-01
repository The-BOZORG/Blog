import ErrorResponse from '../errors/customError.js';

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;
  console.log(err.stack.red);

  // mongoose CastError
  if (err.name === 'CastError') {
    const message = `No item found with id: ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // mongoose ValidationError
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ');
    error = new ErrorResponse(message, 400);
  }

  // duplicate error
  if (err.code && err.code === 11000) {
    const message = `Duplicate value entered for ${Object.keys(err.keyValue)} field`;
    error = new ErrorResponse(message, 400);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = new ErrorResponse('Invalid Token. Authentication failed', 401);
  }

  //JWT expire error
  if (err.name === 'TokenExpiredError') {
    error = new ErrorResponse('Token expired. Please login again', 401);
  }

  // unauthorized / forbidden
  if (err.statusCode === 403) {
    error = new ErrorResponse(err.message || 'Access forbidden', 403);
  }

  // not found
  if (err.statusCode === 404) {
    error = new ErrorResponse(err.message || 'Resource not found', 404);
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'server error',
  });
};

export default errorHandler;
