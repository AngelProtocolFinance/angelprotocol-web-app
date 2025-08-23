import { funds_search } from "@better-giving/fundraiser/schema";
import type { LoaderFunction } from "@vercel/remix";
import { search } from "helpers/https";
import { safeParse } from "valibot";
import { get_funds } from ".server/funds";

export const loader: LoaderFunction = async ({ request }) => {
  const params = safeParse(funds_search, search(request));
  if (params.issues) {
    return { status: 400, body: params.issues[0].message };
  }
  const page = await get_funds(params.output);
  return page;
};
