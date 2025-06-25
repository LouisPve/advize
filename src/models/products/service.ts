import data from "../../data/produits.json";
import { Product } from "./types";

const typedData = data as Product[];

function getProducts(): Product[] {
  return typedData;
}

function getProductBydId(id: number): Product {
  const fund = typedData.find((f) => f.id === id);
  if (!fund) {
    throw new Error(`Product with ID ${id} not found`);
  }
  return fund;
}

export { getProducts, getProductBydId };
