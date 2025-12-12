import type { ITributeNotif, TDonationSource } from "@better-giving/donation";
import { $int_gte1 } from "@better-giving/endowment/schema";
import { resp } from "helpers/https";
import type { Tribute } from "lib/donations";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  Params,
} from "react-router";
import type { UserV2 } from "types/auth";
import { parse } from "valibot";
import { dondb, onholddb } from "./aws/db";
import { qstash_receiver } from "./sdks";
import { cognito, to_auth } from ".server/auth";

interface IChecked extends UserV2 {
  req: Request;
  params: Params<string>;
  id: number;
}

export const admin_checks = async ({
  request,
  params,
}: LoaderFunctionArgs | ActionFunctionArgs): Promise<Response | IChecked> => {
  const id = parse($int_gte1, params.id);
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);
  if (!user.groups.includes("ap-admin") && !user.endowments.includes(id)) {
    return resp.status(403);
  }
  return { ...user, id, req: request, params };
};

export const is_resp = (x: any): x is Response => x instanceof Response;

export const qstash_body = async (
  request: Request
): Promise<string | Response> => {
  const r = request.clone();

  const sig = r.headers.get("upstash-signature");
  if (!sig) return resp.status(205, "no signature");

  const body = await r.text();

  const url = new URL(r.url).toString();
  const is_valid = await qstash_receiver.verify({
    signature: sig,
    body,
    url,
  });

  if (!is_valid) return resp.status(205, "invalid signature");
  return body;
};

export interface IRetrievedDonation {
  id: string;
  /** iso */
  date: string;
  to_name: string;
  to_id: string;
  to_type: "fund" | "npo";
  status: "onhold" | "settled";
  /** email */
  from: string;
  from_name: string;
  tribute?: Tribute;
  private_msg_to_npo?: string;
  public_msg?: string;
  amount: number;
  amount_usd: number;
  denom: string;
  source: TDonationSource;
  form_id: string | undefined;
}

const tribute_to_fv = (
  honoree?: string,
  notif?: ITributeNotif
): Tribute | undefined => {
  if (!honoree) return undefined;

  const tribute: Tribute = {
    full_name: honoree,
  };

  if (notif) {
    tribute.notif = {
      to_fullname: notif.toFullName,
      to_email: notif.toEmail,
      from_msg: notif.fromMsg,
    };
  }
  return tribute;
};

export const tribute_to_db = (
  t: Tribute
): { inHonorOf?: string; tributeNotif?: ITributeNotif } => {
  const result: { inHonorOf?: string; tributeNotif?: ITributeNotif } = {
    inHonorOf: t.full_name,
  };

  if (t.notif) {
    result.tributeNotif = {
      toEmail: t.notif.to_email,
      toFullName: t.notif.to_fullname,
      fromMsg: t.notif.from_msg,
    };
  }

  return result;
};

export const donation_get = async (
  id: string
): Promise<IRetrievedDonation | null> => {
  const [onhold, settled] = await Promise.all([
    onholddb.item(id),
    dondb.item(id),
  ]);

  const y = onhold || settled;

  if (!y) return null;

  const x: IRetrievedDonation = {
    id: y.transactionId,
    date: y.transactionDate || new Date().toISOString(),
    to_name: y.fund_name || y.charityName || "a nonprofit",
    to_id: y.fund_id || y.endowmentId?.toString() || "a fundraiser",
    to_type: y.fund_id ? "fund" : "npo",
    status: onhold ? "onhold" : "settled",
    from: y.kycEmail || y.email || "",
    from_name: y.fullName || "Anonymous",
    amount: y.amount || 0,
    denom: y.denomination || "USD",
    amount_usd: y.usdValue || 0,
    source: y.appUsed === "bg-widget" ? "bg-widget" : "bg-marketplace",
    form_id: y.form_id,
  };
  const t = tribute_to_fv(y.inHonorOf, y.tributeNotif);
  if (t) x.tribute = t;
  if (y.msg_to_npo) x.private_msg_to_npo = y.msg_to_npo;
  if (y.donor_message) x.public_msg = y.donor_message;

  return x;
};
