import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from "@vercel/remix";
import { bankUpdate } from "api/action/bank-update";
import { ap, ver } from "api/api";
import { getPayoutMethod } from "api/get/payout-method";
import { plusInt } from "api/schema/endow-id";
import { cognito, redirectToAuth } from "auth";
import type { ActionData } from "types/action";
import * as v from "valibot";

export const payoutMethodLoader: LoaderFunction = async ({
  params,
  request,
}) => {
  const id = v.parse(plusInt, params.id);
  const bankId = v.parse(plusInt, params.bankId);
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return redirectToAuth(request, headers);

  return getPayoutMethod(bankId, id, user.idToken);
};

export const deleteAction: ActionFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return redirectToAuth(request, headers);

  await ap.delete(`${ver(1)}/banking-applications/${params.bankId}`, {
    headers: { authorization: user.idToken },
  });
  return redirect("../..");
};

export const prioritizeAction: ActionFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return redirectToAuth(request, headers);
  const bankId = v.parse(plusInt, params.bankId);
  await bankUpdate(bankId, { type: "prioritize" }, user.idToken);
  return { __ok: "Payout method prioritized" } satisfies ActionData;
};
