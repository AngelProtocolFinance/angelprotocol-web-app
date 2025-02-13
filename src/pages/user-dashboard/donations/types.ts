import type { Donation } from "types/donations";

export type TableProps = {
  donations: Donation.Item[];
  classes?: string;
  onLoadMore(): void;
  hasMore: boolean;
  disabled: boolean;
  isLoading: boolean;
  status: Donation.Status;
};
