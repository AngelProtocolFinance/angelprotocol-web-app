import type { LoaderFunction } from "react-router";
import { getNpos } from ".server/npos";

export const loader: LoaderFunction = async ({ request }) => {
  const source = new URL(request.url);
  const page1 = await getNpos({
    query: source.searchParams.get("query") ?? "",
    page: 1,
  });
  return page1;
};
