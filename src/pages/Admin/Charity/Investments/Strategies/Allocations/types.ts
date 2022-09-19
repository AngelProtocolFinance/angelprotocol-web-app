export type Allocation = {
  percentage: number;
  vault: string;
  new?: boolean;
};

export type StrategyFormValues = {
  allocations: Allocation[];
  unallocated: number;
};
