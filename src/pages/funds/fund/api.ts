import { fund_id } from "@better-giving/fundraiser/schema";
import type { LoaderFunction } from "@vercel/remix";
import { segment } from "api/schema/segment";
import type { IFund } from "types/fund";
import { parse, union } from "valibot";
import { get_fund } from ".server/fund";

export interface LoaderData extends IFund {
  url: string;
}

const schema = union([fund_id, segment]);

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const id = parse(schema, params.fundId);
  const fund = await get_fund(id);
  if (!fund) throw new Response(null, { status: 404 });
  return { ...fund, url: url.toString() };
};
