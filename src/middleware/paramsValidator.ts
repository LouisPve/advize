import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { pick } from "../utils/object";

export function validateSchema(
  req: Request,
  res: Response<any, Record<string, any>>,
  next: NextFunction,
  schema: Joi.ObjectSchema
) {
  const { error } = schema.validate(pick(req, "body", "query", "params"), {
    abortEarly: false,
  });
  if (error) {
    res
      .status(400)
      .json({ error: error.details.map((d) => d.message).join(", ") });
  } else {
    next();
  }
}
