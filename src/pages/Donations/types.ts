import { DonationMadeByDonor, DonationsQueryParams } from "types/aws";

export type TableProps = {
  donations: DonationMadeByDonor[];
  classes?: string;
  onLoadMore(): void;
  hasMore: boolean;
  disabled: boolean;
  isLoading: boolean;
  status: DonationsQueryParams["status"];
};
