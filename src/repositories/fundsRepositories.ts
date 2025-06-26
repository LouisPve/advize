import data from "../data/fonds.json";
import { Fund } from "../models/funds/types";

// Type the imported data as an array of Fund objects
// This assumes that the JSON data structure matches the Fund type definition
// This line could be removed if we use an ORM and fetch data from a database
const typedData = data as Fund[];

export function getAllFunds(): Fund[] {
  return typedData;
}

export function getFundById(id: number): Fund | undefined {
  const fund = typedData.find((f) => f.id === id);

  return fund;
}

export function getFundByIsin(isin: string): Fund | undefined {
  const fund = typedData.find((f) => f.isin === isin);
  return fund;
}
