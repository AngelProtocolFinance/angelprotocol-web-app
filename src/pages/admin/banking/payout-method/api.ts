import { $int_gte1 } from "@better-giving/schemas";
import { resp } from "helpers/https";
import { redirect } from "react-router";
import type { ActionData } from "types/action";
import * as v from "valibot";
import type { Route } from "./+types/payout-method";
import { bappdb } from ".server/aws/db";
import { wise } from ".server/sdks";
import { admin_checks, is_resp } from ".server/utils";

export const loader = async (args: Route.LoaderArgs) => {
  const bankId = v.parse($int_gte1, args.params.bankId);
  const admn = await admin_checks(args);
  if (is_resp(admn)) return admn;

  const x = await bappdb.npo_bapp(bankId.toString(), admn.id);
  if (!x) return resp.status(404);

  const y = await wise.v2_account(bankId);
  return { ...y, ba: x };
};

export const delete_action = async (x: Route.ActionArgs) => {
  const bank_id = v.parse($int_gte1, x.params.bankId);
  const admn = await admin_checks(x);
  if (is_resp(admn)) return admn;

  await bappdb.bapp_delete(bank_id.toString());
  return redirect("../..");
};

export const prioritize_action = async (args: Route.ActionArgs) => {
  const bank_id = v.parse($int_gte1, args.params.bankId);
  const admn = await admin_checks(args);
  if (is_resp(admn)) return admn;

  const x = await bappdb.bapp(bank_id.toString());
  if (!x) return { status: 404, statusText: `Bank:${bank_id} not found` };

  await bappdb.bapp_update(x, { type: "prioritize" });
  return { __ok: "Payout method prioritized" } satisfies ActionData;
};
