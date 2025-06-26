import * as productService from "../service";
import { Product } from "../types";
import * as repository from "../../../repositories/productsRepositories";
import { NotFoundError } from "../../../errors/NotFoundError";

jest.mock("../../../repositories/productsRepositories", () => ({
  getProductById: jest.fn(),
  getAllProducts: jest.fn(),
  createProduct: jest.fn(),
}));

describe("ProductService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getProduct", () => {
    it("should return a product by id", () => {
      const mockProduct: Product = {
        id: 1,
        name: "Test",
        configuration: {
          action: { min: 10, max: 100 },
          monetaire: { min: 5, max: 50 },
          obligation: { min: 20, max: 200 },
        },
      };
      (repository.getProductById as jest.Mock).mockImplementation(
        () => mockProduct,
      );

      const result = productService.getProductBydId(1);
      expect(repository.getProductById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockProduct);
    });

    it("should return null if product not found", () => {
      (repository.getProductById as jest.Mock).mockImplementation(() => null);

      expect(() => productService.getProductBydId(2)).toThrow(NotFoundError);
    });
  });

  describe("getAllProducts", () => {
    it("should return all products", () => {
      const mockProducts: Product[] = [
        {
          id: 1,
          name: "Test",
          configuration: {
            action: { min: 10, max: 100 },
            monetaire: { min: 5, max: 50 },
            obligation: { min: 20, max: 200 },
          },
        },
        {
          id: 2,
          name: "Test2",
          configuration: {
            action: { min: 10, max: 100 },
            monetaire: { min: 5, max: 50 },
            obligation: { min: 20, max: 200 },
          },
        },
      ];
      (repository.getAllProducts as jest.Mock).mockImplementation(
        () => mockProducts,
      );

      const result = productService.getProducts();
      expect(repository.getAllProducts).toHaveBeenCalled();
      expect(result).toEqual(mockProducts);
    });
  });
});
