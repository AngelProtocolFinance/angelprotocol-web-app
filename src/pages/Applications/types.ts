import { EndowmentApplication } from "services/types";

export type TableProps = {
  applications: EndowmentApplication[];
  classes?: string;
  onLoadMore(): void;
  hasMore: boolean;
  disabled: boolean;
  isLoading: boolean;
};
