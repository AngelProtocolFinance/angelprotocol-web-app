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
  const {
    page = "1",
    limit = "10",
    asset_code = "",
    income_code = "",
  } = Object.fromEntries(url.searchParams.entries());

  const filter: any = {};
  if (asset_code) {
    filter.$or ||= [];
    filter.$or.push({ asset_code: { $in: asset_code.split(",") } });
  }
  if (income_code) {
    filter.$or ||= [];
    filter.$or.push({ income_code: { $in: income_code.split(",") } });
  }

  const skip = (+page - 1) * +limit;

  const all = await nonprofits.countDocuments(filter as any);
  const items = await nonprofits
    .find(filter as any)
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
