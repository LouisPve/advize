import { FundType } from "../funds/types";

export interface Deposit {
  id: number;
  amount?: number;
  productId?: number;
  portfolioId?: number; // ID of the portfolio if applicable
  allocation?: Array<{
    type: FundType;
    amount: number; // Amount allocated to this fund type
  }>;
  date: number; // date as a timestamp
  type: DepositType; // Type of deposit
}

export interface PortfolioDeposit {
  type: "portfolio";
  portfolioId: number; // ID of the portfolio to deposit into
  amount: number; // Amount to deposit into the portfolio
}

export interface ProductDeposit {
  type: "product";
  productId: number; // ID of the product to deposit into
  allocation: Array<{
    type: string;
    amount: number; // Amount to allocate to this fund type
  }>;
}

export enum DepositType {
  PORTFOLIO = "portfolio",
  PRODUCT = "product",
}
