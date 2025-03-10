import type { SingleFund } from "@better-giving/fundraiser";
import { fundId } from "@better-giving/fundraiser/schema";
import type { LoaderFunction } from "@vercel/remix";
import { segment } from "api/schema/segment";
import { parse, union } from "valibot";
import { getFund } from ".server/fund";

export interface LoaderData extends SingleFund {
  url: string;
}

const schema = union([fundId, segment]);

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const id = parse(schema, params.fundId);
  const fund = await getFund(id);
  if (!fund) throw new Response(null, { status: 404 });
  return { ...fund, url: url.toString() };
};
