import { fund_id } from "@better-giving/fundraiser/schema";
import { segment } from "api/schema/segment";
import type { UserV2 } from "types/auth";
import type { IFund } from "types/fund";
import { parse, union } from "valibot";
import type { Route } from "./+types";
import { cognito } from ".server/auth";
import { get_fund } from ".server/fund";

export interface LoaderData {
  user: UserV2 | undefined;
  fund: IFund;
}

const schema = union([fund_id, segment]);

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { user } = await cognito.retrieve(request);
  const id = parse(schema, params.fundId);
  const fund = await get_fund(id);
  if (!fund) throw new Response(null, { status: 404 });

  return {
    user,
    fund,
  } satisfies LoaderData;
};
