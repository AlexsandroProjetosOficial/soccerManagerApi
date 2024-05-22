import type { IAppError } from '../interfaces/errors/IAppError';

class AppError extends Error {
  public readonly error: boolean;
  public readonly message: string;
  public readonly statusCode: number;
  public readonly errors: Array<string>;

  constructor({ message, statusCode = 400, errors = [] }: IAppError) {
    super();
    this.error = true;
    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export { AppError };
