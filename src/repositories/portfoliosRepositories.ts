import data from "../data/portefeuilles.json";
import { Portfolio } from "../models/portfolios/types";

// Type the imported data as an array of Fund objects
// This assumes that the JSON data structure matches the Fund type definition
// This line could be removed if we use an ORM and fetch data from a database
const typedData = data as Portfolio[];

export function getAllPortfolios(): Portfolio[] {
  return typedData;
}

export function getPortfolioById(id: number): Portfolio | undefined {
  const fund = typedData.find((f) => f.id === id);

  return fund;
}
