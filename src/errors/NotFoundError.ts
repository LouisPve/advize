import { HttpError } from "./httpError";

export class NotFoundError extends HttpError {
  constructor(message: string, statusCode: number = 404) {
    super(message, statusCode);
    this.name = "NotFoundError";
  }
}
