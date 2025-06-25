import { Request, Response } from "express";
import * as fundService from "./service";

function getFunds(_: Request, res: Response) {
  const funds = fundService.getFunds();
  res.json(funds);
}

function getFundsByISIN(req: Request<{ id: string }>, res: Response) {
  const fundId = req.params.id;

  const fund = fundService.getFundsByISIN(fundId);
  res.json(fund);
}

export { getFunds, getFundsByISIN };
