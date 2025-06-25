import { Fund } from "../funds/types";

export interface Portfolio {
  id: number;
  nom: string;
  allocations: Allocation[];
}

export interface Allocation {
  fondId: number;
  pourcentage: number;
}

export interface PortfolioWithFunds {
  id: number;
  nom: string;
  allocations: {
    pourcentage: number;
    fund?: Fund; // Optional, will be populated later
  }[];
}
