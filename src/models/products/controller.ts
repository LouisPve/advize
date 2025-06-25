import { Request, Response } from "express";
import * as productService from "./service";

function getProducts(req: Request, res: Response) {
  try {
    // Assuming portfolios data is fetched from a service or database
    const products = productService.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function getProductBydId(req: Request, res: Response) {
  const productId = req.params.id;
  try {
    const product = productService.getProductBydId(+productId);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export { getProducts, getProductBydId };
