import type { FileObject } from "../common";
import type { RegistrationStatus } from "./registration";

export type ApplicationsQueryParams = {
  limit?: number; // Number of items to be returned per request
  start?: number; //to load next page, set start to ItemCutOff + 1
  hqCountry?: string;
  regStatus?: RegistrationStatus;
  regDateStart?: string; //ISO string
  regDateEnd?: string; //ISO string
};

export type BankingApplicationsQueryParams = {
  status?: BankingApplicationStatus;
  endowmentID?: number;
  nextPageKey?: string; //base64 encoded keys
};

export type BankingApplicationStatus = "under-review" | "approved" | "rejected";

type BaseBankingApplication = {
  wiseRecipientID: string;
  endowmentID: number;
  bankSummary: string;
  bankStatementFile: FileObject;
};

export type NewBankingApplication = BaseBankingApplication;

export type BankingApplication = {
  topPriorityNum?: number;
  heirPriorityNum?: number;
  thisPriorityNum: number;
  status: BankingApplicationStatus;
  dateCreated: string; //ISODateString
  rejectionReason: string;
} & BaseBankingApplication;

//alias for endow page
export type PayoutMethod = BankingApplication;

export type BankingApplicationsPage = {
  items: BankingApplication[];
  nextPageKey?: string; //base64 encoded string
};

type Approval = { type: Extract<BankingApplicationStatus, "approved"> };
type Rejection = {
  type: Extract<BankingApplicationStatus, "rejected">;
  reason: string;
};
type Priority = { type: "prioritize" };

export type BankingApplicationUpdate = { uuid: string } & (
  | Approval
  | Rejection
  | Priority
);
