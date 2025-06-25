import { Request, Response } from "express";
import * as fundService from "./service";

function getFunds(req: Request, res: Response) {
  try {
    // Assuming fundService.getFunds() returns a promise
    // If it returns a synchronous value, you can remove the try-catch block
    const funds = fundService.getFunds();
    res.json(funds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function getFundsById(req: Request, res: Response) {
  const fundId = req.params.id;
  try {
    const fund = fundService.getFundsById(fundId);
    res.json(fund);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export { getFunds, getFundsById };
