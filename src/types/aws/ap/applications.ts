import * as v from "valibot";
import type { FileObject } from "../common";

const bankApplicationStatuses = [
  "under-review",
  "approved",
  "rejected",
] as const;

export type BankingApplicationStatus = (typeof bankApplicationStatuses)[number];
export const bankingApplicationStatus = v.picklist(bankApplicationStatuses);

export type BankingApplicationsQueryParams = {
  status?: BankingApplicationStatus;
  endowmentID?: number;
  nextPageKey?: string; //base64 encoded keys
};

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

export const bankingApplicationUpdate = v.pipe(
  v.object({
    type: v.picklist([
      bankApplicationStatuses[1],
      bankApplicationStatuses[2],
      "prioritize",
    ]),
    reason: v.optional(v.string()),
  }),
  v.forward(
    v.partialCheck(
      [["type"], ["reason"]],
      (input) => (input.type === "rejected" ? !!input.reason : true),
      "required"
    ),
    ["reason"]
  )
);

export type BankingApplicationUpdate = v.InferOutput<
  typeof bankingApplicationUpdate
>;
