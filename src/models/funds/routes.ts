import { Request, Response, NextFunction, Router } from "express";
import { getFunds, getFundsById } from "./controller";
import { validateSchema } from "src/middleware/paramsValidator";
import Joi from "joi";

export function setRoutes(baserouter: Router) {
  const router = Router();
  router.get("/", getFundsValidator, getFunds);
  router.get("/:id", getFundsByIdValidator, getFundsById);

  baserouter.use("/funds", router);
}

function getFundsValidator(req: Request, res: Response, next: NextFunction) {
  validateSchema(
    req,
    res,
    next,
    Joi.object({
      body: Joi.forbidden(), // No body allowed
      params: Joi.forbidden(), // No params allowed
      query: Joi.forbidden(), // No query params allowed
    })
  );
}

function getFundsByIdValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  validateSchema(
    req,
    res,
    next,
    Joi.object({
      body: Joi.forbidden(),
      params: Joi.object({
        id: Joi.string()
          .regex(/^[A-Z]{2}[0-9]{9}$/) // Example regex for a fund ISIN
          .required(),
      }).required(),
      query: Joi.forbidden(),
    })
  );
}
