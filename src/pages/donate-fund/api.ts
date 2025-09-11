import { fund_id } from "@better-giving/fundraiser/schema";
import { segment } from "api/schema/segment";
import type { LoaderFunction } from "react-router";
import type { UserV2 } from "types/auth";
import type { IFund } from "types/fund";
import { parse, union } from "valibot";
import { cognito } from ".server/auth";
import { get_fund } from ".server/fund";

export interface LoaderData {
  user: UserV2 | null;
  fund: IFund;
}

const schema = union([fund_id, segment]);

export const loader: LoaderFunction = async ({ params, request }) => {
  const { user } = await cognito.retrieve(request);
  const id = parse(schema, params.fundId);
  const fund = await get_fund(id);
  if (!fund) throw new Response(null, { status: 404 });

  return {
    user,
    fund,
  } satisfies LoaderData;
};
