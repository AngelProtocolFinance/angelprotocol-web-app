import { DonationRecord, DonationsQueryParams } from "types/aws";

export type TableProps = {
  donations: DonationRecord[];
  classes?: string;
  onLoadMore(): void;
  hasMore: boolean;
  disabled: boolean;
  isLoading: boolean;
  status: DonationsQueryParams["status"];
};
