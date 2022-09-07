export type Allocation = {
  percentage: number;
  vault: string;
};

export type StrategyFormValues = {
  allocations: Allocation[];
  unallocated: number;
};
