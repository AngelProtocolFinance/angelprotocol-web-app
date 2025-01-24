import { endowsQueryParams } from "@better-giving/endowment/cloudsearch";
import type { LoaderFunction } from "@vercel/remix";
import { safeParse } from "valibot";
import { getNpos } from ".server/npos";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const params = safeParse(
    endowsQueryParams,
    Object.fromEntries(url.searchParams)
  );

  if (params.issues) {
    return new Response(params.issues[0].message, { status: 400 });
  }
  const page = await getNpos(params.output);
  return page;
};
