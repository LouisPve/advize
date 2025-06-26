import { Fund } from "../funds/types";

export interface Portfolio {
  id: number;
  name: string;
  allocations: Allocation[];
}

export interface Allocation {
  fondId: number;
  percentage: number;
}

export interface PortfolioWithFunds {
  id: number;
  name: string;
  allocations: {
    percentage: number;
    fund: Fund;
  }[];
}
