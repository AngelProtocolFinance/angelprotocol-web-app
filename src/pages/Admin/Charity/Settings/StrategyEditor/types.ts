import { AccountType } from "types/contracts";

export type Props = { type: AccountType };

export type Allocation = {
  percentage: number;
  vault: string;
};

export type FormValues = {
  allocations: Allocation[];
  unallocated: number;
};
