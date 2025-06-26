import { Fund } from "./types";
import * as fundsRepositories from "../../repositories/fundsRepositories";

function getFunds(): Fund[] {
  return fundsRepositories.getAllFunds();
}

function getFundsByISIN(isin: string) {
  const fund = fundsRepositories.getFundByIsin(isin);
  if (!fund) {
    throw new Error(`Fund with ISIN ${isin} not found`);
  }
  return fund;
}

function getFundsById(id: number) {
  const fund = fundsRepositories.getFundById(id);
  if (!fund) {
    throw new Error(`Fund with id ${id} not found`);
  }
  return fund;
}

export { getFunds, getFundsById, getFundsByISIN };
