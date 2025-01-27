import type { SingleFund } from "@better-giving/fundraiser";
import type { LoaderFunction } from "@vercel/remix";
import { parse, pipe, string, uuid } from "valibot";
import { getFund } from ".server/fund";

export interface LoaderData extends SingleFund {
  url: string;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const id = parse(pipe(string(), uuid()), params.fundId);
  const fund = await getFund(id);
  if (!fund) throw new Response(null, { status: 404 });
  return { ...fund, url: url.toString() };
};
