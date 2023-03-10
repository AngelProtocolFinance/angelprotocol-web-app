import { WithdrawLog } from "types/aws";

export type TableProps = {
  withdraws: WithdrawLog[];
  classes?: string;
  onLoadMore(): void;
  hasMore: boolean;
  isLoading: boolean;
};
