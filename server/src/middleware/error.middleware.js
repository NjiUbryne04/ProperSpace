const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({ message: `${field} already in use` });
  }
  if (err.name === 'CastError') {
    return res.status(404).json({ message: 'Resource not found' });
  }

  res.status(err.statusCode || 500).json({ message: err.message || 'Internal server error' });
};

module.exports = errorHandler;
