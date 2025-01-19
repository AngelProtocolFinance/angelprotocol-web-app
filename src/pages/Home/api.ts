import { type LoaderFunction, data } from "@vercel/remix";
import { cacheControl, getNpos } from ".server/get-npos";
export const loader: LoaderFunction = async ({ request }) => {
  const source = new URL(request.url);
  const page1 = await getNpos({
    query: source.searchParams.get("query") ?? "",
    page: 1,
    fund_opt_in: [true],
  });

  return data(page1, {
    headers: { "Cache-Control": cacheControl },
  });
};
