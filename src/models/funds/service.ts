import data from "../../data/fonds.json";
import { Fund } from "./types";

// Type the imported data as an array of Fund objects
// This assumes that the JSON data structure matches the Fund type definition
// This line could be removed if we use an ORM and fetch data from a database
const typedData = data as Fund[];

function getFunds(): Fund[] {
  return typedData;
}

function getFundsById(isin: string) {
  const fund = typedData.find((f) => f.isin === isin);
  if (!fund) {
    throw new Error(`Fund with ISIN ${isin} not found`);
  }
  return fund;
}

export { getFunds, getFundsById };
