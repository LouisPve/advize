import { Product } from "./types";
import * as productsRepositories from "../../repositories/productsRepositories";

function getProducts(): Product[] {
  return productsRepositories.getAllProducts();
}

function getProductBydId(id: number): Product {
  const fund = productsRepositories.getProductById(id);
  if (!fund) {
    throw new Error(`Product with ID ${id} not found`);
  }
  return fund;
}

export { getProducts, getProductBydId };
