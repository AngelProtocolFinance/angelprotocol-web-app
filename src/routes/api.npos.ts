import { endowsQueryParams } from "@better-giving/endowment/cloudsearch";
import type { LoaderFunction } from "@vercel/remix";
import { search } from "helpers/https";
import { safeParse } from "valibot";
import { getNpos } from ".server/npos";

export const loader: LoaderFunction = async ({ request }) => {
  const params = safeParse(endowsQueryParams, search(request));

  if (params.issues) {
    return new Response(params.issues[0].message, { status: 400 });
  }
  const page = await getNpos(params.output);
  return new Response(JSON.stringify(page), {
    headers: { "Content-Type": "application/json" },
  });
};
