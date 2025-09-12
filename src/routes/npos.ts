import { npos_search } from "@better-giving/endowment/schema";
import { resp, search } from "helpers/https";
import type { LoaderFunction } from "react-router";
import { safeParse } from "valibot";
import { get_npos } from ".server/npos";

export const loader: LoaderFunction = async ({ request }) => {
  const params = safeParse(npos_search, search(request));
  if (params.issues) return resp.err(400, params.issues[0].message);

  const page = await get_npos(params.output);

  return resp.json(page);
};
