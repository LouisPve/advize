import { PortfolioDeposit, ProductDeposit } from "./types";
import * as depositService from "./service";
import { Request, Response } from "express";

function getDeposits(_: Request, res: Response) {
  const deposits = depositService.getDeposits();
  res.json(deposits);
}

function getDepositById(req: Request<{ id: string }>, res: Response) {
  const depositId = parseInt(req.params.id, 10);
  const fund = depositService.getDepositById(depositId);
  res.json(fund);
}

function postDeposit(req: Request, res: Response) {
  const deposit = req.body as PortfolioDeposit | ProductDeposit;
  const newDeposit = depositService.postDeposit(deposit);
  res.json(newDeposit);
}

export { getDeposits, getDepositById, postDeposit };
