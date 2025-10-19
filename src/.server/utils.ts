import { $int_gte1 } from "@better-giving/endowment/schema";
import { resp } from "helpers/https";
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

  r.body;
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
  to_name: string;
  to_id: string;
  to_type: "fund" | "npo";
  status: "onhold" | "settled";
  /** email */
  from: string;
}
export const donation_get = async (
  id: string
): Promise<IRetrievedDonation | null> => {
  const [onhold, settled] = await Promise.all([
    onholddb.item(id),
    dondb.item(id),
  ]);

  if (onhold) {
    return {
      id: onhold.transactionId,
      to_name: onhold.fund_name || onhold.charityName,
      to_id: onhold.fund_id || onhold.endowmentId.toString(),
      to_type: onhold.fund_id ? "fund" : "npo",
      status: "onhold",
      from: onhold.kycEmail,
    };
  }
  if (settled) {
    return {
      id: settled.transactionId,
      to_name: settled.fund_name || settled.charityName || "",
      to_id: settled.fund_id || settled.endowmentId?.toString() || "",
      to_type: settled.fund_id ? "fund" : "npo",
      status: "settled",
      from: settled.email || "",
    };
  }
  return null;
};
