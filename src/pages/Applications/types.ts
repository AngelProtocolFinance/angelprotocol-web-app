import { DonationMadeByDonor } from "types/aws";

export type TableProps = {
  donations: DonationMadeByDonor[];
  classes?: string;
  onLoadMore(): void;
  hasMore: boolean;
  disabled: boolean;
  isLoading: boolean;
};
