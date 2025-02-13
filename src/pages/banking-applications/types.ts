import type { BankingApplication } from "types/applications";

export type TableProps = {
  applications: BankingApplication[];
  classes?: string;
  onLoadMore(key: string): void;
  nextPageKey?: string;
  disabled: boolean;
  isLoading: boolean;
};
