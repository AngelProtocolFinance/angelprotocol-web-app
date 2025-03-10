import type { SingleFund } from "@better-giving/fundraiser";
import { fundId, fundUpdate } from "@better-giving/fundraiser/schema";
import type { ActionFunction, LoaderFunction } from "@vercel/remix";
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

  const id = parse(fundId, params.fundId);
  const fund = await getFund(id);
  if (!fund) throw new Response(null, { status: 404 });

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

  // check if new slug is already taken
  if (parsed.slug) {
    const res = await getFund(parsed.slug);
    if (res && res.id)
      return {
        __err: `Slug ${parsed.slug} is already taken`,
      } satisfies ActionData;
  }

  await editFund(id, parsed);

  return { __ok: "Fund updated" } satisfies ActionData;
};
