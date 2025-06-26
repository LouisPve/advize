export interface Fund {
  id: number;
  isin: string;
  name: string;
  type: FundType;
}

export enum FundType {
  ACTION = "action",
  OBLIGATION = "obligation",
  MONETAIRE = "monetaire",
}
