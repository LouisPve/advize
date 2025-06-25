import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { pick } from "../utils/object";

export function validateSchema(
  req: Request,
  res: Response<any, Record<string, any>>,
  next: NextFunction,
  schema: Joi.ObjectSchema,
) {
  const { error } = schema.validate(pick(req, "body", "query", "params"), {
    abortEarly: false,
  });
  if (error) {
    console.error("Validation error:", JSON.stringify(error.details, null, 2));
    res.status(400).json({
      error: ((error.details as Array<{ message: string }> | undefined) ?? [])
        .map((d) => d?.message)
        .join(", ")
        .replace(/"/g, "'"),
    });
  } else {
    next();
  }
}
