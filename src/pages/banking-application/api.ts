import { type IItem, to_item } from "@better-giving/banking-applications";
import { update } from "@better-giving/banking-applications/schema";
import { type ActionFunction, redirect } from "@vercel/remix";
import { plusInt } from "api/schema/endow-id";
import { parseWithValibot } from "conform-to-valibot";
import * as v from "valibot";
import { cognito, toAuth } from ".server/auth";
import { bank, review_bank } from ".server/banking-applications";

import type { V2RecipientAccount } from "@better-giving/wise";
import type { LoaderFunction } from "@vercel/remix";
import { parse } from "valibot";
import { wise } from ".server/sdks";

export interface LoaderData extends V2RecipientAccount, IItem {}

export const loader: LoaderFunction = async ({ params, request }) => {
  const bankId = parse(plusInt, params.id);
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  if (!user.groups.includes("ap-admin")) return { status: 403 };

  const x = await bank(bankId.toString());
  if (!x) return { status: 404 };

  const y = await wise.v2Account(bankId);
  return { ...to_item(x), ...y } satisfies LoaderData;
};

export const action: ActionFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, { headers });

  if (!user.groups.includes("ap-admin")) return { status: 403 };

  const fv = await request.formData();
  const payload = parseWithValibot(fv, { schema: update });
  if (payload.status !== "success") return payload.reply();

  const bank_id = v.parse(plusInt, params.id);
  const x = await bank(bank_id.toString()).then((x) => x && to_item(x));
  if (!x) return { status: 404, statusText: `Bank:${bank_id} not found` };

  await review_bank(x, payload.value);
  return redirect("../success");
};
