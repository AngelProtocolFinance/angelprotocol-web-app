import { type IItem, to_item } from "@better-giving/banking-applications";
import type { V2RecipientAccount } from "@better-giving/wise";
import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from "@vercel/remix";
import { plusInt } from "api/schema/endow-id";
import type { ActionData } from "types/action";
import * as v from "valibot";
import {
  bank,
  delete_bank,
  npo_bank,
  update_bank,
} from ".server/banking-applications";
import { wise } from ".server/sdks";
import { admin_checks, is_resp } from ".server/utils";

export interface LoaderData extends V2RecipientAccount, IItem {}

export const loader: LoaderFunction = async (args) => {
  const bankId = v.parse(plusInt, args.params.bankId);
  const admn = await admin_checks(args);
  if (is_resp(admn)) return admn;

  const x = await npo_bank(admn.id, bankId.toString());
  if (!x) return { status: 404 };

  const y = await wise.v2Account(bankId);
  return { ...x, ...y } satisfies LoaderData;
};

export const deleteAction: ActionFunction = async (x) => {
  const bank_id = v.parse(plusInt, x.params.bankId);
  const admn = await admin_checks(x);
  if (is_resp(admn)) return admn;

  await delete_bank(bank_id.toString());
  return redirect("../..");
};

export const prioritizeAction: ActionFunction = async (args) => {
  const bank_id = v.parse(plusInt, args.params.bankId);
  const admn = await admin_checks(args);
  if (is_resp(admn)) return admn;

  const x = await bank(bank_id.toString()).then((x) => x && to_item(x));
  if (!x) return { status: 404, statusText: `Bank:${bank_id} not found` };

  await update_bank(x, { type: "prioritize" });
  return { __ok: "Payout method prioritized" } satisfies ActionData;
};
