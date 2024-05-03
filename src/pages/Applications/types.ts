import type { Application } from "types/aws";

export type TableProps = {
  applications: Application[];
  classes?: string;
  onLoadMore(): void;
  hasMore: boolean;
  disabled: boolean;
  isLoading: boolean;
};
