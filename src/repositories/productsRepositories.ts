import data from "../data/produits.json";
import { Product } from "../models/products/types";

// Type the imported data as an array of Fund objects
// This assumes that the JSON data structure matches the Fund type definition
// This line could be removed if we use an ORM and fetch data from a database
const typedData = data as Product[];

export function getAllProducts(): Product[] {
  return typedData;
}

export function getProductById(id: number): Product | undefined {
  const fund = typedData.find((f) => f.id === id);

  return fund;
}
