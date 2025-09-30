import type {
  IDonationOnHoldAttr,
  TOnHoldStatus,
} from "@better-giving/donation";
import type { IMetadata, IMetadataAttr } from "@better-giving/stripe";

const to_boolstr = (b: boolean | undefined, fallback: boolean) =>
  (b ?? fallback) ? "true" : "false";

export const to_metadata = (x: IDonationOnHoldAttr): IMetadataAttr => {
  const obj: IMetadataAttr = {
    network: x.network,
    transactionId: x.transactionId,
    transactionDate: x.transactionDate,
    isRecurring: to_boolstr(x.isRecurring, false),
    amount: x.amount.toString(),
    usdValue: x.usdValue.toString(),
    tipAmount: x.tipAmount.toString(),
    denomination: x.denomination,
    feeAllowance: x.feeAllowance?.toString() || "0",
    ...(x.allocation && { allocation: JSON.stringify(x.allocation) }),
    appUsed: x.appUsed,

    /// TO ///
    endowmentId: x.endowmentId.toString(),
    charityName: x.charityName,
    claimed: to_boolstr(x.claimed, false),
    fiscalSponsored: to_boolstr(x.fiscalSponsored, false),
    hideBgTip: to_boolstr(x.hideBgTip, false),
    ...(x.programId && { programId: x.programId }),
    ...(x.programName && { programName: x.programName }),

    /// IF TO IS FUND ///
    ...(x.fund_id && { fund_id: x.fund_id }),
    ...(x.fund_members && { fund_members: x.fund_members.join(",") }),
    ...(x.fund_name && { fund_name: x.fund_name }),

    /// FROM ///
    ...(x.title && { title: x.title }),
    fullName: x.fullName,
    email: x.kycEmail,
    ...(x.msg_to_npo && { msg_to_npo: x.msg_to_npo }),
    ...(x.donor_message && { donor_message: x.donor_message }),
    donor_public: to_boolstr(x.donor_public, false),
    ukGiftAid: to_boolstr(x.ukGiftAid, false),
    ...(x.company_name && { company_name: x.company_name }),
    ...(x.streetAddress && { streetAddress: x.streetAddress }),
    ...(x.city && { city: x.city }),
    ...(x.state && { state: x.state }),
    ...(x.zipCode && { zip: x.zipCode }),
    ...(x.country && { country: x.country }),

    /// TRIBUTE ///
    ...(x.inHonorOf && { inHonorOf: x.inHonorOf }),
    ...(x.tributeNotif && {
      tributeNotif: JSON.stringify(x.tributeNotif),
    }),
  };

  return obj;
};

/**
 *
 * @param method only known at webhook handling
 */

interface Additional {
  payment_method?: string;
  verify_url?: string;
  status: TOnHoldStatus;
}

export const to_onhold = (m: IMetadata, additional: Additional) => {
  const x: IDonationOnHoldAttr = {
    fiatRamp: "STRIPE",
    transactionDate: m.transactionDate,
    transactionId: m.transactionId,
    amount: +m.amount,
    tipAmount: +m.tipAmount,
    chainName: "Fiat",
    usdValue: +m.usdValue,
    appUsed: m.appUsed as any,
    charityName: m.charityName,
    denomination: m.denomination,
    endowmentId: +m.endowmentId,
    donor_message: m.donor_message,
    fund_id: m.fund_id,
    fund_name: m.fund_name,
    fund_members: m.fund_members?.split(",").map(Number),
    programId: m.programId,
    programName: m.programName,
    inHonorOf: m.inHonorOf,
    tributeNotif: m.tributeNotif && JSON.parse(m.tributeNotif),
    claimed: m.claimed === "true",
    fiscalSponsored: m.fiscalSponsored === "true",
    hideBgTip: m.hideBgTip === "true",
    network: m.network as any,
    email: m.email,
    kycEmail: m.email,
    fullName: m.fullName,
    company_name: m.company_name,
    title: m.title,
    ukGiftAid: m.ukGiftAid === "true",
    isRecurring: m.isRecurring === "true",
    chainId: "fiat",
    status: additional.status,
    //additionals
    stripeDepositVerifyUrl: additional?.verify_url,
    paymentMethod: additional?.payment_method,
  };

  if (m.tipAmount) {
    x.tipAmount = +m.tipAmount;
  }
  if (m.feeAllowance) {
    x.feeAllowance = +m.feeAllowance;
  }
  if (m.donor_public) {
    x.donor_public = m.donor_public === "true";
  }

  if (m.msg_to_npo) {
    x.msg_to_npo = m.msg_to_npo;
  }

  if (m.allocation) {
    x.allocation = JSON.parse(m.allocation);
  }

  return x;
};
