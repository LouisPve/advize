import { Request, Response } from "express";
import * as portefolioService from "./service";

function getPortfolios(req: Request, res: Response) {
  try {
    // Assuming portfolios data is fetched from a service or database
    const portfolios = portefolioService.getPortfolios();
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function getPortfolioById(req: Request, res: Response) {
  const portfolioId = req.params.id;
  try {
    const portfolio = portefolioService.getPortfolioById(+portfolioId);
    res.json(portfolio);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export { getPortfolios, getPortfolioById };
