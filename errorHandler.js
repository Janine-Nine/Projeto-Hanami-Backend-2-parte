import { logger } from '../utils/logger.js';

export function errorHandler(err, req, res, next) {
  logger.error({
    message: err.message,
    stack: err.stack
  });

  res.status(500).json({
    error: 'Erro interno no servidor',
    message: err.message
  });
}