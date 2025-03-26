import type { LoaderFunction } from "@vercel/remix";
import { nposParams } from "helpers/npos-params";
import type { NonprofitItem } from "types/mongodb/nonprofits";
import { nonprofits } from ".server/mongodb/db";

export interface LoaderData {
  items: NonprofitItem[];
  page: number;
  size: number;
  num_items: number;
}

export const loader: LoaderFunction = async ({ request }) => {
  const { filter, page, limit, sort } = nposParams(request);
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
