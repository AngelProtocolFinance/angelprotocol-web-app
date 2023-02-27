import { Donation } from "types/aws";

export type TableProps = {
  donations: Donation[];
  classes?: string;
  onLoadMore(): void;
  hasMore: boolean;
  disabled: boolean;
  isLoading: boolean;
};
