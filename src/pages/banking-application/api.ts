import { update } from "@better-giving/banking-applications/schema";
import {
  type ActionFunction,
  type LoaderFunctionArgs,
  redirect,
} from "react-router";
import * as v from "valibot";
import { cognito, toAuth } from ".server/auth";

import type { IBapp, IUpdate } from "@better-giving/banking-applications";
import { $int_gte1 } from "@better-giving/schemas";
import type { V2RecipientAccount } from "@better-giving/wise";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { resp } from "helpers/https";
import { getValidatedFormData } from "remix-hook-form";
import { parse } from "valibot";
import { bappdb } from ".server/aws/db";
import { wise } from ".server/sdks";

export interface LoaderData extends V2RecipientAccount {
  ba: IBapp;
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const bankId = parse($int_gte1, params.id);
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  if (!user.groups.includes("ap-admin")) throw resp.status(403);

  const x = await bappdb.bapp(bankId.toString());
  if (!x) throw resp.status(404);

  const y = await wise.v2_account(bankId);
  return { ba: x, ...y } satisfies LoaderData;
};

export const action: ActionFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  if (!user.groups.includes("ap-admin")) return { status: 403 };

  const fv = await getValidatedFormData<IUpdate>(
    request,
    valibotResolver(update)
  );
  if (fv.errors) return fv;

  const bank_id = v.parse($int_gte1, params.id);
  const x = await bappdb.bapp(bank_id.toString());
  if (!x) return { status: 404, statusText: `Bank:${bank_id} not found` };

  await bappdb.bapp_update(x, fv.data);
  return redirect("../success");
};
