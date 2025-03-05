import type { SingleFund } from "@better-giving/fundraiser";
import { fundId, fundUpdate } from "@better-giving/fundraiser/schema";
import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from "@vercel/remix";
import { appRoutes } from "constants/routes";
import type { ActionData } from "types/action";
import type { UserV2 } from "types/auth";
import { parse } from "valibot";
import { cognito, toAuth } from ".server/auth";
import { closeFund, editFund, getFund } from ".server/fund";

export interface LoaderData {
  fund: SingleFund;
  origin: string;
  user: UserV2;
}
export const loader: LoaderFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const fund = await getFund(`${params.fundId}`);
  if (!fund) return redirect(appRoutes.funds);

  const origin = new URL(request.url).origin;

  return { fund, user, origin } satisfies LoaderData;
};

export const action: ActionFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const id = parse(fundId, params.fundId);

  const { close = false, ...update } = await request.json();

  if (close) {
    await closeFund(id);
    return { __ok: "Fund closed" } satisfies ActionData;
  }

  const parsed = parse(fundUpdate, update);
  await editFund(id, parsed);

  return { __ok: "Fund updated" } satisfies ActionData;
};
