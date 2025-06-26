import { BadRequestError } from "../../../errors/BadRequestError";
import { getDeposits, getDepositById, postDeposit } from "../service";
import { DepositType, PortfolioDeposit, ProductDeposit } from "../types";

describe("Deposit Service", () => {
  it("should add a portfolio deposit", () => {
    const deposit: PortfolioDeposit = {
      type: DepositType.PORTFOLIO,
      portfolioId: 1,
      amount: 1000,
    };
    const result = postDeposit(deposit);
    expect(result).toMatchObject({
      portfolioId: 1,
      amount: 1000,
      type: DepositType.PORTFOLIO,
    });
    expect(getDeposits().length).toBe(1);
  });

  it("should add a product deposit with allocation", () => {
    const deposit: ProductDeposit = {
      type: DepositType.PRODUCT,
      productId: 1,
      allocation: [
        { type: "action", amount: 500 },
        { type: "obligation", amount: 500 },
      ],
    };
    const result = postDeposit(deposit);
    expect(result).toHaveProperty("productId", 1);
    expect(result).toHaveProperty("allocation");
    expect(getDeposits().length).toBeGreaterThan(0);
  });

  it("should not add a product deposit with incorect allocation", () => {
    const deposit: ProductDeposit = {
      type: DepositType.PRODUCT,
      productId: 1,
      allocation: [{ type: "action", amount: 1000 }],
    };

    expect(() => postDeposit(deposit)).toThrow(BadRequestError);
  });

  it("should get deposit by id", () => {
    const deposit: PortfolioDeposit = {
      type: DepositType.PORTFOLIO,
      portfolioId: 2,
      amount: 2000,
    };
    const newDeposit = postDeposit(deposit);
    const found = getDepositById(newDeposit.id);
    expect(found).toEqual(newDeposit);
  });

  it("should throw error for invalid deposit type", () => {
    expect(() =>
      postDeposit({ type: "invalid" } as unknown as
        | ProductDeposit
        | PortfolioDeposit),
    ).toThrow();
  });
});
