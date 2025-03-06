import type { LoaderFunction } from "@vercel/remix";
import type { NonprofitItem } from "types/mongodb/nonprofits";
import { nonprofits } from ".server/mongodb/db";

interface Stats {
  assets: { min: number | null; max: number | null };
  income: { min: number | null; max: number | null };
  revenue: { min: number | null; max: number | null };
}

export interface LoaderData {
  items: NonprofitItem[];
  page: number;
  size: number;
  num_items: number;
  stats?: Stats;
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const { page = "1", limit = "10" } = Object.fromEntries(
    url.searchParams.entries()
  );
  const skip = (+page - 1) * +limit;

  const all = await nonprofits.countDocuments({});
  const items = await nonprofits
    .find({})
    .sort({ asset_amount: -1 })
    .skip(skip)
    .limit(+limit)
    .toArray();

  return {
    items,
    page: +page,
    size: +limit,
    num_items: all,
  } satisfies LoaderData;
};
