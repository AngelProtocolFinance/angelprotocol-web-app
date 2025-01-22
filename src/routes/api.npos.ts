import { endowsQueryParams } from "@better-giving/endowment/cloudsearch";
import type { HeadersFunction, LoaderFunction } from "@vercel/remix";
import { safeParse } from "valibot";
import { cacheControl, getNpos } from ".server/get-npos";

export const headers: HeadersFunction = () => ({
  "Cache-Control": cacheControl,
});
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const params = safeParse(
    endowsQueryParams,
    Object.fromEntries(url.searchParams)
  );

  if (params.issues) {
    return { status: 400, body: params.issues[0].message };
  }
  const page = await getNpos(params.output);
  return page;
};
