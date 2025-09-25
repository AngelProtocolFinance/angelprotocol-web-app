import { npos_search } from "helpers/npos-search";
import type { NonprofitItem } from "types/mongodb/nonprofits";
import type { Route } from "./+types";
import { cognito, toAuth } from ".server/auth";
import { nonprofits } from ".server/mongodb/db";

export interface LoaderData {
  items: NonprofitItem[];
  page: number;
  size: number;
  num_items: number;
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { user } = await cognito.retrieve(request);
  if (!user) return toAuth(request);
  if (!user.groups.includes("ap-admin")) {
    throw new Response(null, { status: 403 });
  }

  const { filter, page, limit, sort } = npos_search(request);
  const skip = (page - 1) * limit;
  const [sort_key, sort_dir] = sort.split("+");

  const collection = await nonprofits;
  const items = await collection
    .find(filter)
    .sort(sort ? { [sort_key]: sort_dir === "asc" ? 1 : -1 } : {})
    .skip(skip)
    .limit(+limit)
    .toArray();
  const count = await collection.countDocuments(filter);

  return {
    items,
    page,
    size: limit,
    num_items: count,
  } satisfies LoaderData;
};
