import { NextFunction, Router, Request, Response } from "express";
import { getPortfolioById, getPortfolios } from "./controller";

import Joi from "joi";
import { validateSchema } from "../../middleware/paramsValidator";

export function setRoutes(baserouter: Router) {
  const router = Router();
  router.get("/", getPortfoliosValidator, getPortfolios);
  router.get("/:id", getPortfolioByIdValidator, getPortfolioById);

  baserouter.use("/portfolios", router);
}

function getPortfoliosValidator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  validateSchema(
    req,
    res,
    next,
    Joi.object({
      body: Joi.forbidden(), // No body allowed
      params: Joi.forbidden(), // No params allowed
      query: Joi.forbidden(), // No query params allowed
    }),
  );
}

function getPortfolioByIdValidator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  validateSchema(
    req,
    res,
    next,
    Joi.object({
      body: Joi.forbidden(),
      params: Joi.object({
        id: Joi.number() // Example regex for a fund ISIN
          .required(),
      }).required(),
      query: Joi.forbidden(),
    }),
  );
}
