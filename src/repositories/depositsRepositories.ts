import { Deposit } from "../models/deposits/types";

// Type the imported data as an array of Fund objects
// This assumes that the JSON data structure matches the Fund type definition
// This line could be removed if we use an ORM and fetch data from a database
const typedData = [] as Deposit[];

export function getAllDeposits(): Deposit[] {
  return typedData;
}

export function getDepositById(id: number): Deposit | undefined {
  const fund = typedData.find((f) => f.id === id);

  return fund;
}

export function createDeposit(deposit: Deposit): Deposit {
  // Assign a new ID to the deposit
  deposit.id = typedData.length + 1;
  // Add the new deposit to the array
  typedData.push(deposit);
  // Return the newly created deposit
  return deposit;
}
