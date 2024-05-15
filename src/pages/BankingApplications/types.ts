import type { BankingApplication } from "types/aws";

export type TableProps = {
  applications: BankingApplication[];
  classes?: string;
  onLoadMore(): void;
  hasMore: boolean;
  disabled: boolean;
  isLoading: boolean;
};
