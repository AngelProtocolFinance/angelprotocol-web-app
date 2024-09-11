import type { BalanceTx } from "types/aws";

export interface TableProps {
  records: BalanceTx[];
  classes?: string;
  onLoadMore(): void;
  hasMore: boolean;
  disabled: boolean;
  isLoading: boolean;
}
