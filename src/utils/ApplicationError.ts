class ApplicationError extends Error {
  status: number = 500;
  message: string = 'An unexpected error occurred';

  constructor(message: string, status: number) {
    super(message);

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message = message || this.message;
    this.status = status || this.status;
  }
}

export default ApplicationError;
