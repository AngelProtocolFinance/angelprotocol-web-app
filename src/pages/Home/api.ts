import type { LoaderFunction } from "@vercel/remix";
import { getNpos } from ".server/npos";

export const loader: LoaderFunction = async ({ request }) => {
  const source = new URL(request.url);
  const page1 = await getNpos({
    query: source.searchParams.get("query") ?? "",
    page: 1,
    fund_opt_in: [true],
  });
  return page1;
};
