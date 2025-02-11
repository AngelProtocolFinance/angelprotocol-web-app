import type { BalanceTx } from "types/aws";

export interface TableProps {
  records: BalanceTx[];
  classes?: string;
  onLoadMore?(): void;
  disabled: boolean;
  isLoading: boolean;
}
