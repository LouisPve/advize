import { Router } from "express";
import { getProductBydId, getProducts } from "./controller";

export function setRoutes(baserouter: Router) {
  const router = Router();
  router.get("/", getProducts);
  router.get("/:id", getProductBydId);

  baserouter.use("/products", router);
}
