import { Deposit, PortfolioDeposit, ProductDeposit } from "./types";
import * as depositService from "./service";
import { Request, Response } from "express";

function getDeposits(req: Request, res: Response) {
  try {
    const deposits = depositService.getDeposits();
    res.json(deposits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function getDepositById(req: Request, res: Response) {
  const depositId = parseInt(req.params.id, 10);
  try {
    const fund = depositService.getDepositById(depositId);
    res.json(fund);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

function postDeposit(req: Request, res: Response) {
  const deposit: PortfolioDeposit | ProductDeposit = req.body;
  try {
    const newDeposit = depositService.postDeposit(deposit);
    res.json(newDeposit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export { getDeposits, getDepositById, postDeposit };
