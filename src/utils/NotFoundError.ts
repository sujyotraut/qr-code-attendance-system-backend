import ApplicationError from './ApplicationError';

class NotFoundError extends ApplicationError {
  constructor(message: string = 'Not Found') {
    super(message, 404);
  }
}

export default NotFoundError;
