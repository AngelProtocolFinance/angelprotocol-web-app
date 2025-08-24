import { funds_search } from "@better-giving/fundraiser/schema";
import type { LoaderFunction } from "@vercel/remix";
import { search } from "helpers/https";
import { parse } from "valibot";
import { get_funds } from ".server/funds";

export const loader: LoaderFunction = async ({ request }) => {
  const s = parse(funds_search, search(request));
  const page = await get_funds(s);
  return page;
};
