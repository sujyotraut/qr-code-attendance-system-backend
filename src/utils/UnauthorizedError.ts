import ApplicationError from './ApplicationError';

class UnauthorizedError extends ApplicationError {
  constructor(message?: string) {
    super(message || 'Unauthorized', 401);
    Error.captureStackTrace(this, this.constructor);
  }
}

export default UnauthorizedError;
