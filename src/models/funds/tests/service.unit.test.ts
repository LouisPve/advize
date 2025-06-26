import * as fundService from "../service";
import { Fund, FundType } from "../types";
import * as repository from "../../../repositories/fundsRepositories";

import { NotFoundError } from "../../../errors/NotFoundError";

jest.mock("../../../repositories/fundsRepositories", () => ({
  getAllFunds: jest.fn(),
  getFundByIsin: jest.fn(),
  getFundById: jest.fn(),
}));

describe("PortfolioService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllFunds", () => {
    it("should return all funds", () => {
      const mockFunds: Fund[] = [
        { id: 1, isin: "ISIN1", name: "Fund 1", type: FundType.ACTION },
        { id: 2, isin: "ISIN2", name: "Fund 2", type: FundType.MONETAIRE },
      ];
      (repository.getAllFunds as jest.Mock).mockImplementation(() => mockFunds);

      const result = fundService.getFunds();
      expect(repository.getAllFunds).toHaveBeenCalled();
      expect(result).toEqual(mockFunds);
    });
  });

  describe("getFundByIsin", () => {
    it("should return a fund by ISIN", () => {
      const mockFund: Fund = {
        id: 1,
        isin: "ISIN1",
        name: "Fund 1",
        type: FundType.ACTION,
      };
      (repository.getFundByIsin as jest.Mock).mockImplementation(
        () => mockFund,
      );

      const result = fundService.getFundsByISIN("ISIN1");
      expect(repository.getFundByIsin).toHaveBeenCalledWith("ISIN1");
      expect(result).toEqual(mockFund);
    });

    it("should throw NotFoundError if fund not found", () => {
      (repository.getFundByIsin as jest.Mock).mockImplementation(() => null);

      expect(() => fundService.getFundsByISIN("UNKNOWN")).toThrow(
        NotFoundError,
      );
    });
  });

  describe("getFundById", () => {
    it("should return a fund by ID", () => {
      const mockFund: Fund = {
        id: 1,
        isin: "ISIN1",
        name: "Fund 1",
        type: FundType.ACTION,
      };
      (repository.getFundById as jest.Mock).mockImplementation(() => mockFund);

      const result = fundService.getFundsById(1);
      expect(repository.getFundById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockFund);
    });

    it("should throw NotFoundError if fund not found by ID", () => {
      (repository.getFundById as jest.Mock).mockImplementation(() => null);

      expect(() => fundService.getFundsById(-1)).toThrow(NotFoundError);
    });
  });
});
