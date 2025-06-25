import { Request, Response } from "express";
import * as portefolioService from "./service";

function getPortfolios(_: Request, res: Response) {
  const portfolios = portefolioService.getPortfolios();
  res.json(portfolios);
}

function getPortfolioById(req: Request<{ id: string }>, res: Response) {
  const portfolioId = req.params.id;

  const portfolio = portefolioService.getPortfolioById(+portfolioId);
  res.json(portfolio);
}

export { getPortfolios, getPortfolioById };
