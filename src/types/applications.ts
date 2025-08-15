import type { TStatus } from "@better-giving/banking-applications";

export type BankingApplicationsQueryParams = {
  status?: TStatus;
  endowmentID?: number;
  nextPageKey?: string; //base64 encoded keys
};
