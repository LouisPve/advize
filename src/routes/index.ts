import { Router, Express } from "express";
import { setRoutes as setFundsRoutes } from "../models/funds/routes";
import { setRoutes as setPortfoliosRoutes } from "../models/portfolios/routes";
import { setRoutes as setProductsRoutes } from "../models/products/routes";
import { setRoutes as setDepositsRoutes } from "../models/deposits/routes";

export function setRoutes(app: Express) {
  const router = Router();
  setFundsRoutes(router);
  setPortfoliosRoutes(router);
  setProductsRoutes(router);
  setDepositsRoutes(router);

  app.use("/api", router);
}
