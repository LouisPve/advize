import portfolioData from "../../data/portefeuilles.json";
import { Portfolio, PortfolioWithFunds } from "./types";
import { getFundsById } from "../funds/service";

const typedPortfolioData = portfolioData as Portfolio[];

function getPortfolios(): PortfolioWithFunds[] {
  return typedPortfolioData.map((p) => _mapPortfolio(p));
}

function getPortfolioById(id: number): PortfolioWithFunds {
  const fund = typedPortfolioData.find((f) => f.id === id);
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
