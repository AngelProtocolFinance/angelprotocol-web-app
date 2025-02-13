import type { Donation } from "types/donations";

export type TableProps = {
  donations: Donation.Record[];
  classes?: string;
  onLoadMore(): void;
  hasMore: boolean;
  disabled: boolean;
  isLoading: boolean;
  status: Donation.Status;
};
