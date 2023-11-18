import { Application } from "types/aws";

export type TableProps = {
  donations: Application[];
  classes?: string;
  onLoadMore(): void;
  hasMore: boolean;
  disabled: boolean;
  isLoading: boolean;
};
