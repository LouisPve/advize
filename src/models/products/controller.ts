import { Request, Response } from "express";
import * as productService from "./service";

function getProducts(_: Request, res: Response) {
  // Assuming portfolios data is fetched from a service or database
  const products = productService.getProducts();
  res.json(products);
}

function getProductBydId(req: Request<{ id: string }>, res: Response) {
  const productId = req.params.id;
  const product = productService.getProductBydId(+productId);
  res.json(product);
}

export { getProducts, getProductBydId };
