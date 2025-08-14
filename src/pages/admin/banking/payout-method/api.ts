import type { IBapp } from "@better-giving/banking-applications";
import { $int_gte1 } from "@better-giving/schemas";
import type { V2RecipientAccount } from "@better-giving/wise";
import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from "@vercel/remix";
import type { ActionData } from "types/action";
import * as v from "valibot";
import { bappdb } from ".server/aws/db";
import { wise } from ".server/sdks";
import { admin_checks, is_resp } from ".server/utils";

export interface LoaderData extends V2RecipientAccount {
  ba: IBapp;
}

export const loader: LoaderFunction = async (args) => {
  const bankId = v.parse($int_gte1, args.params.bankId);
  const admn = await admin_checks(args);
  if (is_resp(admn)) return admn;

  const x = await bappdb.npo_bapp(bankId.toString(), admn.id);
  if (!x) return { status: 404 };

  const y = await wise.v2Account(bankId);
  return { ...y, ba: x } satisfies LoaderData;
};

export const deleteAction: ActionFunction = async (x) => {
  const bank_id = v.parse($int_gte1, x.params.bankId);
  const admn = await admin_checks(x);
  if (is_resp(admn)) return admn;

  await bappdb.bapp_delete(bank_id.toString());
  return redirect("../..");
};

export const prioritizeAction: ActionFunction = async (args) => {
  const bank_id = v.parse($int_gte1, args.params.bankId);
  const admn = await admin_checks(args);
  if (is_resp(admn)) return admn;

  const x = await bappdb.bapp(bank_id.toString());
  if (!x) return { status: 404, statusText: `Bank:${bank_id} not found` };

  await bappdb.bapp_update(x, { type: "prioritize" });
  return { __ok: "Payout method prioritized" } satisfies ActionData;
};
