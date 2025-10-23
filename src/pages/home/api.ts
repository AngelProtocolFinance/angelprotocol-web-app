import type { Route } from "./+types/home";
import { get_npos } from ".server/npos";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const source = new URL(request.url);
  const page1 = await get_npos({
    query: source.searchParams.get("query") ?? "",
    claimed: [true],
    published: [true],
    page: 1,
  });
  return page1;
};
