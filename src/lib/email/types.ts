import type { Environment } from "@better-giving/schemas";

export type BankingApplicationsTemplate = {
  accountSummary: string;
} & (
  | {
      name:
        | "banking-applications-approval"
        | "banking-applications-default"
        | "banking-applications-new";
    }
  | {
      name: "banking-applications-rejection";
      rejectionReason: string;
    }
);
export type RegistrationTemplate = {
  env: Environment;
} & (
  | {
      name: "registration-new";
      referenceID: string;
    }
  | {
      name: "registration-approved";
      orgName: string;
      registrantFirstName: string;
      endowID: string;
    }
  | {
      name: "registration-rejected";
      registrantFirstName: string;
      rejectionReason: string;
    }
);
export type NewEndowAdminTemplate = {
  name: "new-endow-admin";
  firstName: string;
  endowName: string;
  invitor: string;
};
export type FundOptOutTemplate = {
  name: "fund-opt-out-notif";

  firstName: string;
  endowName: string;
};

export type Tx = {
  transactionID: string;
  transactionDate: string;
  /**@example "3.14 GBP" */
  prettyAmount: string;
  /**
   * won't show if falsy
   * @example "3.14" | "" | undefined */
  prettyUSDamount: string | undefined;
  nonprofitName: string;
  programName?: string;
  isBg?: boolean;
  isRecurring?: boolean;
};
type Donor = {
  firstName: string;
  fullName: string;
  address?: string;
  title?: string;
};
type ReceiptData = Tx & {
  donor: Donor;
  /** For chariot donations, remove mention of receipts when set to `undefined`.  */
  taxReceiptId: string | undefined;
  nonProfitMsg?: string;
};
type NonprofitNotifData = Tx & {
  donor?: Donor;
  claimed?: boolean;
  nonprofitID: string;
  msg_to_npo?: string;
};
type DonorNotifData = {
  donorFirstName: string;
  nonprofitName: string;
  programName?: string;
  transactionID: string;
  isGuest?: boolean;
  isRecurring?: boolean;
};
type TributeNotifData = Pick<Tx, "prettyAmount" | "nonprofitName"> & {
  inHonorOf: string;
  toFullName: string;
  donor: Donor;
  fromMsg?: string;
};

export interface DonorPrivateMsgData
  extends Pick<
    Tx,
    | "prettyAmount"
    | "nonprofitName"
    | "prettyUSDamount"
    | "transactionDate"
    | "transactionID"
  > {
  nonprofitName: string;
  nonprofitID: string;
  sender: Pick<Donor, "firstName" | "fullName">;
  message: string;
}

export interface IDonorPrivateMsgEmail extends DonorPrivateMsgData {
  name: "npo-private-message";
}

type MicrodepositActionData = {
  donorFirstName: string;
  recipientName: string;
  verificationLink: string;
};
type ErrorData = {
  donorFirstName: string;
  recipientName: string;
  errorMessage: string;
};
export type DonationTemplate =
  | ({
      name: "donation-nonprofit-notif";
    } & NonprofitNotifData)
  | ({
      name: "donation-donor-notif";
    } & DonorNotifData)
  | ({
      name: "donation-receipt";
    } & ReceiptData)
  | ({
      name: "donation-tribute-notif";
    } & TributeNotifData)
  | ({
      name: "donation-microdeposit-action";
    } & MicrodepositActionData)
  | ({
      name: "donation-error";
    } & ErrorData);

export type Template =
  | BankingApplicationsTemplate
  | RegistrationTemplate
  | NewEndowAdminTemplate
  | FundOptOutTemplate
  | DonationTemplate
  | IDonorPrivateMsgEmail;
