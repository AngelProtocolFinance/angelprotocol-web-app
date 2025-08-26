import { type IItem, to_item } from "@better-giving/banking-applications";
import type { V2RecipientAccount } from "@better-giving/wise";
import { plusInt } from "api/schema/endow-id";
import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from "react-router";
import type { ActionData } from "types/action";
import * as v from "valibot";
import { cognito, toAuth } from ".server/auth";
import {
  bank,
  delete_bank,
  npo_bank,
  update_bank,
} from ".server/banking-applications";
import { wise } from ".server/sdks";

export interface LoaderData extends V2RecipientAccount, IItem {}

export const loader: LoaderFunction = async ({ params, request }) => {
  const id = v.parse(plusInt, params.id);
  const bankId = v.parse(plusInt, params.bankId);
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const x = await npo_bank(id, bankId.toString());
  if (!x) return { status: 404 };

  const y = await wise.v2Account(bankId);
  return { ...x, ...y } satisfies LoaderData;
};

export const deleteAction: ActionFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const bank_id = v.parse(plusInt, params.bankId);

  await delete_bank(bank_id.toString());
  return redirect("../..");
};

export const prioritizeAction: ActionFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);
  const bank_id = v.parse(plusInt, params.bankId);
  const x = await bank(bank_id.toString()).then((x) => x && to_item(x));
  if (!x) return { status: 404, statusText: `Bank:${bank_id} not found` };

  await update_bank(x, { type: "prioritize" });
  return { __ok: "Payout method prioritized" } satisfies ActionData;
};
