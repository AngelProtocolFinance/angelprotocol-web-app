import type { Donation } from "@better-giving/emails";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { to_pretty_utc } from "helpers/date";
import { humanize, rd } from "helpers/decimal";
import { resp } from "helpers/https";
import { send_email } from "lib/email";
import { redirect } from "react-router";
import { getValidatedFormData } from "remix-hook-form";
import type { Route } from "./+types";
import { type FV, schema } from "./schema";
import { cognito, to_auth } from ".server/auth";
import { dondb } from ".server/aws/db";
import { bg_npo_id } from ".server/env";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);

  const don = await dondb.item(params.id);
  if (!don) return resp.status(404);

  //user can only access their own donation
  if (don.email?.toLowerCase() !== user.email.toLowerCase()) {
    return resp.status(403);
  }

  return user;
};

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);

  const fv = await getValidatedFormData<FV>(request, valibotResolver(schema));
  if (fv.errors) return fv;

  const don = await dondb.item(params.id);
  if (!don) return resp.status(404);

  //user can only access their own donation
  if (don.email?.toLowerCase() !== user.email.toLowerCase()) {
    return resp.status(403);
  }

  const addr = [
    fv.data.address.street,
    fv.data.address.complement,
    fv.data.city,
    fv.data.state,
    fv.data.us_state,
    fv.data.country,
    fv.data.postal_code,
  ]
    .filter(Boolean)
    .join(", ");

  const donor: Donation.Data.TDonor = {
    fullName: `${fv.data.name.first} ${fv.data.name.last}`,
    firstName: fv.data.name.first,
    address: addr,
  };

  if (!don.transactionDate) throw "missing transactionDate";
  if (!don.charityName) throw "missing charityName";
  if (!don.denomination) throw "missing denomination";
  if (!don.amount) throw "missing amount";
  if (don.usdValue == null) throw "missing usdValue";

  const tx: Donation.Data.TTx = {
    transactionID: don.transactionId,
    transactionDate: to_pretty_utc(don.transactionDate),
    nonprofitName: don.charityName,
    programName: don.programName,
    prettyAmount: `${humanize(rd(don.amount, don.fiatRamp ? 2 : 4))} ${don.denomination}`,
    prettyUSDamount: don.denomination === "USD" ? "" : humanize(don.usdValue),
    isBg: don.endowmentId === bg_npo_id ? true : undefined,
    isRecurring: don.isRecurring || undefined,
  };
  //but can send receipt to other email
  const data: Donation.Data.TReceipt = {
    ...tx,
    donor: donor,
    // !taxReceiptId -> means no mention of receipt
    // for chariot donation, we don't issue tax receipt
    taxReceiptId: don.fiatRamp !== "CHARIOT" ? don.transactionId : undefined,
  };

  const res = await send_email({ name: "donation-receipt", ...data }, [
    fv.data.email,
  ]);
  console.info(res);

  return redirect("..");
};
