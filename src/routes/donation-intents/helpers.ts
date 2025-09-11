import type { OnHoldDonation } from "@better-giving/donation";
import type { Except } from "type-fest";
import type { DonationIntent } from "types/donation-intent";
import type { Recipient } from ".server/donation-recipient";
import { env } from ".server/env";
type TBase = Except<
  OnHoldDonation.NonKeyAttributes,
  "amount" | "usdValue" | "transactionDate"
>;
export const onhold_base = (
  recipient: Recipient,
  intent: DonationIntent
): TBase => {
  const obj: TBase = {
    tipAmount: intent.amount.tip,
    feeAllowance: intent.amount.fee_allowance,
    appUsed: intent.source,
    chainName: intent.via_name,
    charityName: recipient.name,
    nonProfitMsg: recipient.receiptMsg,
    denomination: intent.amount.currency,
    donationFinalized: false,
    endowmentId: recipient.npo.id,

    donor_message: intent.donor.public_msg,
    msg_to_npo: intent.donor.msg_to_npo,
    donor_public: intent.donor.is_public,

    fund_id: recipient.fund.id,
    fund_name: recipient.name,
    fund_members: recipient.fund.members,

    programId: intent.program?.id,
    programName: intent.program?.name,
    inHonorOf: intent.tribute?.full_name,
    tributeNotif: intent.tribute?.notif && {
      fromMsg: intent.tribute.notif.from_msg,
      toEmail: intent.tribute.notif.to_email,
      toFullName: intent.tribute.notif.to_fullname,
    },
    claimed: recipient.claimed,
    fiscalSponsored: recipient.fiscal_sponsored,
    hideBgTip: recipient.hide_bg_tip,

    network: env,
    splitLiq: "100",
    status: "intent",

    //KYC ATTRIBUTES
    kycEmail: intent.donor.email,
    fullName: `${intent.donor.first_name} ${intent.donor.last_name}`,
    company_name: intent.donor.company_name,
    title: intent.donor?.title || undefined,
    ...intent.donor.address,
    ukGiftAid: intent.donor.address?.uk_gift_aid ?? false,
    allocation: recipient.allocation,
  };
  return obj;
};
