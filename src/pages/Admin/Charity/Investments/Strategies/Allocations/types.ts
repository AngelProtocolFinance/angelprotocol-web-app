import { AccountType } from "types/contracts";

export type AllocationsProps = {
  type: AccountType;
  readonly?: true;
  classes?: string;
};

export type FormProps = AllocationsProps;

export type Allocation = {
  percentage: number;
  vault: string;
};

export type StrategyFormValues = {
  allocations: Allocation[];
  unallocated: number;

  //meta
  isReadOnly: boolean;
  initialAllocations: Allocation[];
};
