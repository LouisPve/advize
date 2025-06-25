import { FundType } from "../funds/types";

export interface Product {
  id: number;
  nom: string;
  configuration: {
    [K in FundType]: { min: number; max: number };
  };
}
