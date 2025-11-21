import type {
  IDonationOnHoldAttr,
  TOnHoldStatus,
} from "@better-giving/donation";
import type { IMetadata, IMetadataAttr } from "lib/stripe";

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
    // Transaction details
    transactionDate: m.transactionDate,
    transactionId: m.transactionId,
    status: additional.status,
    network: m.network,

    // Amount details
    amount: +m.amount,
    ...(m.feeAllowance && { feeAllowance: +m.feeAllowance }),
    tipAmount: +m.tipAmount,
    usdValue: +m.usdValue,
    ...(m.allocation && { allocation: JSON.parse(m.allocation) }),
    denomination: m.denomination,
    isRecurring: m.isRecurring === "true",

    // FROM - Donor details
    ...(m.title && { title: m.title as any }),
    fullName: m.fullName,
    ...(m.company_name && { company_name: m.company_name }),
    ...(m.donor_message && { donor_message: m.donor_message }),
    ...(m.donor_public && { donor_public: m.donor_public === "true" }),
    kycEmail: m.email,
    ...(m.msg_to_npo && { msg_to_npo: m.msg_to_npo }),
    ukGiftAid: m.ukGiftAid === "true",
    ...(m.streetAddress && { streetAddress: m.streetAddress }),
    ...(m.city && { city: m.city }),
    ...(m.state && { state: m.state }),
    ...(m.country && { country: m.country }),
    ...(m.zipCode && { zipCode: m.zipCode }),

    // TO - Recipient details
    endowmentId: +m.endowmentId,
    charityName: m.charityName,
    claimed: m.claimed === "true",
    fiscalSponsored: m.fiscalSponsored === "true",
    ...(m.fund_id && { fund_id: m.fund_id }),
    ...(m.fund_members && {
      fund_members: m.fund_members.split(",").map(Number),
    }),
    ...(m.fund_name && { fund_name: m.fund_name }),
    hideBgTip: m.hideBgTip === "true",
    ...(m.programId && { programId: m.programId }),
    ...(m.programName && { programName: m.programName }),

    // VIA - Payment details
    appUsed: m.appUsed as any,
    chainId: "fiat",
    chainName: "Fiat",
    fiatRamp: "STRIPE",
    ...(additional?.payment_method && {
      paymentMethod: additional.payment_method,
    }),
    ...(additional?.verify_url && {
      stripeDepositVerifyUrl: additional.verify_url,
    }),

    // TRIBUTE
    ...(m.inHonorOf && { inHonorOf: m.inHonorOf }),
    ...(m.tributeNotif && { tributeNotif: JSON.parse(m.tributeNotif) }),
  };

  return x;
};
