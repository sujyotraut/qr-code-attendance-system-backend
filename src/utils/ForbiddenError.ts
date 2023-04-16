import ApplicationError from './ApplicationError';

class ForbiddenError extends ApplicationError {
  constructor(message?: string) {
    super(message || 'Forbidden', 403);
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ForbiddenError;
