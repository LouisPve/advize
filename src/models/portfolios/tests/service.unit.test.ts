import * as portfolioService from "../service";
import { Portfolio } from "../types";
import * as repository from "../../../repositories/portfoliosRepositories";
import * as fundRepository from "../../../repositories/fundsRepositories";
import { NotFoundError } from "../../../errors/NotFoundError";

jest.mock("../../../repositories/portfoliosRepositories", () => ({
  getPortfolioById: jest.fn(),
  getAllPortfolios: jest.fn(),
}));

jest.mock("../../../repositories/fundsRepositories", () => ({
  getFundById: jest.fn(),
}));

describe("PortfolioService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getPortfolio", () => {
    it("should return a portfolio when found", () => {
      const mockPortfolio: Portfolio = {
        id: 1,
        name: "Test",
        allocations: [
          { fondId: 1, percentage: 50 },
          { fondId: 2, percentage: 50 },
        ],
      };
      (repository.getPortfolioById as jest.Mock).mockImplementation(
        () => mockPortfolio,
      );

      (fundRepository.getFundById as jest.Mock).mockImplementation(
        (id: number) => ({
          id,
          name: `Fund ${id}`,
          type: "Equity",
          isin: `FR${id}`,
        }),
      );

      const result = portfolioService.getPortfolioById(1);
      expect(repository.getPortfolioById).toHaveBeenCalledWith(1);
      expect(fundRepository.getFundById).toHaveBeenCalledWith(1);
      expect(fundRepository.getFundById).toHaveBeenCalledWith(2);

      expect(result).toEqual({
        ...mockPortfolio,
        allocations: [
          {
            percentage: 50,
            fondId: 1,
            fund: { id: 1, name: "Fund 1", type: "Equity", isin: "FR1" },
          },
          {
            percentage: 50,
            fondId: 2,
            fund: { id: 2, name: "Fund 2", type: "Equity", isin: "FR2" },
          },
        ],
      });
    });

    it("should return null when portfolio not found", () => {
      (repository.getPortfolioById as jest.Mock).mockImplementation(() => null);

      expect(() => portfolioService.getPortfolioById(2)).toThrow(NotFoundError);
      expect(repository.getPortfolioById).toHaveBeenCalledWith(2);
    });
  });
});
