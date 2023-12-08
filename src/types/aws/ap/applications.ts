import { FileObject } from "../common";
import { RegistrationStatus } from "./registration";

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
  requestor: "endowment" | "bg-admin";
};

type BankingApplicationStatus = "under-review" | "approved" | "rejected";

type BaseBankingApplication = {
  wiseRecipientID: string;
  bankName: string;
  bankAccountNumber: string;
  payoutCurrency: string;
  endowmentId: number;
  bankStatementFile: FileObject;
};

export type NewBankingApplication = BaseBankingApplication;

export type BankingApplication = {
  defaultPriorityNum: number;
  priorityNum: number;
  status: BankingApplicationStatus;
} & BaseBankingApplication;
