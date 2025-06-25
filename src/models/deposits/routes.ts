import { Request, Response, NextFunction, Router } from "express";
import { getDeposits, getDepositById, postDeposit } from "./controller";
import { validateSchema } from "../../middleware/paramsValidator";
import Joi from "joi";
import { DepositType } from "./types";
import { FundType } from "../funds/types";

export function setRoutes(baserouter: Router) {
  const router = Router();
  router.post("/", postDepositsValidator, postDeposit);
  router.get("/", getDepositsValidator, getDeposits);
  router.get("/:id", getDepositsByIdValidator, getDepositById);

  baserouter.use("/deposits", router);
}

function getDepositsValidator(req: Request, res: Response, next: NextFunction) {
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

function getDepositsByIdValidator(
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
        id: Joi.number().required(),
      }).required(),
      query: Joi.forbidden(),
    }),
  );
}

function postDepositsValidator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  validateSchema(
    req,
    res,
    next,
    Joi.object({
      body: Joi.alternatives()
        .conditional("body.type", {
          switch: [
            {
              is: DepositType.PRODUCT,
              then: Joi.object({
                type: Joi.string().valid(DepositType.PRODUCT).required(),
                productId: Joi.number().positive().required(),
                allocation: Joi.array()
                  .items(
                    Joi.object({
                      type: Joi.string()
                        .valid(...Object.values(FundType))
                        .required(),
                      amount: Joi.number().positive().required(),
                    }),
                  )
                  .required(),
              }).required(),
            },
            {
              is: DepositType.PORTFOLIO,
              then: Joi.object({
                type: Joi.string().valid(DepositType.PORTFOLIO).required(),
                portfolioId: Joi.number().positive().required(),
                amount: Joi.number().positive().required(),
              }).required(),
            },
          ],
        })
        .required(),
      params: Joi.forbidden(),
      query: Joi.forbidden(),
    }),
  );
}
