import type { IDonationOnHoldAttr } from "@better-giving/donation";
import type { IDonationIntent } from "lib/donations";
import type { Except } from "type-fest";
import type { Recipient } from ".server/donation-recipient";
import { env } from ".server/env";
type TBase = Except<
  IDonationOnHoldAttr,
  | "transactionDate"
  | "transactionId"
  | "amount"
  | "usdValue"
  | "expireAt"
  | "chainId"
  | "fiatRamp"
>;
export const onhold_base = (
  recipient: Recipient,
  intent: IDonationIntent
): TBase => {
  const obj: TBase = {
    network: env,
    tipAmount: intent.amount.tip,
    feeAllowance: intent.amount.fee_allowance,
    allocation: recipient.allocation,
    denomination: intent.amount.currency,
    isRecurring: intent.frequency === "recurring",

    //FROM
    kycEmail: intent.donor.email,
    title: intent.donor?.title || undefined,
    fullName: `${intent.donor.first_name} ${intent.donor.last_name}`,
    streetAddress: intent.donor.address?.street,
    city: intent.donor.address?.city,
    state: intent.donor.address?.state,
    country: intent.donor.address?.country,
    zipCode: intent.donor.address?.zip_code,
    company_name: intent.donor.company_name,
    // donor_message: intent.donor.public_msg, //edited post donation
    donor_public: true,
    // msg_to_npo: intent.donor.msg_to_npo, //edited post donation
    ukGiftAid: intent.donor.address?.uk_gift_aid ?? false,

    //TO
    chainName: intent.via_name,
    charityName: recipient.name,
    nonProfitMsg: recipient.receiptMsg,
    endowmentId: recipient.npo.id,
    programId: intent.program?.id,
    programName: intent.program?.name,
    claimed: recipient.claimed,
    fiscalSponsored: recipient.fiscal_sponsored,
    hideBgTip: recipient.hide_bg_tip,
    fund_id: recipient.fund.id,
    fund_name: recipient.name,
    fund_members: recipient.fund.members,

    //VIA
    appUsed: intent.source,

    /// TRIBUTE ///
    inHonorOf: intent.tribute?.full_name,
    tributeNotif: intent.tribute?.notif && {
      fromMsg: intent.tribute.notif.from_msg,
      toEmail: intent.tribute.notif.to_email,
      toFullName: intent.tribute.notif.to_fullname,
    },
    form_id: intent.source_id,

    status: "intent",
  };
  return obj;
};
