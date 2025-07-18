import type { IPayout } from "@better-giving/payouts/interfaces";

export interface TableProps {
  records: IPayout[];
  classes?: string;
  onLoadMore?(): void;
  disabled: boolean;
  isLoading: boolean;
}
