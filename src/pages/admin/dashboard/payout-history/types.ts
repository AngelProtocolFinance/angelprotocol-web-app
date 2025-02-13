import type { BalanceTx } from "types/balance-tx";

export interface TableProps {
  records: BalanceTx[];
  classes?: string;
  onLoadMore?(): void;
  disabled: boolean;
  isLoading: boolean;
}
