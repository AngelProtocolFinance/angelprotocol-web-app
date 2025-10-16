import { $int_gte1 } from "@better-giving/endowment/schema";
import { resp } from "helpers/https";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  Params,
} from "react-router";
import type { UserV2 } from "types/auth";
import { parse } from "valibot";
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
