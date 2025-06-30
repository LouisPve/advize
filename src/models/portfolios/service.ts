import { Portfolio, PortfolioWithFunds } from "./types";
import { getFundsById } from "../funds/service";
import * as portfolioRepositories from "../../repositories/portfoliosRepositories";
import { NotFoundError } from "../../errors/NotFoundError";

function getPortfolios(): PortfolioWithFunds[] {
  return portfolioRepositories.getAllPortfolios().map((p) => _mapPortfolio(p));
}

function getPortfolioById(id: number): PortfolioWithFunds {
  const fund = portfolioRepositories.getPortfolioById(id);
  if (!fund) {
    throw new NotFoundError(`Portfolio with ID ${id} not found`);
  }
  return _mapPortfolio(fund);
}

function _mapPortfolio(portfolio: Portfolio): PortfolioWithFunds {
  return {
    ...portfolio,
    allocations: portfolio.allocations.map((allocation) => ({
      ...allocation,
      fund: getFundsById(allocation.fundId),
    })),
  };
}

export { getPortfolios, getPortfolioById };
