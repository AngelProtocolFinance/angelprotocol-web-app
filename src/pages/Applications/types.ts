import type { ApplicationItem } from "@better-giving/registration/approval";

export type TableProps = {
  applications: ApplicationItem[];
  classes?: string;
  onLoadMore(): void;
  hasMore: boolean;
  disabled: boolean;
  isLoading: boolean;
};
