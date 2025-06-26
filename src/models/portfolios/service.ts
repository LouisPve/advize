import { Portfolio, PortfolioWithFunds } from "./types";
import { getFundsById } from "../funds/service";
import * as portfolioRepositories from "../../repositories/portfoliosRepositories";

function getPortfolios(): PortfolioWithFunds[] {
  return portfolioRepositories.getAllPortfolios().map((p) => _mapPortfolio(p));
}

function getPortfolioById(id: number): PortfolioWithFunds {
  const fund = portfolioRepositories.getPortfolioById(id);
  if (!fund) {
    throw new Error(`Portfolio with ID ${id} not found`);
  }
  return _mapPortfolio(fund);
}

function _mapPortfolio(portfolio: Portfolio): PortfolioWithFunds {
  return {
    ...portfolio,
    allocations: portfolio.allocations.map((allocation) => ({
      ...allocation,
      fund: getFundsById(allocation.fondId),
    })),
  };
}

export { getPortfolios, getPortfolioById };
