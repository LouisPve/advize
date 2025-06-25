import data from "../../data/portefeuilles.json";
import { Portfolio } from "./types";

const typedData = data as Portfolio[];

function getPortfolios(): Portfolio[] {
  return typedData;
}

function getPortfolioById(id: number): Portfolio {
  const fund = typedData.find((f) => f.id === id);
  if (!fund) {
    throw new Error(`Portfolio with ID ${id} not found`);
  }
  return fund;
}

export { getPortfolios, getPortfolioById };
