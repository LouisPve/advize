import { HttpError } from "./httpError";

export class BadRequestError extends HttpError {
  constructor(message: string, statusCode: number = 400) {
    super(message, statusCode);
    this.name = "BadRequestError";
  }
}
