import { FundType } from "../funds/types";

export interface Product {
  id: number;
  name: string;
  configuration: {
    [K in FundType]: { min: number; max: number };
  };
}
