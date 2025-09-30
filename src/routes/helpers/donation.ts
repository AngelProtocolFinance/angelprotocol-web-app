import type { IDonationOnHold } from "@better-giving/donation";
import { default_allocation } from "constants/common";
import type {
  Amount,
  Destination,
  FinalRecorderPayload,
  From,
  To,
  Via,
} from "../types/final-recorder";

export interface Settled {
  net: number;
  fee: number;
  in: Destination;
}

export const to_final = (
  onhold: IDonationOnHold,
  settled: Settled
): FinalRecorderPayload => {
  const amount: Amount = {
    total: onhold.amount,
    tip: onhold.tipAmount ?? 0,
    fee_allowance: onhold.feeAllowance ?? 0,
    settled_fee: settled.fee,
    settled_net: settled.net,
    currency: onhold.denomination,
    usd_value: onhold.usdValue,
  };

  const via_name =
    onhold.chainId === "fiat" ? onhold.fiatRamp : onhold.chainName;

  const via: Via = {
    id: onhold.chainId,
    name: via_name || "crypto",
    method:
      onhold.chainId === "fiat" ? (onhold.paymentMethod ?? "crypto") : "crypto",
  };

  const to: To =
    onhold.fund_id && onhold.fund_name && onhold.fund_members
      ? {
          id: onhold.fund_id,
          name: onhold.fund_name,
          members: onhold.fund_members,
          no_tip: false,
          allocation: onhold.allocation || default_allocation,
        }
      : {
          members: [],
          id: onhold.endowmentId.toString(),
          name: onhold.charityName,
          no_tip: onhold.hideBgTip ?? false,
          message: onhold.msg_to_npo,
          allocation: onhold.allocation || default_allocation,
        };

  const from: From = {
    id: onhold.kycEmail,
    name: onhold.fullName ?? "Anonymous",
    is_public: onhold.donor_public ?? false,
    uk_gift_aid: false,
    message: onhold.donor_message,
    company_name: onhold.company_name,
  };

  if (onhold.kycEmail) {
    from.id = onhold.kycEmail;
    from.name = onhold.fullName ?? "Anonymous Person";
    from.uk_gift_aid = onhold.ukGiftAid ?? false;

    if ("country" in onhold) {
      from.address = {
        street: onhold.streetAddress,
        city: onhold.city,
        state: onhold.state,
        zip: onhold.zipCode,
        country: onhold.country,
      };
    }
  }

  const x: FinalRecorderPayload = {
    id: onhold.transactionId,
    amount,
    app_used: onhold.appUsed,
    via,
    to,
    from,
    date: onhold.transactionDate,
    is_recurring: onhold.isRecurring ?? false,
    settled_in: settled.in,
  };

  if (onhold.programId && onhold.programName) {
    x.program = {
      id: onhold.programId,
      name: onhold.programName,
    };
  }
  if (onhold.inHonorOf) {
    x.tribute = { to: onhold.inHonorOf };
    if (onhold.tributeNotif) {
      x.tribute.notif = {
        to_fullname: onhold.tributeNotif.toFullName,
        to_email: onhold.tributeNotif.toEmail,
        from_msg: onhold.tributeNotif.fromMsg,
      };
    }
  }

  return x;
};
