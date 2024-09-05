import type { Payout } from "types/aws";

export interface TableProps {
  records: Payout[];
  classes?: string;
  onLoadMore(): void;
  hasMore: boolean;
  disabled: boolean;
  isLoading: boolean;
}
