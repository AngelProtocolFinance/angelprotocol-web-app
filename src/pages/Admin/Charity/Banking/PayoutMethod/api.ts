import { bankUpdate } from "api/action/bank-update";
import { ap, ver } from "api/api";
import { getPayoutMethod } from "api/get/payout-method";
import { plusInt } from "api/schema/endow-id";
import { redirectToAuth } from "auth";
import { loadAuth } from "auth/load-auth";
import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from "react-router";
import type { ActionData } from "types/action";
import * as v from "valibot";

export const payoutMethodLoader: LoaderFunction = async ({
  params,
  request,
}) => {
  const id = v.parse(plusInt, params.id);
  const bankId = v.parse(plusInt, params.bankId);
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  return getPayoutMethod(bankId, id, auth.idToken);
};

export const deleteAction: ActionFunction = async ({ params, request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  await ap.delete(`${ver(1)}/banking-applications/${params.bankId}`, {
    headers: { authorization: auth.idToken },
  });
  return redirect("../..");
};

export const prioritizeAction: ActionFunction = async ({ params, request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);
  const bankId = v.parse(plusInt, params.bankId);
  await bankUpdate(bankId, { type: "prioritize" }, auth.idToken);
  return { __ok: "Payout method prioritized" } satisfies ActionData;
};
