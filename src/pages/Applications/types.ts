import type { ApplicationItem } from "@better-giving/registration/approval";

export type TableProps = {
  applications: ApplicationItem[];
  classes?: string;
  loadMore(key: string): void;
  nextPageKey?: string;
  disabled: boolean;
  isLoading: boolean;
};
