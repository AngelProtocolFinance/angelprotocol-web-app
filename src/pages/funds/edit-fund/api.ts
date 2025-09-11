import { fund_id, fund_update } from "@better-giving/fundraiser/schema";
import type { ActionFunction, LoaderFunction } from "react-router";
import type { ActionData } from "types/action";
import type { UserV2 } from "types/auth";
import type { IFund } from "types/fund";
import { parse } from "valibot";
import { cognito, toAuth } from ".server/auth";
import { funddb } from ".server/aws/db";
import { get_fund } from ".server/fund";

export interface LoaderData {
  fund: IFund;
  base_url: string;
  user: UserV2;
}
export const loader: LoaderFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const id = parse(fund_id, params.fundId);

  const fund = await get_fund(id);
  if (!fund) throw new Response(null, { status: 404 });

  if (
    !user.funds.includes(id) &&
    !user.groups.includes("ap-admin") &&
    !user.endowments.map((n) => n.toString()).includes(fund.creator_id)
  ) {
    throw new Response(null, { status: 403 });
  }

  const base_url = new URL(request.url).origin;

  return { fund, user, base_url } satisfies LoaderData;
};

export const action: ActionFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const id = parse(fund_id, params.fundId);

  const { close = false, ...update } = await request.json();

  if (close) {
    await funddb.fund_close(id);
    return { __ok: "Fund closed" } satisfies ActionData;
  }

  const parsed = parse(fund_update, update);

  // check if new slug is already taken
  if (parsed.slug) {
    const res = await funddb.fund(parsed.slug);
    if (res) {
      return {
        __err: `Slug ${parsed.slug} is already taken`,
      } satisfies ActionData;
    }
  }

  await funddb.fund_update(id, parsed);

  return { __ok: "Fund updated" } satisfies ActionData;
};
