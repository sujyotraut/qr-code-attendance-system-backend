import ApplicationError from './ApplicationError';

class NotFoundError extends ApplicationError {
  constructor(message?: string) {
    super(message || 'Not Found', 404);
    Error.captureStackTrace(this, this.constructor);
  }
}

export default NotFoundError;
