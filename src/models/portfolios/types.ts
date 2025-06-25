export interface Portfolio {
  id: number;
  nom: string;
  allocations: Allocation[];
}

export interface Allocation {
  fondId: number;
  pourcentage: number;
}
