import { update } from "@better-giving/banking-applications/schema";
import { parseWithValibot } from "conform-to-valibot";
import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from "react-router";
import * as v from "valibot";
import { cognito, toAuth } from ".server/auth";

import type { IBapp } from "@better-giving/banking-applications";
import { $int_gte1 } from "@better-giving/schemas";
import type { V2RecipientAccount } from "@better-giving/wise";
import { parse } from "valibot";
import { bappdb } from ".server/aws/db";
import { wise } from ".server/sdks";

export interface LoaderData extends V2RecipientAccount {
  ba: IBapp;
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const bankId = parse($int_gte1, params.id);
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  if (!user.groups.includes("ap-admin")) return { status: 403 };

  const x = await bappdb.bapp(bankId.toString());
  if (!x) return { status: 404 };

  const y = await wise.v2_account(bankId);
  return { ba: x, ...y } satisfies LoaderData;
};

export const action: ActionFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  if (!user.groups.includes("ap-admin")) return { status: 403 };

  const fv = await request.formData();
  const payload = parseWithValibot(fv, { schema: update });
  if (payload.status !== "success") return payload.reply();

  const bank_id = v.parse($int_gte1, params.id);
  const x = await bappdb.bapp(bank_id.toString());
  if (!x) return { status: 404, statusText: `Bank:${bank_id} not found` };

  await bappdb.bapp_update(x, payload.value);
  return redirect("../success");
};
