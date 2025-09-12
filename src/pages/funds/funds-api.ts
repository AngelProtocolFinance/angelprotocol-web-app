import { funds_search } from "@better-giving/fundraiser/schema";
import { search } from "helpers/https";
import type { LoaderFunctionArgs } from "react-router";
import { parse } from "valibot";
import { get_funds } from ".server/funds";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const s = parse(funds_search, search(request));
  const page = await get_funds(s);
  return page;
};
